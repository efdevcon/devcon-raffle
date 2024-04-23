import { FormHeading, FormRow, FormWrapper } from '@/components/form'
import { Button } from '@/components/buttons'
import { UserScoreProps } from '@/components/userActious/gitcoin/UserGitcoinScore'
import { environment } from '@/config/environment'
import styled from "styled-components";
import { Colors } from "@/styles/colors";

export const SufficientUserScore = ({ userScore }: UserScoreProps) => {
  return (
    <FormWrapper>
      <FormHeading>Your Score:&nbsp;<Score>{userScore}</Score></FormHeading>
      <FormRow>
        <p>
          To place a bid your score needs to be <b>at least {environment.gitcoinRequiredScore}</b>.
        </p>
      </FormRow>
      <FormRow>
        <h4>You can place your bid now!</h4>
      </FormRow>
      <Button>Continue</Button>
    </FormWrapper>
  )
}

const Score = styled.h2`
  color: ${Colors.Green};
`
