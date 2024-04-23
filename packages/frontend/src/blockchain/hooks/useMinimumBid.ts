import { useReadAuctionParams } from './useReadAuctionParams'

export const useMinimumBid = () => useReadAuctionParams().minimumBid ?? BigInt(0)
