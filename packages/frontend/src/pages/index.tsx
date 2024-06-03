import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import Head from 'next/head'
import { Info } from '@/components/info/Info'
import styled from 'styled-components'
import { Auction } from '@/components/auction/Auction'
import { fetchMetadata, metadataToMetaTags } from 'frames.js/next/pages-router/client'

export default function Home({ metadata }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>
        <title>Devcon 7 Auction & Raffle</title>
        {metadataToMetaTags(metadata)}
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

export const getServerSideProps = async function getServerSideProps() {
  const baseUrl = process.env.URL ?? 'http://localhost:3000'
  // eslint-disable-next-line no-console
  console.log(`[DEBUG] Fetching metadata from: ${baseUrl}`)

  return {
    props: {
      metadata: await fetchMetadata(new URL('/api/frames', baseUrl)),
    },
  }
} satisfies GetServerSideProps<{
  metadata: Awaited<ReturnType<typeof fetchMetadata>>
}>

const PageContainer = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
`
