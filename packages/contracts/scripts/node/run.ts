import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { bidAsSigner } from 'scripts/utils/bid'
import * as hre from 'hardhat'
import { parseEther, parseUnits } from 'ethers/lib/utils'
import { Contract, Wallet, utils } from 'ethers'
import { deployAuctionRaffle } from '../deployAuctionRaffle'
import {
  AuctionRaffle,
  MockLinkToken__factory,
  ScoreAttestationVerifier__factory,
  VrfCoordinatorV2MockWithErc677__factory,
} from 'build/types'
import { minStateDuration, reservePrice, minBidIncrement, initialRequiredScore } from './config'
import { attestScore } from 'utils/attestScore'

const SECOND = 1000

async function run() {
  const nodeProcess = hre.run('node')
  await delay(500)

  const signers = await hre.ethers.getSigners()

  console.log('Deploying contracts...')

  const deployer = signers[0]

  // Mock VRF
  const { vrfRequesterParams } = await setupMockVrf(deployer)

  const now = Math.floor(new Date().valueOf() / SECOND)
  await hre.network.provider.send('evm_setNextBlockTimestamp', [now])

  const biddingStartTime = now
  const biddingEndTime = biddingStartTime + minStateDuration
  const claimingEndTime = biddingEndTime + minStateDuration

  const { auctionRaffle } = await deployAuctionRaffle({
    isLocalNetwork: true,
    initialOwner: deployer.address,
    scoreAttestationConfig: {
      version: '1',
      initialAttestor: deployer.address,
      initialRequiredScore,
    },
    raffleConfig: {
      biddingStartTime,
      biddingEndTime,
      claimingEndTime,
      auctionWinnersCount: 20,
      raffleWinnersCount: 80,
      reservePrice,
      minBidIncrement,
    },
    vrfConfig: vrfRequesterParams,
  })
  console.log('Contracts deployed\n')

  await bid(auctionRaffle, signers.slice(0, 20), deployer)

  await nodeProcess
}

async function bid(auctionRaffle: AuctionRaffle, signers: SignerWithAddress[], attestor: SignerWithAddress) {
  const initialBidAmount = parseEther('0.20')
  // Score attestation
  const scoreVerifier = await auctionRaffle.bidVerifier()
  const scoreAttestationVerifier = ScoreAttestationVerifier__factory.connect(scoreVerifier, attestor)
  const score = 21 * 10 ** 8 // 21.0
  for (let i = 0; i < signers.length; i++) {
    const subject = signers[i].address
    const { signature } = await attestScore(
      subject,
      score,
      attestor as unknown as Wallet,
      scoreAttestationVerifier.address
    )
    await bidAsSigner(auctionRaffle, signers[i], initialBidAmount.add(minBidIncrement.mul(i)), score, signature)
  }
}

async function setupMockVrf(deployer: SignerWithAddress) {
  // Mock mintable LINK token
  const linkToken = await new MockLinkToken__factory(deployer).deploy()
  await linkToken.grantMintAndBurnRoles(deployer.address)
  await linkToken.mint(deployer.address, parseEther('1000'))

  const vrfCoordinator = await new VrfCoordinatorV2MockWithErc677__factory(deployer).deploy(
    parseEther('0.005'),
    parseUnits('1', 'gwei'),
    linkToken.address
  )
  // Create sub
  const subId = await vrfCoordinator.callStatic.createSubscription()
  await vrfCoordinator.createSubscription()

  // Fund sub
  await linkToken.transferAndCall(
    vrfCoordinator.address,
    parseEther('100'),
    utils.defaultAbiCoder.encode(['uint64'], [subId])
  )

  const vrfRequesterParams = {
    vrfCoordinator: vrfCoordinator.address,
    linkToken: linkToken.address,
    linkPremium: parseEther('0.005'),
    gasLaneKeyHash: '0x72d2b016bb5b62912afea355ebf33b91319f828738b111b723b78696b9847b63', // 30 gwei
    callbackGasLimit: 10_000_000, // maximum
    minConfirmations: 1, // minimum
    subId,
  }

  return {
    vrfCoordinator,
    vrfRequesterParams,
    linkToken,
    subId,
  }
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

run()
