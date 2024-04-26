import { AUCTION_ABI } from '@/blockchain/abi/auction'
import { AUCTION_ADDRESSES } from '@/blockchain/auctionAddresses'
import { TransactionAction, Transactions } from '@/blockchain/transaction'
import { useCallback, useState } from 'react'
import { Hex } from 'viem'
import { useChainId, useWriteContract } from 'wagmi'

interface Props {
  score: bigint
  proof: Hex
  value: bigint
}

export function usePlaceBid({ score, proof, value }: Props): TransactionAction {
  const { writeContractAsync, status, reset } = useWriteContract()
  const chainId = useChainId()
  const [transactionHash, setTransactionHash] = useState<Hex>()
  const send = useCallback(
    () =>
      writeContractAsync(
        {
          chainId,
          abi: AUCTION_ABI,
          address: AUCTION_ADDRESSES[chainId],
          functionName: 'bid',
          args: [score, proof],
          value,
        },
        {
          onSuccess: (hash) => {
            setTransactionHash(hash)
            reset()
          }
        },
      ),
    [writeContractAsync, chainId, score, proof, value, reset],
  )

  return { send, status, resetStatus: reset, type: Transactions.Place, transactionHash }
}
