// @vitest-environment node
import { testApiHandler } from 'next-test-api-route-handler' // ◄ Must be first import
import { expect, test, describe, assert } from 'vitest'
import scorerNonceHandler from '@/pages/api/scorer/nonce'
import scorerAddressHandler from '@/pages/api/scorer/[userAddress]'
import submitScoreHandler from '@/pages/api/scorer/index'
import {
  GetPassportScorerNonceResponse,
  GetScoreResponse,
  SubmitAddressForScoringRequest,
  SubmitAddressForScoringResponse,
} from '@/types/api/scorer'
import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts'

// This test requires the following environment variables to be defined:
// GTC_SCORER_API_KEY
// GTC_SCORER_ID
// Get these from https://www.scorer.gitcoin.co/
describe('e2e: Gitcoin Passport Scorer flow', () => {
  test('happy path', async () => {
    // Create a random wallet that will sign an EIP-191 message
    const user = privateKeyToAccount(generatePrivateKey())

    let nonce: string
    let message: string
    await testApiHandler<GetPassportScorerNonceResponse>({
      pagesHandler: scorerNonceHandler,
      test: async ({ fetch }) => {
        const res = await fetch({ method: 'GET' })
        const body = await res.json()
        if ('error' in body) {
          assert.fail(`Unexpected error: ${body.error}`)
        }

        ;({ nonce, message } = body)
        // The same voucher nonce is returned in body
        expect(nonce).to.be.a('string')
      },
    })

    // Sanity: ensure that this wallet does not exist in the scorer yet
    await testApiHandler<GetScoreResponse>({
      url: `/api/scorer/?userAddress=${user.address}&chainId=31337`,
      pagesHandler: scorerAddressHandler,
      test: async ({ fetch }) => {
        const res = await fetch({ method: 'GET' })
        const body = await res.json()
        if ('error' in body) {
          expect(body.error).to.include('Unable to get score')
        } else {
          assert.fail(`Score already submitted for address: ${user.address}`)
        }
      },
    })

    // Submit for scoring
    await testApiHandler<SubmitAddressForScoringResponse>({
      pagesHandler: submitScoreHandler,
      test: async ({ fetch }) => {
        const res = await fetch({
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            userAddress: user.address,
            nonce,
            signature: await user.signMessage({
              message,
            }),
          } satisfies SubmitAddressForScoringRequest),
        })
        expect(res.status).to.eq(200)
      },
    })

    // Sanity: ensure that this wallet does not exist in the scorer yet
    await testApiHandler<GetScoreResponse>({
      url: `/api/scorer/?userAddress=${user.address}&chainId=31337`,
      pagesHandler: scorerAddressHandler,
      test: async ({ fetch }) => {
        const res = await fetch({ method: 'GET' })
        const body = await res.json()
        if ('error' in body) {
          assert.fail(`Score not available for ${user.address}: ${body.error}`)
        } else {
          expect(res.status).to.be.oneOf([200, 202])
          expect(body.status).to.be.oneOf(['processing', 'done'])
        }
      },
    })
  })
})
