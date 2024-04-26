import { BigNumberish, Contract, Signer, Wallet } from 'ethers'
import { attestScore } from 'utils/attestScore'

export async function bidAsSigner(
  auctionRaffle: Contract,
  signer: Signer,
  value: BigNumberish,
  score: BigNumberish,
  attestor: Signer,
  scoreAttestationVerifier: Contract
) {
  const { signature: proof } = await attestScore(
    await signer.getAddress(),
    score,
    attestor as unknown as Wallet,
    scoreAttestationVerifier.address
  )
  await auctionRaffle.connect(signer).bid(score, proof, { value, gasLimit: 1_000_000 })
}
