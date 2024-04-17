import { ContractState } from '@/blockchain/hooks/useAuctionState'

export function isAuctionSettled(state: ContractState) {
  return [ContractState.AUCTION_SETTLED, ContractState.RAFFLE_SETTLED, ContractState.CLAIMING_CLOSED].includes(state)
}
