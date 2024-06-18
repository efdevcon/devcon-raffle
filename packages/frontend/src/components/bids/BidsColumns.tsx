import { MediaQueries } from '@/styles/mediaQueries'
import styled from 'styled-components'

export const BidsColumns = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 2fr;
  grid-template-areas: 'place bid address';
  width: 100%;
  font-weight: 600;
`

export const PlaceColumn = styled.div`
  grid-area: place;
  z-index: 2;

  ${MediaQueries.medium} {
    font-size: 14px;
  }
`

export const BidColumn = styled.div`
  grid-area: bid;
  z-index: 2;

  ${MediaQueries.medium} {
    font-size: 14px;
  }
`

export const AddressColumn = styled.div`
  grid-area: address;
  text-align: right;
  z-index: 2;

  ${MediaQueries.medium} {
    font-size: 14px;
  }
`
