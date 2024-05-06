import { AUCTION_ABI } from '@/blockchain/abi/auction'
import { AUCTION_ADDRESSES } from '@/blockchain/auctionAddresses'
import { TransactionAction, Transactions } from '@/blockchain/transaction'
import { useCallback, useState } from 'react'
import { Hex } from 'viem'
import { useChainId, useWriteContract } from 'wagmi'
import { useUserSettledBid } from './useUserSettledBid'
import { handleWriteContract } from '../handleWriteContract'

export function useClaimFunds(bidderId: bigint): TransactionAction {
  const { writeContractAsync, status, reset } = useWriteContract()
  const { refetch } = useUserSettledBid()
  const onBackHome = () => {
    reset()
    refetch()
  }
  const chainId = useChainId()
  const [transactionHash, setTransactionHash] = useState<Hex>()
  const send = useCallback(
    () =>
      handleWriteContract(
        writeContractAsync(
          {
            chainId,
            abi: AUCTION_ABI,
            address: AUCTION_ADDRESSES[chainId],
            functionName: 'claim',
            args: [bidderId],
          },
          {
            onSuccess: setTransactionHash,
          },
        ),
      ),
    [writeContractAsync, chainId, bidderId],
  )

  return { send, status, onBackHome, type: Transactions.Withdraw, transactionHash }
}
