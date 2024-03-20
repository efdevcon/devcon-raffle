import { contract, deploy } from 'ethereum-mars'
import { AuctionRaffle, ScoreAttestationVerifier } from '../../build/artifacts'
import { config, scoreAttestationVerifierConfig, vrfConfig } from './deploymentConfig'

deploy({ verify: true }, deployAuctionRaffle)

function deployAuctionRaffle() {
  const bidVerifier = contract(ScoreAttestationVerifier, [
    scoreAttestationVerifierConfig.version,
    scoreAttestationVerifierConfig.initialAttestor,
    scoreAttestationVerifierConfig.initialRequiredScore,
  ])
  contract(
    AuctionRaffle,
    [
      config.initialOwner,
      {
        biddingStartTime: config.biddingStartTime,
        biddingEndTime: config.biddingEndTime,
        claimingEndTime: config.claimingEndTime,
        auctionWinnersCount: config.auctionWinnersCount,
        raffleWinnersCount: config.raffleWinnersCount,
        reservePrice: config.reservePrice,
        minBidIncrement: config.minBidIncrement,
        bidVerifier,
      },
      vrfConfig,
    ],
    { gasLimit: 60_000_000 }
  )
}
