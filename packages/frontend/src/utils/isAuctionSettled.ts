import { ContractState } from '@/types/ContractState'

export function isAuctionSettled(state: ContractState) {
  return [ContractState.AUCTION_SETTLED, ContractState.RAFFLE_SETTLED, ContractState.CLAIMING_CLOSED].includes(state)
}
