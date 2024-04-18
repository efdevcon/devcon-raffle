import { AddressColumn, BidColumn, PlaceColumn } from '@/components/bids/BidsColumns'
import styled, { css } from 'styled-components'
import { useChainId, useChains } from 'wagmi'
import { BidWithPlace } from '@/types/bid'
import { Colors } from '@/styles/colors'
import { formatEther, Hex } from 'viem'

interface Props {
  bid: BidWithPlace
  isUser?: boolean
  view?: 'short' | 'full'
}

export const BidsListEntry = ({ bid, isUser, view = 'full' }: Props) => {
  const explorerAddressLink = useExplorerAddressLink(bid.address)

  return (
    <BidsEntryRow isUser={isUser}>
      <PlaceColumn>{bid.place}.</PlaceColumn>
      <BidColumn>
        {formatEther(bid.amount)} <span>ETH</span>
      </BidColumn>
      <AddressColumn>
        <AddressLink href={explorerAddressLink} target="_blank" rel="noopener noreferrer">
          {view === 'short' ? shortenEthAddress(bid.address) : bid.address}
        </AddressLink>
      </AddressColumn>
    </BidsEntryRow>
  )
}

const useExplorerAddressLink = (address: Hex): string | undefined => {
  const chains = useChains()
  const chainId = useChainId()
  const currentChain = chains.find((chain) => chain.id === chainId)

  if (!currentChain || !currentChain.blockExplorers?.default) {
    return undefined
  }
  return `${currentChain.blockExplorers.default.url}/address/${address}`
}

const shortenEthAddress = (address: Hex) => `${address.substring(0, 6)}......${address.substring(address.length - 4)}`

const BidsEntryRow = styled.div<{ isUser?: boolean }>`
  display: grid;
  grid-template-columns: 1fr 1fr 2fr;
  grid-template-areas: 'place bid address';
  position: relative;

  ${({ isUser }) =>
    isUser &&
    css`
      &::before {
        content: '';
        width: calc(100% + 48px);
        height: calc(100% + 20px);
        border-width: 2px;
        border-style: solid;
        border-image: linear-gradient(90deg, rgba(126, 193, 136, 1), rgba(101, 196, 232, 1), rgba(119, 121, 181, 1)) 1;
        position: absolute;
        top: -10px;
        left: -24px;
        z-index: 1;
      }
    `};
`

const AddressLink = styled.a`
  font-family: 'Space Mono', 'Roboto Mono', monospace;
  font-style: normal;
  color: ${Colors.Blue};
  text-decoration: none;
`
