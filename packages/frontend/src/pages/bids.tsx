import styled from 'styled-components'
import { Colors } from '@/styles/colors'
import { Header } from '@/components/bids/allBids/Header'
import { AllBids } from '@/components/bids/allBids/AllBids'
import { fetchMetadata, metadataToMetaTags } from 'frames.js/next/pages-router/client'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'

export default function Bids({ metadata }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>{metadataToMetaTags(metadata)}</Head>
      <Body>
        <Header />
        <AllBids />
      </Body>
    </>
  )
}

export const getServerSideProps = async function getServerSideProps() {
  const baseUrl = process.env.SITE_URL ?? process.env.URL ?? 'http://localhost:3000'

  return {
    props: {
      metadata: await fetchMetadata(new URL('/api/frames', baseUrl)),
    },
  }
} satisfies GetServerSideProps<{
  metadata: Awaited<ReturnType<typeof fetchMetadata>>
}>

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  width: 100%;
  background: ${Colors.White};
`
