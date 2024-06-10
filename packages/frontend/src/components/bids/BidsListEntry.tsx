import { AddressColumn, BidColumn, PlaceColumn } from '@/components/bids/BidsColumns'
import styled, { css } from 'styled-components'
import { Bid } from '@/types/bid'
import { Colors } from '@/styles/colors'
import { formatEther } from 'viem'
import { useExplorerAddressLink } from '@/blockchain/hooks/useExplorerLinks'
import { shortenHexString } from '@/utils/formatters/shortenHexString'

interface Props {
  bid: Bid
  isUser?: boolean
  view?: 'short' | 'full'
}

export const BidsListEntry = ({ bid, isUser, view = 'full' }: Props) => {
  const explorerAddressLink = useExplorerAddressLink(bid.address)

  return (
    <BidsEntryRow $isUser={isUser}>
      <PlaceColumn>{bid.place}.</PlaceColumn>
      <BidColumn>
        {formatEther(bid.amount)} <span>ETH</span>
      </BidColumn>
      <AddressColumn>
        <AddressLink href={explorerAddressLink} target="_blank" rel="noopener noreferrer">
          {view === 'short' ? shortenHexString(bid.address, 4) : bid.address}
        </AddressLink>
      </AddressColumn>
    </BidsEntryRow>
  )
}

const BidsEntryRow = styled.div<{ $isUser?: boolean }>`
  display: grid;
  grid-template-columns: 1fr 1fr 2fr;
  grid-template-areas: 'place bid address';
  position: relative;

  ${({ $isUser }) =>
    $isUser &&
    css`
      &::before {
        content: '';
        width: calc(100% + 60px);
        height: calc(100% + 20px);
        background: ${Colors.Pink};
        position: absolute;
        top: -10px;
        left: -30px;
        z-index: 1;
      }
    `};
`

const AddressLink = styled.a`
  font-family: 'Space Mono', 'Roboto Mono', monospace;
  font-style: normal;
  text-decoration: underline;
  color: ${Colors.Black};
`
