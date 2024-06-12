import { useState } from 'react'
import styled from 'styled-components'
import { useReadAuctionParams } from '@/blockchain/hooks/useReadAuctionParams'
import { useBids } from '@/providers/BidsProvider'
import { NothingFound } from '@/components/bids/allBids/NothingFound'
import { LoadingBids } from '@/components/bids/allBids/LoadingBids'
import { AllBidsList } from '@/components/bids/allBids/AllBidsList'
import { SearchInput } from '@/components/form/SearchInput'
import { useContractState } from '@/blockchain/hooks/useAuctionState'
import { isAuctionSettled } from '@/utils/isAuctionSettled'
import { SettledBidsList } from '@/components/bids/allBids/SettledBidsList'
import { Colors } from '@/styles/colors'
import { MediaQueries } from '@/styles/mediaQueries'

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
  const { state } = useContractState()

  if (areParamsLoading || areBidsLoading || !auctionWinnersCount || !raffleWinnersCount) {
    return <LoadingBids />
  }

  if (bidList.length === 0) {
    return <NothingFound />
  }

  return (
    <>
      {isAuctionSettled(state) ? (
        <SettledBidsList search={search} />
      ) : (
        <AllBidsList
          search={search}
          auctionWinnersCount={auctionWinnersCount}
          raffleWinnersCount={raffleWinnersCount}
        />
      )}
    </>
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
  background-color: ${Colors.White};

  ${MediaQueries.large} {
    padding: 24px 32px;
    row-gap: 16px;
  }
`
