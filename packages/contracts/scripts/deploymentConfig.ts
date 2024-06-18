import { BigNumberish, utils } from 'ethers'
import { parseEther } from 'ethers/lib/utils'

interface DeploymentConfig {
  initialOwner: string
  biddingStartTime: BigNumberish
  biddingEndTime: BigNumberish
  claimingEndTime: BigNumberish
  auctionWinnersCount: BigNumberish
  raffleWinnersCount: BigNumberish
  reservePrice: BigNumberish
  minBidIncrement: BigNumberish
}

export const scoreAttestationVerifierConfig = {
  version: '1',
  initialAttestor: '0x527974D1270283BA158934b64f8a91C0E1F62024',
  initialRequiredScore: 20,
}

export const vrfConfig = {
  // arb1, VRF 2.0 (not 2.5!)
  vrfCoordinator: '0x41034678D6C633D8a95c75e1138A360a28bA15d1',
  linkToken: '0xf97f4df75117a78c1a5a0dbb814af92458539fb4',
  linkPremium: parseEther('0.005'),
  gasLaneKeyHash: '0x68d24f9a037a649944964c2a1ebd0b2918f4a243d2a99701cc22b548cf2daff0', // 150 gwei
  callbackGasLimit: 2_500_000, // maximum
  minConfirmations: 1, // minimum
  subId: 150,
}

export const config: DeploymentConfig = {
  initialOwner: '0x8AE57CE9eC11a53Ca655E02B36482C0cB406ACee',
  biddingStartTime: 1718721000, // 2024-06-18T14:30:00Z
  biddingEndTime: 1720569540, // 2024-07-09T23:59:00Z
  claimingEndTime: 1722470340, // 2024-07-31T23:59:00Z
  auctionWinnersCount: 20,
  raffleWinnersCount: 184,
  reservePrice: utils.parseEther('0.08'),
  minBidIncrement: utils.parseEther('0.003'),
}
