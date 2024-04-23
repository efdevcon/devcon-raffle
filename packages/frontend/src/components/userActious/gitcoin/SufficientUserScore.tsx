import { FormHeading, FormRow, FormWrapper } from '@/components/form'
import { Button } from '@/components/buttons'

const requiredScore = 20
const userScore = 17

export const SufficientUserScore = () => {
  return (
    <FormWrapper>
      <FormHeading>Your Score: {userScore}</FormHeading>
      <FormRow>
        <p>To place a bid your score needs to be <b>at least {requiredScore}</b>.</p>
      </FormRow>
      <FormRow>
        <h4>You can place your bid now!</h4>
      </FormRow>
      <Button>Continue</Button>
    </FormWrapper>
  )
}
