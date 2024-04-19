import { ContractState } from '@/blockchain/hooks/useAuctionState'

export function getWarningText(state: ContractState) {
  if (state === ContractState.RAFFLE_SETTLED) {
    return {
      heading: 'Withdraw',
      action: 'withdraw funds',
    }
  }
  return {
    heading: 'Place bid',
    action: 'place a bid',
  }
}
