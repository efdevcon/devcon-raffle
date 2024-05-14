import Head from 'next/head'
import { Info } from '@/components/info/Info'
import styled from 'styled-components'
import { Auction } from '@/components/auction/Auction'

export default function Home() {
  return (
    <>
      <Head>
        <title>Devcon 7 Auction & Raffle</title>
        <meta name="description" content="On-chain Auction & Raffle to sell a portion of Devcon tickets" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageContainer>
        <Info />
        <Auction />
      </PageContainer>
    </>
  )
}

const PageContainer = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
`
