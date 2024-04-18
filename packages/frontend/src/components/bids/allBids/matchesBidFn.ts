import { Bid } from '@/types/bid'

export const matchesBidFn = (value: string) => {
  return (bid: Bid) => (value ? bid.address.toLowerCase().includes(value.toLowerCase()) : true)
}
