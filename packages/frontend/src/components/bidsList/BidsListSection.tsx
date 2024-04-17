import styled from 'styled-components'

import { useAuctionState } from '@/blockchain/hooks/useAuctionState'
import { useBids } from '@/providers/BidsProvider'
import { Button } from '@/components/buttons/Button'
import { useRouter } from 'next/navigation'
import { useReadAuctionParams } from '@/blockchain/hooks/useReadAuctionParams'
import { Colors } from '@/styles/colors'
import { ShortBidsList } from '@/components/bidsList/ShortBidsList'
import { BidsListHeaders } from '@/components/bidsList/BidsListHeaders'

export const BidsListSection = () => {
  const state = useAuctionState()
  const { bidList } = useBids()
  const { auctionWinnersCount } = useReadAuctionParams()
  const router = useRouter()

  const isLoadingParams = auctionWinnersCount === undefined

  return (
    <BidsListContainer>
      {!isLoadingParams && bidList.length === 0 ? (
        <EmptyList>
          <ColoredText>
            {state === 'AwaitingBidding' ? 'Bids will show up here' : `No bidders yet. Be the first one!`}
          </ColoredText>
        </EmptyList>
      ) : (
        <>
          <ListHeader>
            <h3>Number of participants:</h3>
            <ColoredText>{isLoadingParams ? 0 : bidList.length}</ColoredText>
          </ListHeader>
          <BidsListHeaders />
          <ShortBidsList isLoadingParams={isLoadingParams} />
        </>
      )}
      {!isLoadingParams && bidList.length !== 0 && (
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
  row-gap: 32px;
  width: 100%;
  padding: 46px 0;
`

const ListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 22px;
  width: 100%;
`

const EmptyList = styled.div`
  margin: 48px 0;
`
const ColoredText = styled.h3`
  width: max-content;
  color: ${Colors.Blue};
`
