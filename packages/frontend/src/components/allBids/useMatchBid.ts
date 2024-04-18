import { useCallback } from 'react'
import { Bid } from '@/types/bid'

export const useMatchBid = (value: string) =>
  useCallback((bid: Bid) => (value ? bid.address.toLowerCase().includes(value.toLowerCase()) : true), [value])
