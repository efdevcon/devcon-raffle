/* eslint-disable react/jsx-key */
import { DotsIcon } from '@/components/icons'
import { formatDate } from '@/utils/formatters/formatDate'
import { formatTimeLeft } from '@/utils/formatters/formatTimeLeft'
import { createFrames, Button } from 'frames.js/next/pages-router/server'
import moment from 'moment'
import { renderToStaticMarkup } from 'react-dom/server'

export const config = {
  title: 'Devcon 7',
  description: 'Auction & Raffle Tickets',
  startDate: '2024-06-10T00:00:00Z',
  endDate: '2024-06-30T23:59:59Z',
  url: 'https://devcon-raffle.netlify.app',
}

const frames = createFrames({
  basePath: '/api/frames',
})

const handleRequest = frames(async (req) => {
  const start = moment.utc(config.startDate)
  const end = moment.utc(config.endDate)
  const timer = moment().isBefore(start)
    ? `Till start ${formatTimeLeft(BigInt(start.unix()))}`
    : `Time left ${formatTimeLeft(BigInt(end.unix()))}`

  const svg = encodeURIComponent(renderToStaticMarkup(<DotsIcon />))
  //

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
            <span tw="bg-white m-0 p-4">{timer}</span>
          </p>
          <p tw="p-0 m-0">
            <span tw="bg-white  m-0 p-4">Ends on {formatDate(BigInt(end.unix()))}</span>
          </p>
        </div>
      </div>
    ),
    buttons: [
      <Button action="link" target={`${config.url}/bids`}>
        View Bids
      </Button>,
      <Button action="link" target={config.url}>
        Place Bid
      </Button>,
    ],
  }
})

export default handleRequest
