import { FormHeading, FormRow, FormWrapper } from '@/components/form'
import { Button } from '@/components/buttons'
import styled from 'styled-components'
import { Colors } from '@/styles/colors'
import { InfoIcon } from '@/components/icons'
import { urls } from '@/constants/urls'
import { UserScoreProps } from '@/components/userActious/gitcoin/UserGitcoinScore'
import { environment } from '@/config/environment'

export const InsufficientUserScore = ({ userScore, getBackToScoring }: UserScoreProps) => {
  return (
    <FormWrapper>
      <FormHeading>
        Your Score:&nbsp;<Score>{userScore}</Score>
      </FormHeading>
      <ErrorContent>
        <InfoIcon color={Colors.Red} size={24} />
        <p>Your score is too low!</p>
      </ErrorContent>
      <FormRow>
        <div>
          <p>
            To place a bid your score needs to be <b>at least {environment.gitcoinRequiredScore}</b>.
          </p>
          <br></br>
          <p>
            Please go{' '}
            <Link href={urls.gitcoin} target="_blank">
              back to Gitcoin Passport
            </Link>{' '}
            to increase the score.
          </p>
        </div>
      </FormRow>
      <Button onClick={getBackToScoring}>Recalculate Score</Button>
    </FormWrapper>
  )
}

const Score = styled.span`
  color: ${Colors.Red};
`

const ErrorContent = styled.div`
  display: flex;
  gap: 8px;
  color: ${Colors.Red};
`

const Link = styled.a`
  color: ${Colors.Black};
`
