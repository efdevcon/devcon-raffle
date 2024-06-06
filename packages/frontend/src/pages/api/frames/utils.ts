import { AUCTION_ABI } from '@/blockchain/abi/auction'
import { AUCTION_ADDRESSES } from '@/blockchain/auctionAddresses'
import { createPublicClient, http } from 'viem'
import { readContract } from 'viem/actions'
import { arbitrumSepolia } from 'viem/chains'

export const frameConfig = {
  title: 'Devcon 7',
  description: 'Auction & Raffle Tickets',
  website: 'https://devcon.org/',
  startDate: '2024-06-10T00:00:00Z',
  endDate: '2024-06-30T23:59:59Z',
  withdrawDate: '2024-07-31T23:59:59Z',
  url: process.env.SITE_URL ?? process.env.URL ?? 'http://localhost:3000',
  chain: arbitrumSepolia,
  maxTickets: 200,
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
