import {useChainId, useReadContracts} from "wagmi";
import {AUCTION_ABI} from "@/blockchain/abi/auction";
import {AUCTION_ADDRESSES} from "@/blockchain/auctionAddresses";
import {useMemo} from "react";

export const useReadAuctionParams = () => {
  const chainId = useChainId()
  const address = AUCTION_ADDRESSES[chainId]
  const calls = params.map((param) => ({
    address,
    abi: AUCTION_ABI,
    functionName: param,
  } as const))

  const {data} = useReadContracts({
    contracts: calls,
    allowFailure: false,
  })

  return useMemo(() => ({
    biddingEndTime: data?.[0]
  }), [data])
}

const params = [
  'biddingEndTime'
] as const
