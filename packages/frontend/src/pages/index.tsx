import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import Head from 'next/head'
import { fetchMetadata, metadataToMetaTags } from 'frames.js/next/pages-router/client'
import { Layout } from '@/components/layout/Layout'

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
      <Layout />
    </>
  )
}

export const getServerSideProps = async function getServerSideProps() {
  try {
    const baseUrl = process.env.SITE_URL ?? process.env.URL ?? 'http://localhost:3000'

    return {
      props: {
        metadata: await fetchMetadata(new URL('/api/frames', baseUrl)),
      },
    }
  } catch (error) {
    return {
      props: {
        metadata: {},
      },
    }
  }
} satisfies GetServerSideProps<{
  metadata: Awaited<ReturnType<typeof fetchMetadata>>
}>
