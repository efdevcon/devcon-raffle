import { FormHeading, FormRow, FormWrapper } from '@/components/form'
import { Button } from '@/components/buttons'
import { UserScoreProps } from '@/components/userActious/gitcoin/UserGitcoinScore'
import { environment } from '@/config/environment'
import styled from 'styled-components'
import { Colors } from '@/styles/colors'
import { useResponsiveHelpers } from '@/hooks/useResponsiveHelper'
import { MediaQueries } from '@/styles/mediaQueries'

export const SufficientUserScore = ({ userScore, gitcoinSettled }: UserScoreProps) => {
  const { isMobileWidth } = useResponsiveHelpers()

  return (
    <FormWrapper>
      <FormHeading>
        Your Score:&nbsp;<Score>{userScore}</Score>
      </FormHeading>
      <FormRow>
        <p>
          To place a bid your score needs to be <b>at least {environment.gitcoinRequiredScore}</b>. Higher score will
          not increase your chances in the raffle.
        </p>
      </FormRow>
      <FormRow>
        <FormRowHeading>You can place your bid now!</FormRowHeading>
      </FormRow>
      <Button onClick={gitcoinSettled} wide={isMobileWidth}>
        Continue
      </Button>
    </FormWrapper>
  )
}

const Score = styled.span`
  color: ${Colors.Green};
`

const FormRowHeading = styled.h4`
  ${MediaQueries.medium} {
    font-size: 16px;
  }
`
