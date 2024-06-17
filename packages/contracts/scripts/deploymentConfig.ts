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
  bidVerifier: string
}

export const scoreAttestationVerifierConfig = {
  version: '1',
  initialAttestor: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  initialRequiredScore: 10,
}

export const vrfConfig = {
  // arb sepolia
  vrfCoordinator: '0x50d47e4142598E3411aA864e08a44284e471AC6f',
  linkToken: '0xb1D4538B4571d411F07960EF2838Ce337FE1E80E',
  linkPremium: parseEther('0.005'),
  gasLaneKeyHash: '0x027f94ff1465b3525f9fc03e9ff7d6d2c0953482246dd6ae07570c45d6631414', // 50 gwei
  callbackGasLimit: 2_500_000, // maximum
  minConfirmations: 1, // minimum
  subId: 235,
}

export const config: DeploymentConfig = {
  initialOwner: '0x876e4Da8C4eb1475a87046940c54Aa0ec6DdC49e',
  biddingStartTime: 1718652000, // 2024-03-20T17:49:28.000Z
  biddingEndTime: 1718713200, // 2024-03-27T17:49:28.000Z
  claimingEndTime: 1718799600, // 2024-04-03T17:49:28.000Z
  auctionWinnersCount: 20,
  raffleWinnersCount: 184,
  reservePrice: utils.parseEther('0.08'),
  minBidIncrement: utils.parseEther('0.003'),
  bidVerifier: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
}
