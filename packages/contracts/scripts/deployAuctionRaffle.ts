import fs from 'fs'
import path from 'path'
import { ethers, run } from 'hardhat'
import { AuctionRaffle__factory, ScoreAttestationVerifier__factory } from '../build/types'
import { config, scoreAttestationVerifierConfig, vrfConfig } from './deploymentConfig'
import { BigNumberish } from 'ethers'

export type RaffleConfig = Partial<Parameters<AuctionRaffle__factory['deploy']>[1]>
export type VrfConfig = Partial<Parameters<AuctionRaffle__factory['deploy']>[2]>

// TODO: Ideally we use hh ignition, but it requires upgrading ethers. Can't get mars to work.
export async function deployAuctionRaffle(opts?: {
  isLocalNetwork?: boolean
  initialOwner?: string
  scoreAttestationConfig?: {
    version?: string
    initialAttestor?: string
    initialRequiredScore?: BigNumberish
  }
  raffleConfig?: RaffleConfig
  vrfConfig?: VrfConfig
}) {
  const chainId = await ethers.provider.getNetwork().then((network) => network.chainId)
  const [deployer] = await ethers.getSigners()

  const deploymentsPath = path.resolve(__dirname, '../deployments.json')
  const deployments = JSON.parse(
    fs.readFileSync(deploymentsPath, {
      encoding: 'utf-8',
    })
  )
  if (!opts?.isLocalNetwork && deployments[chainId]) {
    console.log(`Already deployed to chainId ${chainId}:`)
    console.log(deployments[chainId])
    process.exit(1)
  }

  // Deploy
  const scoreAttestationVerifierArgs: Parameters<ScoreAttestationVerifier__factory['deploy']> = [
    opts?.scoreAttestationConfig.version || scoreAttestationVerifierConfig.version,
    opts?.scoreAttestationConfig.initialAttestor || scoreAttestationVerifierConfig.initialAttestor,
    opts?.scoreAttestationConfig.initialRequiredScore || scoreAttestationVerifierConfig.initialRequiredScore,
  ]
  const scoreAttestationVerifier = await new ScoreAttestationVerifier__factory(deployer).deploy(
    ...scoreAttestationVerifierArgs
  )
  console.log(`Deployed ScoreAttestationVerifier: ${scoreAttestationVerifier.address}`)
  const auctionRaffleArgs: Parameters<AuctionRaffle__factory['deploy']> = [
    opts?.initialOwner || config.initialOwner,
    {
      biddingStartTime: config.biddingStartTime,
      biddingEndTime: config.biddingEndTime,
      claimingEndTime: config.claimingEndTime,
      auctionWinnersCount: config.auctionWinnersCount,
      raffleWinnersCount: config.raffleWinnersCount,
      reservePrice: config.reservePrice,
      minBidIncrement: config.minBidIncrement,
      bidVerifier: scoreAttestationVerifier.address,
      ...opts?.raffleConfig,
    },
    {
      ...vrfConfig,
      ...opts?.vrfConfig,
    },
  ]

  const auctionRaffle = await new AuctionRaffle__factory(deployer).deploy(...auctionRaffleArgs)
  console.log(`Deployed AuctionRaffle: ${auctionRaffle.address}`)

  if (!opts?.isLocalNetwork) {
    // Record
    deployments[chainId] = {
      address: auctionRaffle.address,
    }
    fs.writeFileSync(deploymentsPath, JSON.stringify(deployments, null, 2), {
      encoding: 'utf-8',
    })

    // Verify
    await new Promise((resolve) => {
      setTimeout(resolve, 30_000)
    })
    await run('verify:verify', {
      address: scoreAttestationVerifier.address,
      constructorArguments: scoreAttestationVerifierArgs,
    })
    await run('verify:verify', {
      address: auctionRaffle.address,
      constructorArguments: auctionRaffleArgs,
    })
  }

  return {
    auctionRaffle,
    scoreAttestationVerifier,
  }
}
