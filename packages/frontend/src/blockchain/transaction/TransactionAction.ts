import { MutationStatus } from '@tanstack/react-query'
import { Transactions } from '.'
import { Hex } from 'viem'

export interface TransactionAction {
  type: Transactions
  send: () => void
  status: MutationStatus
  resetStatus: () => void
  transactionHash: Hex | undefined
}
