// @vitest-environment node
import { testApiHandler } from 'next-test-api-route-handler' // ◄ Must be first import
import { expect, test, describe, assert } from 'vitest'
import analysisHandler from '@/pages/api/scorer/analysis/[userAddress]'
import { GetScoreResponse } from '@/types/api/scorer'
import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts'

// This test requires the following environment variables to be defined:
// GTC_SCORER_API_KEY
// Get these from https://www.scorer.gitcoin.co/
describe('e2e: Gitcoin Passport Analysis', () => {
  test('happy path', async () => {
    const user = privateKeyToAccount(generatePrivateKey())

    // Sanity: ensure that this wallet does not exist in the scorer yet
    await testApiHandler<GetScoreResponse>({
      url: `/api/scorer/analysis?userAddress=${user.address}&chainId=31337`,
      pagesHandler: analysisHandler,
      test: async ({ fetch }) => {
        const res = await fetch({ method: 'GET' })
        const body = await res.json()
        if (body.status !== 'done') {
          assert.fail(`Unexpected status: ${body.status}`)
        } else {
          expect(body.address).to.eq(user.address)
        }
      },
    })
  })
})
