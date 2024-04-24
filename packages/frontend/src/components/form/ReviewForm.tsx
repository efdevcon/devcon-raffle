import { TransactionAction, Transactions } from "@/blockchain/transaction"
import { TxFlowSteps } from "../auction/TxFlowSteps"
import { useAccount, useBalance } from "wagmi"
import { useEffect } from "react"
import { FormNarrow, FormRow } from "."
import { formatEther } from "viem"
import { Button } from "../buttons"
import { heading } from "../auction/AuctionTransaction"

const amountLabel = {
  [Transactions.Place]: 'Your Bid',
  [Transactions.Bump]: 'Your Bid Bump',
  [Transactions.Withdraw]: 'Withdraw amount',
}

interface ReviewFormProps {
  action: TransactionAction
  amount: bigint
  impact?: bigint
  view: TxFlowSteps
  setView: (state: TxFlowSteps) => void
  lockViewOnTransaction?: () => void
}

export const ReviewForm = ({
  action: {status, resetStatus, ...action},
  amount,
  impact,
  view,
  setView,
  lockViewOnTransaction,
}: ReviewFormProps) => {
  const { address } = useAccount()
  const etherBalance = useBalance({ address }).data?.value
  const isPending = status === 'pending'

  useEffect(() => {
    if (status === 'success') {
      setView(view + 1)
      resetStatus()
    }
  }, [view, setView, status, resetStatus])

  const sendTransaction = () => {
    action.send()
    lockViewOnTransaction?.()
  }

  return (
    <FormNarrow>
      <FormRow>
        <span>{amountLabel[action.type]}</span>
        <span>{formatEther(amount)} ETH</span>
      </FormRow>
      {!!impact && (
        <FormRow>
          <span>Your Bid after the bump</span>
          <span>{formatEther(impact)} ETH</span>
        </FormRow>
      )}
      <FormRow>
        <span>Wallet Balance</span>
        <span>{!!etherBalance && formatEther(etherBalance)} ETH</span>
      </FormRow>
      <Button view="primary" isLoading={isPending} onClick={sendTransaction}>
        {heading[action.type]}
      </Button>
    </FormNarrow>
  )
}
