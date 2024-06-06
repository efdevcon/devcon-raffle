import styled from 'styled-components'

import { useAuctionState } from '@/blockchain/hooks/useAuctionState'
import { useBids } from '@/providers/BidsProvider'
import { Button } from '@/components/buttons/Button'
import { useRouter } from 'next/navigation'
import { Colors } from '@/styles/colors'
import { BidsShortList } from '@/components/bids/bidsShortList/BidsShortList'
import { BidsListHeaders } from '@/components/bids/BidsListHeaders'
import { MediaQueries } from '@/styles/mediaQueries'
import { FormSubHeading } from '@/components/form'

export const BidsShortListSection = () => {
  const state = useAuctionState()
  const { bidList, isLoading: areBidsLoading } = useBids()
  const router = useRouter()

  if (areBidsLoading) {
    return (
      <EmptyList>
        <HeaderText>Loading...</HeaderText>
      </EmptyList>
    )
  }

  return (
    <BidsListContainer>
      {bidList.length === 0 ? (
        <EmptyList>
          <HeaderText>
            {state === 'AwaitingBidding' ? 'Bids will show up here' : `No bidders yet. Be the first one!`}
          </HeaderText>
        </EmptyList>
      ) : (
        <>
          <ListHeader>
            <FormSubHeading>Number of participants:</FormSubHeading>
            <HeaderText>{bidList.length}</HeaderText>
          </ListHeader>
          <ListContainer>
            <BidsListHeaders />
            <BidsShortList />
          </ListContainer>
        </>
      )}
      {bidList.length !== 0 && (
        <Button view="secondary" onClick={() => router.push('/bids')}>
          Show all
        </Button>
      )}
    </BidsListContainer>
  )
}

const BidsListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 44px;
  width: 100%;
  padding: 44px 0;

  ${MediaQueries.medium} {
    justify-content: center;
    row-gap: 16px;
    max-width: 440px;
    padding: 32px;
    margin: 0 auto;
  }
`

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 32px;
  width: 100%;
`

const ListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`

const EmptyList = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 46px 0;
`

const HeaderText = styled.h3`
  width: max-content;
  color: ${Colors.Black};
`
