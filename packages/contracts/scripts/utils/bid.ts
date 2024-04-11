import { AuctionRaffle } from 'build/types'
import { BigNumberish, BytesLike, Signer } from 'ethers'

export async function bidAsSigner(
  auctionRaffle: AuctionRaffle,
  signer: Signer,
  value: BigNumberish,
  score: BigNumberish,
  proof: BytesLike
) {
  await auctionRaffle.connect(signer).bid(score, proof, { value, gasLimit: 1_000_000 })
}
