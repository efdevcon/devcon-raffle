/* eslint-disable react/jsx-key */
import { DotsIcon } from '@/components/icons'
import { createFrames, Button } from 'frames.js/next/pages-router/server'
import { renderToStaticMarkup } from 'react-dom/server'
import { createPublicClient, http } from 'viem'
import { readContract } from 'viem/actions'
import { AUCTION_ABI } from '@/blockchain/abi/auction'
import { AUCTION_ADDRESSES } from '@/blockchain/auctionAddresses'
import { config } from '..'

const client = createPublicClient({
  chain: config.chain,
  transport: http(),
})

const frames = createFrames({
  basePath: '/api/frames/bids',
})

const handleRequest = frames(async (req) => {
  const svg = encodeURIComponent(renderToStaticMarkup(<DotsIcon />))
  const bids = await getBids()

  const totalNrOfParticipants = bids.length
  const numberOfWinners = config.maxTickets
  const probability =
    bids.length < config.maxTickets ? 100 : ((totalNrOfParticipants - numberOfWinners) / totalNrOfParticipants) * 100

  return {
    image: (
      <div
        tw="flex flex-col justify-between w-full h-full p-12 bg-center bg-no-repeat"
        style={{ backgroundImage: `url("data:image/svg+xml,${svg}")`, backgroundSize: '100% 100%' }}
      >
        <div tw="flex flex-col">
          <p tw="p-0 m-0">
            <h1 tw="bg-white text-9xl m-0 p-4">{config.title}</h1>
          </p>
          <p tw="p-0 m-0">
            <h2 tw="bg-white text-6xl m-0 px-4 pt-0 pb-4">{config.description}</h2>
          </p>
        </div>

        <div tw="flex flex-col">
          <p tw="p-0 m-0">
            <span tw="bg-white m-0 p-4">{bids.length} Bids / {config.maxTickets} tickets</span>
          </p>
          <p tw="p-0 m-0">
            <span tw="bg-white  m-0 p-4">Current win chance {probability}%</span>
          </p>
        </div>
      </div>
    ),
    buttons: [
      <Button action="post_redirect" target={config.url}>
        Go Back
      </Button>,
      <Button action="link" target={config.url}>
        Place Bid
      </Button>,
    ],
  }
})

export const getBids = async () => {
  return readContract(client, {
    abi: AUCTION_ABI,
    address: AUCTION_ADDRESSES[config.chain.id],
    functionName: 'getBidsWithAddresses',
  })
}

export default handleRequest
