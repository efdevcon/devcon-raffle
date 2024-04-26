import { useReadAuctionParams } from './useReadAuctionParams'

export const useMinimumIncrement = () => useReadAuctionParams().minimumBidIncrement ?? BigInt(0)
