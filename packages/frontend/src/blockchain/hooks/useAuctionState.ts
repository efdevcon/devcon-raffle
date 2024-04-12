import {useAccount, useChainId, useReadContract} from "wagmi";
import {AUCTION_ABI} from "@/blockchain/abi/auction";
import {AUCTION_ADDRESSES} from "@/blockchain/auctionAddresses";
import {Hex} from "viem";

export type AuctionState =
  | 'AwaitingBidding'
  | 'WalletNotConnected'
  | 'WrongNetwork'
  | 'BiddingFlow'
  | 'AwaitingResults'
  | 'ClaimingFlow'
  | 'ClaimingClosed'

enum ContractState {
  AWAITING_BIDDING,
  BIDDING_OPEN,
  BIDDING_CLOSED,
  AUCTION_SETTLED,
  RAFFLE_SETTLED,
  CLAIMING_CLOSED,
}

export function useAuctionState(): AuctionState | undefined {
  const {address, chainId} = useAccount()
  const {state, isLoading} = useContractState()
  if (isLoading) {
    return undefined
  }

  if (state === ContractState.AWAITING_BIDDING) {
    return 'AwaitingBidding'
  }

  if (state === ContractState.BIDDING_OPEN) {
    return getStateUsingWallet(address, chainId, 'BiddingFlow')
  }

  if (state === ContractState.BIDDING_CLOSED || state === ContractState.AUCTION_SETTLED) {
    return 'AwaitingResults'
  }

  if (state === ContractState.RAFFLE_SETTLED) {
    return getStateUsingWallet(address, chainId, 'ClaimingFlow')
  }

  if (state === ContractState.CLAIMING_CLOSED) {
    return 'ClaimingClosed'
  }

  throw new Error('unknown state')
}

export const useContractState = () => {
  const chainId = useChainId()
  const {data, isLoading, error} = useReadContract({
    chainId,
    abi: AUCTION_ABI,
    address: AUCTION_ADDRESSES[chainId],
    functionName: 'getState'
  })

  return {state: data as ContractState, isLoading}
}

function getStateUsingWallet(
  account: Hex | undefined,
  chainId: number | undefined,
  state: AuctionState
) {
  if (!account) {
    return 'WalletNotConnected'
  }

  if (!chainId) {
    return 'WrongNetwork'
  }

  return state
}
