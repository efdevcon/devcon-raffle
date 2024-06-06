import Head from 'next/head'
import { Layout } from '@/components/layout/Layout'

export default function Home() {
  return (
    <>
      <Head>
        <title>Devcon 7 Auction & Raffle</title>
        <meta name="description" content="On-chain Auction & Raffle to sell a portion of Devcon tickets" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout />
    </>
  )
}
