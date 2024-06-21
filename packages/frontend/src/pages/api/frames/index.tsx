/* eslint-disable react/jsx-key */
import { createFrames, Button } from 'frames.js/next/pages-router/server'
import moment from 'moment'
import { frameConfig, getBids } from './utils'
import { DotsIcon } from '@/components/icons'
import { formatTimeLeft } from '@/utils/formatters/formatTimeLeft'
import { renderToStaticMarkup } from 'react-dom/server'
import { formatDate } from '@/utils/formatters/formatDate'

export const revalidate = 60
export const dynamic = 'force-dynamic'

const frames = createFrames({
  basePath: '/api/frames',
})

const handleRequest = frames(async (req) => {
  const svg = encodeURIComponent(renderToStaticMarkup(<DotsIcon />))
  const start = moment.utc(frameConfig.startDate)
  const end = moment.utc(frameConfig.endDate)
  const withdraw = moment.utc(frameConfig.withdrawDate)
  const timer = moment().isBefore(start)
    ? `Till start ${formatTimeLeft(BigInt(start.unix()))}`
    : `Time left ${formatTimeLeft(BigInt(end.unix()))}`

  const bids = await getBids()

  const totalNrOfParticipants = bids.length
  const numberOfWinners = frameConfig.maxTickets
  const probability =
    bids.length < frameConfig.maxTickets
      ? 100
      : ((totalNrOfParticipants - numberOfWinners) / totalNrOfParticipants) * 100

  // Withdrawal period ended
  if (moment().isAfter(withdraw)) {
    return {
      image: (
        <div tw="flex flex-col justify-between w-full h-full justify-center items-center text-center bg-[#FADAFA]">
          <p tw="text-8xl">Devcon Raffle</p>
          <p tw="text-6xl">has ended ⌛️</p>
        </div>
      ),
      imageOptions: {
        headers: {
          'Cache-Control': 'public, max-age=60',
        },
      },
      buttons: [
        <Button action="link" target={`${frameConfig.url}/bids`}>
          🏆 View Winners
        </Button>,
        <Button action="link" target={frameConfig.website}>
          🌐 Devcon.org
        </Button>,
      ],
    }
  }

  // Bidding ended
  if (moment().isAfter(end)) {
    return {
      image: (
        <div
          tw="flex flex-col justify-between w-full h-full p-12 bg-center bg-no-repeat"
          style={{ backgroundImage: `url("data:image/svg+xml,${svg}")`, backgroundSize: '100% 100%' }}
        >
          <div tw="flex flex-col">
            <p tw="p-0 m-0">
              <h1 tw="bg-white text-9xl m-0 p-4">{frameConfig.title}</h1>
            </p>
            <p tw="p-0 m-0">
              <h2 tw="bg-white text-6xl m-0 px-4 pt-0 pb-4">{frameConfig.description}</h2>
            </p>
          </div>

          <div tw="flex flex-col text-4xl">
            <p tw="p-0 m-0">
              <span tw="bg-white m-0 p-4">Raffle has ended ⌛️</span>
            </p>
            <p tw="p-0 m-0">
              <span tw="bg-white m-0 p-2">
                Claim ticket before {formatDate(BigInt(moment.utc(frameConfig.withdrawDate).unix()))}
              </span>
            </p>
          </div>
        </div>
      ),
      imageOptions: {
        headers: {
          'Cache-Control': 'public, max-age=60',
        },
      },
      buttons: [
        <Button action="link" target={`${frameConfig.url}/bids`}>
          🏆 View Winners
        </Button>,
        <Button action="link" target={frameConfig.url}>
          🎟️ Claim Ticket
        </Button>,
      ],
    }
  }

  return {
    image: (
      <div
        tw="flex flex-col bg-white justify-between w-full h-full p-12"
        style={{ backgroundImage: `url("data:image/svg+xml,${svg}")`, backgroundSize: '100% 100%' }}
      >
        <div tw="flex flex-col">
          <p tw="p-0 m-0">
            <h1 tw="bg-white text-9xl m-0 p-4">{frameConfig.title}</h1>
          </p>
          <p tw="p-0 m-0">
            <h2 tw="bg-white text-6xl m-0 px-4 pt-0 pb-4">{frameConfig.description}</h2>
          </p>
        </div>

        <div tw="flex flex-row justify-between text-4xl">
          <div tw="flex flex-col">
            <p tw="p-0 m-0">
              <span tw="bg-white m-0 p-2">{timer}</span>
            </p>
            <p tw="p-0 m-0">
              <span tw="bg-white m-0 p-2">Ends on {formatDate(BigInt(moment.utc(frameConfig.endDate).unix()))}</span>
            </p>
          </div>
          {moment().isAfter(start) && (
            <div tw="flex flex-col">
              <p tw="p-0 m-0 justify-end text-right">
                <span tw="bg-white m-0 p-2">
                  {bids.length} Bids / {frameConfig.maxTickets} tickets
                </span>
              </p>
              <p tw="p-0 m-0 justify-end text-right">
                <span tw="bg-white  m-0 p-2">Current win chance {probability}%</span>
              </p>
            </div>
          )}
        </div>
      </div>
    ),
    imageOptions: {
      headers: {
        'Cache-Control': 'public, max-age=60',
      },
    },
    buttons: [
      <Button action="link" target={`${frameConfig.url}/bids`}>
        🏆 View Bids
      </Button>,
      <Button action="link" target={frameConfig.url}>
        🎟️ Place Bid
      </Button>,
    ],
  }
})

export default handleRequest
