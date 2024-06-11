import styled from 'styled-components'
import { Bid } from '@/types/bid'
import { Colors } from '@/styles/colors'
import { BidsListContainer } from '@/components/bids/BidsListContainer'
import { BidsListEntry } from '@/components/bids/BidsListEntry'
import { useAccount } from 'wagmi'
import { useResponsiveHelpers } from '@/hooks/useResponsiveHelper'
import { MediaQueries } from '@/styles/mediaQueries'

interface Props {
  bids: Bid[]
  title: string
}

export const BidsSubList = ({ bids, title }: Props) => {
  const { address } = useAccount()
  const { isMobileWidth } = useResponsiveHelpers()

  return (
    <>
      <TitleBanner>
        <SubListHeader>{title}</SubListHeader>
      </TitleBanner>
      <BidsListContainer>
        {bids.map((bid) => (
          <BidsListEntry
            key={bid.bidderId}
            bid={bid}
            isUser={address === bid.address}
            view={isMobileWidth ? 'short' : 'full'}
          />
        ))}
      </BidsListContainer>
    </>
  )
}

const TitleBanner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 4px 0;
  background-color: ${Colors.GreyLight};
`

const SubListHeader = styled.h3`
  font-size: 20px;
  line-height: 150%;

  ${MediaQueries.medium} {
    font-size: 16px;
  }
`
