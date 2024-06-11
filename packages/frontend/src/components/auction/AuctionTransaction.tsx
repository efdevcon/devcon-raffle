import { TransactionAction, Transactions } from '@/blockchain/transaction'
import styled from 'styled-components'
import { TxFlowSteps } from './TxFlowSteps'
import { BackButton } from '../buttons/BackButton'
import { FormSubHeading, FormWrapper } from '../form'
import { TransactionStepper } from '../stepper/TransactionStepper'
import { ReviewForm } from '../form/ReviewForm'
import { TransactionSuccess } from './TransactionSuccess'
import { MediaQueries } from '@/styles/mediaQueries'

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
}

export const AuctionTransaction = ({ action, amount, impact, view, setView }: AuctionTransactionProps) => {
  const isFailed = action.status === 'error'

  return (
    <Transaction>
      <TransactionWrapper>
        <TransactionHeading>
          {view !== TxFlowSteps.Confirmation && (
            <BackButton view={view} setView={setView} resetState={action.onBackHome} />
          )}
          <FormSubHeading>{heading[action.type]}</FormSubHeading>
        </TransactionHeading>
        {view === TxFlowSteps.Review && (
          <ReviewForm action={action} amount={amount} impact={impact} view={view} setView={setView} />
        )}
        {view === TxFlowSteps.Confirmation && (
          <TransactionSuccess
            action={action.type}
            txHash={action.transactionHash}
            setView={setView}
            onBackHome={action.onBackHome}
          />
        )}
      </TransactionWrapper>
      <TransactionStepper
        action={action.type}
        current={view === TxFlowSteps.Confirmation ? 'Finalized' : `${heading[action.type]}`}
        isFailed={isFailed}
      />
    </Transaction>
  )
}

const Transaction = styled.div`
  display: flex;
  width: 100%;

  ${MediaQueries.large} {
    gap: 24px;
  }

  ${MediaQueries.medium} {
    flex-direction: column-reverse;
    align-items: center;
    row-gap: 16px;
  }
`

const TransactionWrapper = styled(FormWrapper)`
  flex: 1;
  gap: 24px;
  padding: 82px 54px;
  width: fit-content;

  ${MediaQueries.large} {
    padding: 64px 0px;
  }

  ${MediaQueries.medium} {
    width: 100%;
    padding: 0;
  }
`
const TransactionHeading = styled.div`
  display: flex;
  align-items: center;
  column-gap: 16px;
`
