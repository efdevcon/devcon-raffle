import { AddressColumn, BidColumn, BidsColumns, PlaceColumn } from '@/components/bids/BidsColumns'

export const BidsListHeaders = () => {
  return (
    <BidsColumns>
      <PlaceColumn>Place</PlaceColumn>
      <BidColumn>Bid</BidColumn>
      <AddressColumn>Address</AddressColumn>
    </BidsColumns>
  )
}
