import { AUCTION_ABI } from '@/blockchain/abi/auction'
import { AUCTION_ADDRESSES } from '@/blockchain/auctionAddresses'
import { handleWriteContract } from '@/blockchain/handleWriteContract'
import { TransactionAction, Transactions } from '@/blockchain/transaction'
import { useCallback, useState } from 'react'
import { Hex } from 'viem'
import { useChainId, useWriteContract } from 'wagmi'

export function useBumpBid(value: bigint): TransactionAction {
  const { writeContractAsync, status, reset } = useWriteContract()
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
            functionName: 'bump',
            value,
          },
          { onSuccess: setTransactionHash },
        ),
      ),
    [writeContractAsync, chainId, value],
  )

  return { send, status, onBackHome: reset, type: Transactions.Bump, transactionHash }
}
