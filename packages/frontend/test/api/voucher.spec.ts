// @vitest-environment node
import { testApiHandler } from 'next-test-api-route-handler' // ◄ Must be first import
import voucherNonceHandler from '@/pages/api/voucher/nonce'
import voucherHandler from '@/pages/api/voucher'
import { expect, test, describe, assert } from 'vitest'
import { GetVoucherNonceResponse, GetVoucherResponse, GetVoucherWithSigRequest } from '@/types/api/voucher'
import { buildVoucherClaimMessage } from '@/utils/buildVoucherClaimMessage'
import { privateKeyToAccount } from 'viem/accounts'
import { environment } from '@/config/environment'
import cookie from 'cookie'

// Requires local hardhat node to be started and contract settled
// cd packages/contracts; pnpm node:run; pnpm hardhat:settle
describe('e2e: Voucher code claim flow', () => {
  test('happy path', async () => {
    // 1. Get nonce
    let nonce: string | undefined
    await testApiHandler<GetVoucherNonceResponse>({
      pagesHandler: voucherNonceHandler,
      test: async ({ fetch }) => {
        const res = await fetch({ method: 'GET' })
        const body = await res.json()
        if ('error' in body) {
          assert.fail(`Unexpected error: ${body.error}`)
        }

        nonce = body.nonce
      },
    })
    // The same voucher nonce is returned in body
    if (!nonce) {
      assert.fail('Failed to fetch nonce')
    }

    // 2. Claim voucher with signature
    let voucherCodeJwt: string
    let voucherCode: string
    const account = privateKeyToAccount('0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80')
    const chainId = 31337
    const signature = await account.signMessage({
      message: buildVoucherClaimMessage(chainId, account.address, nonce),
    })
    const req: GetVoucherWithSigRequest = {
      chainId,
      nonce,
      signature,
      userAddress: account.address,
    }
    await testApiHandler<GetVoucherResponse>({
      pagesHandler: voucherHandler,
      requestPatcher(request) {
        request.headers['content-type'] = 'application/json'
      },
      test: async ({ fetch }) => {
        const res = await fetch({
          method: 'POST',
          body: JSON.stringify(req),
        })
        expect(res.status).to.eq(200)
        const setCookies = res.headers.getSetCookie()
        expect(setCookies.length).to.eq(1)
        ;({ voucherCodeJwt } = cookie.parse(setCookies[0]))
        expect(voucherCodeJwt).to.be.a('string')
        const body = await res.json()
        if ('voucherCode' in body) {
          voucherCode = body.voucherCode
        } else {
          assert.fail(`Unexpected error: ${body.error}`)
        }
      },
    })

    // 3. Refetch voucher with issued JWT
    await testApiHandler<GetVoucherResponse>({
      pagesHandler: voucherHandler,
      test: async ({ fetch }) => {
        const res = await fetch({
          method: 'GET',
          headers: {
            cookie: cookie.serialize('voucherCodeJwt', voucherCodeJwt),
          },
        })
        expect(res.status).to.eq(200)
        const body = await res.json()
        expect('voucherCode' in body && body.voucherCode).to.eq(voucherCode)
      },
    })
  })

  test('nonce expiry', async () => {
    const nonce = await getNonce()
    // NONCE_EXPIRY is set to 1000, so wait 1 sec for it to expire
    await new Promise((resolve) => setTimeout(resolve, environment.nonceExpiry))

    await testApiHandler({
      pagesHandler: voucherHandler,
      requestPatcher(request) {
        request.headers['content-type'] = 'application/json'
      },
      test: async ({ fetch }) => {
        const account = privateKeyToAccount('0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80')
        const chainId = 31337
        const signature = await account.signMessage({
          message: buildVoucherClaimMessage(chainId, account.address, nonce),
        })
        const req: GetVoucherWithSigRequest = {
          chainId,
          nonce,
          signature,
          userAddress: account.address,
        }
        const res = await fetch({
          method: 'POST',
          body: JSON.stringify(req),
        })
        expect(res.status).to.eq(403)
      },
    })
  })

  test('return error on nonexistent nonce', async () => {
    const nonce = 'aaaa-0000'
    const chainId = 31337
    const account = privateKeyToAccount('0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80')
    const signature = await account.signMessage({
      message: buildVoucherClaimMessage(chainId, account.address, nonce),
    })
    await testApiHandler<GetVoucherResponse>({
      pagesHandler: voucherHandler,
      requestPatcher(request) {
        request.headers['content-type'] = 'application/json'
      },
      test: async ({ fetch }) => {
        const res = await fetch({
          method: 'POST',
          body: JSON.stringify({
            chainId,
            nonce,
            signature,
            userAddress: account.address,
          }),
        })
        expect(res.status).to.eq(403)
        const result = await res.json()
        expect('error' in result && result.error).to.eq(`Unknown nonce: ${nonce}`)
      },
    })
  })

  test('return error on mismatched signature', async () => {
    const nonce = await getNonce()
    const chainId = 31337
    const account = privateKeyToAccount('0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80')
    const account2 = privateKeyToAccount('0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff7f')
    const signature = await account2.signMessage({
      message: buildVoucherClaimMessage(chainId, account.address, nonce),
    })
    await testApiHandler<GetVoucherResponse>({
      pagesHandler: voucherHandler,
      requestPatcher(request) {
        request.headers['content-type'] = 'application/json'
      },
      test: async ({ fetch }) => {
        const res = await fetch({
          method: 'POST',
          body: JSON.stringify({
            chainId,
            nonce,
            signature,
            userAddress: account.address,
          }),
        })
        expect(res.status).to.eq(403)
        const result = await res.json()
        expect('error' in result && result.error).to.eq('Invalid signature')
      },
    })
  })

  test('returns an error if address is not a winner', async () => {
    const nonce = await getNonce()
    const chainId = 31337
    const account = privateKeyToAccount('0xdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef')
    const signature = await account.signMessage({
      message: buildVoucherClaimMessage(chainId, account.address, nonce),
    })
    await testApiHandler<GetVoucherResponse>({
      pagesHandler: voucherHandler,
      requestPatcher(request) {
        request.headers['content-type'] = 'application/json'
      },
      test: async ({ fetch }) => {
        const res = await fetch({
          method: 'POST',
          body: JSON.stringify({
            chainId,
            nonce,
            signature,
            userAddress: account.address,
          }),
        })
        expect(res.status).to.eq(403)
        const result = await res.json()
        expect('error' in result && result.error).to.eq(
          `${chainId}:${account.address} is not qualified for a voucher code.`,
        )
      },
    })
  })

  test('returns an error if submitting an invalid JWT', async () => {})
})

async function getNonce(): Promise<string> {
  let nonce: string | undefined
  await testApiHandler<GetVoucherNonceResponse>({
    pagesHandler: voucherNonceHandler,
    test: async ({ fetch }) => {
      const res = await fetch({ method: 'GET' })
      const body = await res.json()
      if ('error' in body) {
        assert.fail(`Unexpected error: ${body.error}`)
      }

      nonce = body.nonce
    },
  })
  if (typeof nonce !== 'string') {
    throw new Error('Failed to fetch nonce')
  }
  return nonce
}
