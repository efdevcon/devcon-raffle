import { AddressLike, NumberLike } from 'ethereum-mars'
import { utils } from 'ethers'
import { parseEther } from 'ethers/lib/utils'

interface DeploymentConfig {
  initialOwner: AddressLike
  biddingStartTime: NumberLike
  biddingEndTime: NumberLike
  claimingEndTime: NumberLike
  auctionWinnersCount: NumberLike
  raffleWinnersCount: NumberLike
  reservePrice: NumberLike
  minBidIncrement: NumberLike
  bidVerifier: AddressLike
}

export const scoreAttestationVerifierConfig = {
  version: '1',
  initialAttestor: '0x0b657D6E696974a0DDfa6266d512A50339c2a968',
  initialRequiredScore: 10,
}

export const vrfConfig = {
  // arb sepolia
  vrfCoordinator: '0x50d47e4142598E3411aA864e08a44284e471AC6f',
  linkToken: '0xb1D4538B4571d411F07960EF2838Ce337FE1E80E',
  linkPremium: parseEther('0.005'),
  gasLaneKeyHash: ' 0x027f94ff1465b3525f9fc03e9ff7d6d2c0953482246dd6ae07570c45d6631414', // 50 gwei
  callbackGasLimit: 2_500_000, // maximum
  minConfirmations: 1, // minimum
  subId: 235,
}

export const config: DeploymentConfig = {
  initialOwner: '0x511ECC4c955626DDaD88f20493E39E71be8133B6',
  biddingStartTime: 1657008000, // Jul 05 2022 08:00:00 UTC
  biddingEndTime: 1657785540, // Jul 14 2022 07:59:00 UTC
  claimingEndTime: 1673683140, // Jan 14 2023 07:59:00 UTC
  auctionWinnersCount: 20,
  raffleWinnersCount: 80,
  reservePrice: utils.parseEther('0.25'),
  minBidIncrement: utils.parseEther('0.01'),
  bidVerifier: '0x0b657D6E696974a0DDfa6266d512A50339c2a968',
}
