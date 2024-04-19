import { useState } from 'react'
import styled from 'styled-components'
import { useReadAuctionParams } from '@/blockchain/hooks/useReadAuctionParams'
import { useBids } from '@/providers/BidsProvider'
import { NothingFound } from '@/components/bids/allBids/NothingFound'
import { LoadingBids } from '@/components/bids/allBids/LoadingBids'
import { AllBidsList } from '@/components/bids/allBids/AllBidsList'
import { SearchInput } from '@/components/form/SearchInput'

export const AllBids = () => {
  const [search, setSearch] = useState('')

  return (
    <PageContainer>
      <SearchInput setSearch={setSearch} />
      <AllBidsContent search={search} />
    </PageContainer>
  )
}

const AllBidsContent = ({ search }: { search: string }) => {
  const { auctionWinnersCount, raffleWinnersCount, isLoading: areParamsLoading } = useReadAuctionParams()
  const { bidList, isLoading: areBidsLoading } = useBids()

  if (areParamsLoading || areBidsLoading || !auctionWinnersCount || !raffleWinnersCount) {
    return <LoadingBids />
  }

  if (bidList.length === 0) {
    return <NothingFound />
  }

  return (
    <AllBidsList search={search} auctionWinnersCount={auctionWinnersCount} raffleWinnersCount={raffleWinnersCount} />
  )
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  row-gap: 20px;
  width: 100%;
  max-width: 780px;
  padding: 28px 0 56px;
`
