import { MutationStatus } from '@tanstack/react-query'
import { Transactions } from '.'
import { Hex } from 'viem'

export interface TransactionAction {
  type: Transactions
  send: () => Promise<Hex | undefined>
  status: MutationStatus
  onBackHome: () => void
  transactionHash: Hex | undefined
}
