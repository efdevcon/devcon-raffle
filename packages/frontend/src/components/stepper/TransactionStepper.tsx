import { Transactions } from '@/blockchain/transaction'
import { Stepper } from './Stepper'
import { heading } from '../auction/AuctionTransaction'

interface Props<StepName extends string> {
  current: StepName
  action: Transactions
  isFailed: boolean
}

export const TransactionStepper = <StepName extends string>({ action, current, isFailed }: Props<StepName>) => {
  const steps = getTransactionSteps(action)
  const currentStepIndex = steps.findIndex((step) => [step.default.name, step.failed?.name].includes(current))
  return <Stepper steps={steps} currentStep={currentStepIndex} isFailed={isFailed} />
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
