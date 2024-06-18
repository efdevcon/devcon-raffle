/* eslint-disable react/jsx-key */
import { createFrames, Button } from 'frames.js/next/pages-router/server'
import moment from 'moment'
import { frameConfig } from './utils'

const frames = createFrames({
  basePath: '/api/frames',
})

const handleRequest = frames(async (req) => {
  // Withdrawal period ended
  if (moment().isAfter(frameConfig.withdrawDate)) {
    return {
      image: `/images`,
      imageOptions: {
        headers: {
          'Cache-Control': 'public, max-age=0',
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
  if (moment().isAfter(frameConfig.endDate)) {
    return {
      image: `/images`,
      imageOptions: {
        headers: {
          'Cache-Control': 'public, max-age=0',
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
    image: `/images`,
    imageOptions: {
      headers: {
        'Cache-Control': 'public, max-age=0',
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
