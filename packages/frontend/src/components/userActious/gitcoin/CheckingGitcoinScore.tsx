import styled from 'styled-components'
import { FormWrapper } from '../../form'
import { TransactionStepper } from '@/components/stepper/Stepper'

export const CheckGitcoinScore = () => {
  return (
    <ConnectFormWrapper>
      <TransactionStepper currentStep={2} isFailed={true} />
    </ConnectFormWrapper>
  )
}

const ConnectFormWrapper = styled(FormWrapper)`
  justify-content: center;
  padding: 0 143px;
`
