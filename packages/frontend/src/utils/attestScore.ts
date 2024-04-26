import { environment } from '@/config/environment'
import { hashTypedData } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'

const scoreAttestationVerifierAddress = environment.scoreAttestationVerifierAddress as `0x${string}`
const attestor = privateKeyToAccount(environment.scoreAttestorPrivateKey as `0x${string}`)

export async function attestScore(chainId: number, subject: string, score: bigint) {
  const typedData = {
    domain: {
      name: 'ScoreAttestationVerifier',
      version: '1',
      chainId,
      verifyingContract: scoreAttestationVerifierAddress,
    },
    types: {
      // Score(address subject,uint256 score)
      Score: [
        {
          name: 'subject',
          type: 'address',
        },
        {
          name: 'score',
          type: 'uint256',
        },
      ],
    },
    message: {
      subject,
      score,
    },
  }

  const digest = hashTypedData({
    ...typedData,
    primaryType: 'Score',
  })
  const signature = await attestor.signTypedData({
    ...typedData,
    primaryType: 'Score',
  })
  return {
    digest,
    signature,
  }
}
