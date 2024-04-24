import { TransactionAction, Transactions } from '@/blockchain/transaction'
import { useState } from 'react'
import styled from 'styled-components'
import { TxFlowSteps } from './TxFlowSteps'
import { BackButton } from '../buttons/BackButton'
import { FormSubHeading, FormWrapper } from '../form'
import { TransactionStepper } from '../stepper/TransactionStepper'
import { ReviewForm } from '../form/ReviewForm'

export const heading = {
  [Transactions.Place]: 'Place bid',
  [Transactions.Bump]: 'Bump your Bid',
  [Transactions.Withdraw]: 'Withdraw',
}

interface AuctionTransactionProps {
  action: TransactionAction
  amount: bigint
  impact?: bigint
  view: TxFlowSteps
  setView: (state: TxFlowSteps) => void
  setTransactionViewLock?: (val: boolean) => void
}

export const AuctionTransaction = ({
  action,
  amount,
  impact,
  view,
  setView,
  setTransactionViewLock: setTransactionViewLock,
}: AuctionTransactionProps) => {
  const isFailed = action.status === 'error'
  const lockViewOnTransaction = () => setTransactionViewLock?.(true)
  const unlockViewFromTransaction = () => setTransactionViewLock?.(false)

  return (
    <Transaction>
      <TransactionWrapper>
        <TransactionHeading>
          {view !== TxFlowSteps.Confirmation && (
            <BackButton view={view} setView={setView} resetState={action.resetStatus} />
          )}
          <FormSubHeading>{heading[action.type]}</FormSubHeading>
        </TransactionHeading>
        {view === TxFlowSteps.Review && (
          <ReviewForm
            action={action}
            amount={amount}
            impact={impact}
            view={view}
            setView={setView}
            lockViewOnTransaction={lockViewOnTransaction}
          />
        )}
        {view === TxFlowSteps.Confirmation && (
          <TransactionSuccess
            action={action.type}
            txHash={action.transactionHash}
            setView={setView}
            unlockViewFromTransaction={unlockViewFromTransaction}
          />
        )}
      </TransactionWrapper>
      <TransactionStepper
        action={action.type}
        current={view === TxFlowSteps.Confirmation || isFailed ? 'Finalized' : `${heading[action.type]}`}
        isFailed={isFailed}
      />
    </Transaction>
  )
}

const Transaction = styled.div`
  display: flex;
  width: 100%;
`

const TransactionWrapper = styled(FormWrapper)`
  flex: 1;
  row-gap: 24px;
  padding: 82px 54px;
  width: fit-content;
`
const TransactionHeading = styled.div`
  display: flex;
  align-items: center;
  column-gap: 16px;
`
