import { AUCTION_ABI } from '@/blockchain/abi/auction'
import { AUCTION_ADDRESSES } from '@/blockchain/auctionAddresses'
import { createPublicClient, http } from 'viem'
import { readContract } from 'viem/actions'
import { arbitrum } from 'viem/chains'

export const frameConfig = {
  title: 'Devcon 7',
  description: 'Auction & Raffle Tickets',
  website: 'https://devcon.org/',
  startDate: 1718721000000,
  endDate: 1720569540000,
  withdrawDate: 1722470340000,
  url: process.env.SITE_URL ?? process.env.URL ?? 'http://localhost:3000',
  chain: arbitrum,
  maxTickets: 204,
}

export const client = createPublicClient({
  chain: frameConfig.chain,
  transport: http(),
})

export const getBids = async () => {
  return readContract(client, {
    abi: AUCTION_ABI,
    address: AUCTION_ADDRESSES[frameConfig.chain.id],
    functionName: 'getBidsWithAddresses',
  })
}
