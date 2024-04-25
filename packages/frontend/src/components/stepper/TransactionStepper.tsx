import { Transactions } from '@/blockchain/transaction'
import { Stepper } from './Stepper'
import { heading } from '../auction/AuctionTransaction'
import { styled } from 'styled-components'
import { Colors } from '@/styles/colors'

interface Props<StepName extends string> {
  current: StepName
  action: Transactions
  isFailed: boolean
}

export const TransactionStepper = <StepName extends string>({ action, current, isFailed }: Props<StepName>) => {
  const steps = getTransactionSteps(action)
  const currentStepIndex = steps.findIndex((step) => [step.default.name, step.failed?.name].includes(current))
  return (
    <StepperContainer>
      <StepperHeader>Finalize {header[action]}</StepperHeader>
      <Stepper steps={steps} currentStep={currentStepIndex} isFailed={isFailed} />
    </StepperContainer>
  )
}

const header = {
  [Transactions.Place]: 'Bid',
  [Transactions.Bump]: 'Bid Bump',
  [Transactions.Withdraw]: 'Withdraw',
}

const description = {
  [Transactions.Place]: 'Initiate and confirm bid transaction in your wallet.',
  [Transactions.Bump]: 'Initiate and confirm bump transaction in your wallet.',
  [Transactions.Withdraw]: 'Initiate and confirm withdraw transaction in your wallet.',
}

const getTransactionSteps = (action: Transactions) => {
  return [
    {
      default: {
        name: `${heading[action]}`,
        description: `${description[action]}`,
      },
    },
    {
      default: {
        name: 'Finalized',
        description: 'The transaction has been confirmed on the blockchain.',
      },
      failed: {
        name: 'Failed',
        description: 'Transaction failed.',
      },
    },
  ]
}

const StepperContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 313px;
  padding: 82px 20px 82px 0;
  background-color: ${Colors.Pink};
`
const StepperHeader = styled.h3`
  margin: 0 0 24px 24px;
  color: ${Colors.White};
`
