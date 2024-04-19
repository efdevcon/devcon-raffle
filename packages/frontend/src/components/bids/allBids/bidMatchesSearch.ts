import { Bid } from '@/types/bid'

export const bidMatchesSearch = (value: string) => (bid: Bid) => (value ? bid.address.toLowerCase().includes(value.toLowerCase()) : true)
