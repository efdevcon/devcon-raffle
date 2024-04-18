import styled from 'styled-components'
import { Bid, bidToBidWithPlace } from '@/types/bid'
import { Colors } from '@/styles/colors'
import { BidListContainer } from '@/components/common/BidListContainer'
import { BidListEntry } from '@/components/common/BidListEntry'
import { useAccount } from 'wagmi'

interface Props {
  bids: Bid[]
  placeOffset: number
  title: string
}

export const BidsSubList = ({ bids, placeOffset, title }: Props) => {
  const { address } = useAccount()

  return (
    <>
      <TitleBanner>
        <SubListHeader>{title}</SubListHeader>
      </TitleBanner>
      <BidListContainer>
        {bids.map((bid, index) => (
          <BidListEntry
            key={bid.bidderId}
            bid={bidToBidWithPlace(bid, placeOffset + index)}
            isUser={address === bid.address}
            view="full"
          />
        ))}
      </BidListContainer>
    </>
  )
}

const TitleBanner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 4px 0;
  background-color: ${Colors.GreenLight};
`

const SubListHeader = styled.h3`
  font-size: 20px;
  line-height: 150%;
`
