// @vitest-environment node
import { testApiHandler } from 'next-test-api-route-handler' // ◄ Must be first import
import voucherNonceHandler from '@/pages/api/voucher/nonce'
import voucherHandler from '@/pages/api/voucher'
import { expect, test, describe } from 'vitest'
import { GetVoucherNonceResponse, GetVoucherWithSigRequest } from '@/types/api/voucher'
import { buildVoucherClaimMessage } from '@/utils/buildVoucherClaimMessage'
import { privateKeyToAccount } from 'viem/accounts'
import cookie from 'cookie'

// Requires local hardhat node to be started and contract settled
// cd packages/contracts; pnpm node:run; pnpm hardhat:settle
describe('e2e: Voucher code claim flow', () => {
  test('happy path', async () => {
    let nonce: string
    await testApiHandler<GetVoucherNonceResponse>({
      pagesHandler: voucherNonceHandler,
      test: async ({ fetch }) => {
        const res = await fetch({ method: 'GET' })
        const body = await res.json()
        if ('error' in body) {
          test.fails(`Unexpected error: ${body.error}`)
          return
        }

        nonce = body.nonce
        // The same voucher nonce is returned in body
        expect(nonce).to.be.a('string')
      },
    })

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
        expect(res.status).to.eq(200)
        const setCookies = res.headers.getSetCookie()
        expect(setCookies.length).to.eq(1)
        const { voucherCodeJwt } = cookie.parse(setCookies[0])
        expect(voucherCodeJwt).to.be.a('string')
      },
    })
  })

  test('nonce expiry', async () => {
    let nonce: string
    await testApiHandler<GetVoucherNonceResponse>({
      pagesHandler: voucherNonceHandler,
      test: async ({ fetch }) => {
        const res = await fetch({ method: 'GET' })
        const body = await res.json()
        if ('error' in body) {
          test.fails(`Unexpected error: ${body.error}`)
          return
        }

        nonce = body.nonce
        // The same voucher nonce is returned in body
        expect(nonce).to.be.a('string')
      },
    })

    // NONCE_EXPIRY is set to 1000, so wait 1 sec for it to expire
    await new Promise((resolve) => setTimeout(resolve, 1100))

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
})
