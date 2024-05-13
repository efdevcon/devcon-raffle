import { task, types } from 'hardhat/config'
import { connectToAuctionRaffle } from 'scripts/utils/auctionRaffle'
import { BigNumberish, constants, Contract, utils } from 'ethers'
import { parseEther } from 'ethers/lib/utils'
import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { randomBN } from 'scripts/utils/random'
import { generateRandomAccounts } from 'scripts/utils/generateRandomAccounts'
import { fundAccounts } from 'scripts/utils/fundAccounts'
import { bidAsSigner } from 'scripts/utils/bid'
import { initialRequiredScore, minBidIncrement, reservePrice } from 'scripts/node/config'
import { connectToScoreAttestationVerifier } from 'scripts/utils/scoreAttestationVerifier'
import { connectToMockVrfCoordinator } from 'scripts/utils/mockVrfCoordinator'

const mockVrfCoordinatorAddress = '0xcf7ed3acca5a467e9e704c703e8d87f634fb0fc9'
const scoreAttestationVerifierAddress = '0x0165878a594ca255338adfa4d48449f69242eb8f'
const auctionRaffleAddress = '0xa513e6e4b8f2a923d98304ec87f64353c4d5c853'

task('bid', 'Places bid for given account with provided amount')
  .addParam('account', 'Hardhat account to use')
  .addParam('amount', "The bid's amount in ETH", undefined, types.string)
  .setAction(async ({ account, amount }: { account: string; amount: string }, hre) => {
    const signer = await hre.ethers.getSigner(account)
    const auctionRaffle = await connectToAuctionRaffle(hre, auctionRaffleAddress)
    const [attestor] = await hre.ethers.getSigners()
    const scoreAttestationVerifier = await connectToScoreAttestationVerifier(hre, scoreAttestationVerifierAddress)

    const ethAmount = parseEther(amount)
    await bidAsSigner(auctionRaffle, signer, ethAmount, initialRequiredScore, attestor, scoreAttestationVerifier)
    logBid(account, ethAmount)
  })

task('bid-random', 'Bids X times using randomly generated accounts')
  .addParam('amount', 'Amount of bids', undefined, types.int, false)
  .addParam('account', 'Index of hardhat account to take funds from', 0, types.int)
  .setAction(async ({ amount, account }: { amount: number; account: number }, hre) => {
    const signers = await hre.ethers.getSigners()
    const auctionRaffle = await connectToAuctionRaffle(hre, auctionRaffleAddress)
    const attestor = signers[0]
    const scoreAttestationVerifier = await connectToScoreAttestationVerifier(hre, scoreAttestationVerifierAddress)

    console.log('Generating accounts...')
    const randomAccounts = generateRandomAccounts(amount, hre.ethers.provider)

    console.log('Funding accounts...')
    await fundAccounts(signers[account], randomAccounts, reservePrice, minBidIncrement)

    console.log('Starting bidding...')
    for (let i = 0; i < randomAccounts.length; i++) {
      console.log(`Bidding with random account #${i + 1} out of ${randomAccounts.length}`)
      await bidAsSigner(
        auctionRaffle,
        randomAccounts[i],
        reservePrice.add(minBidIncrement.mul(i)),
        initialRequiredScore,
        attestor,
        scoreAttestationVerifier
      )
    }
  })

task('settle-auction', 'Settles auction').setAction(async (taskArgs, hre) => {
  const auctionRaffle = await auctionRaffleAsOwner(hre)

  await auctionRaffle.settleAuction()
  console.log('Auction settled!')
})

task('settle-raffle', 'Settles raffle').setAction(async (taskArgs, hre) => {
  const auctionRaffle = await auctionRaffleAsOwner(hre)

  await auctionRaffle.settleRaffle()
  console.log('Raffle settled!')
})

task('fulfill-vrf', 'Fulfill VRF request').setAction(async (taskArgs, hre) => {
  const auctionRaffle = await auctionRaffleAsOwner(hre)
  const requestId = await auctionRaffle.requestId()
  const mockVrfCoordinator = await connectToMockVrfCoordinator(hre, mockVrfCoordinatorAddress)
  const randomWords = [randomBN()]
  await mockVrfCoordinator.fulfillRandomWords(requestId, auctionRaffle.address, randomWords)
  console.log(`Fulfilled VRF request with: ${randomWords}`)
})

task('transfer-eth', 'Transfers ether from DEPLOYER account to desired account')
  .addParam('amount', 'ETH amount to send', '1', types.string, true)
  .addParam('account', 'ETH amount to send', undefined, types.string, false)
  .setAction(async ({ amount, account }: { amount: string, account: string }, hre) => {
    const [deployer] = await hre.ethers.getSigners()
    console.log('account: ', account)

    const amountToSend = parseEther(amount)
    const tx = await deployer.sendTransaction({
      to: account,
      value: amountToSend,
    })
    await tx.wait()
    console.log(`Sent ${formatEther(amountToSend)} to ${account}`)
  })

function logBid(address: string, bidAmount: BigNumberish) {
  console.log(`Account ${address} bid ${formatEther(bidAmount)}`)
}

function formatEther(amount: BigNumberish): string {
  return `${utils.formatEther(amount).toString()}${constants.EtherSymbol}`
}

async function auctionRaffleAsOwner(hre: HardhatRuntimeEnvironment): Promise<Contract> {
  const owner = await getAuctionRaffleOwner(hre)
  const auctionRaffle = await connectToAuctionRaffle(hre, auctionRaffleAddress)
  return auctionRaffle.connect(owner)
}

async function getAuctionRaffleOwner(hre: HardhatRuntimeEnvironment): Promise<SignerWithAddress> {
  const signers = await hre.ethers.getSigners()
  return signers[0]
}
