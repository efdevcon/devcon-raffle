import styled from 'styled-components'
import { FormHeading, FormRow, FormWrapper } from '../../form'
import { Stepper } from '@/components/stepper/Stepper'
import { ClockIcon } from '@/components/icons'
import { Button } from '@/components/buttons'
import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useAccount, useChainId } from 'wagmi'
import { Hex } from 'viem'
import { getGitcoinScore } from '@/backend/getPassportScore'
import { GetScoreResponseSuccess } from '@/types/api/scorer'
import { useResponsiveHelpers } from '@/hooks/useResponsiveHelper'
import { MediaQueries } from '@/styles/mediaQueries'

const gitcoinScoreSteps = [
  {
    default: {
      name: `Sending request`,
    },
    failed: {
      name: 'Request failed',
    },
  },
  {
    default: {
      name: 'Signing the message',
    },
    failed: {
      name: 'Signing message failed',
    },
  },
  {
    default: {
      name: 'Obtaining the score',
    },
    failed: {
      name: 'Obtaining the score failed',
    },
  },
]

interface CheckGitcoinScoreProps {
  setGitcoinCredentials: (credentials: GetScoreResponseSuccess) => void
  gitcoinRequestSettled: boolean
  gitcoinRequestError: boolean
  onSignAgainClick: () => void
}

export const CheckGitcoinScore = ({
  setGitcoinCredentials,
  gitcoinRequestSettled,
  gitcoinRequestError,
  onSignAgainClick,
}: CheckGitcoinScoreProps) => {
  const { address } = useAccount()
  const chainId = useChainId()
  const { isMobileWidth } = useResponsiveHelpers()
  const queryEnabled = !!(gitcoinRequestSettled && address)
  const { data } = useQuery({
    queryKey: ['gitcoinScore', address, chainId],
    queryFn: () => getGitcoinScore(address as Hex, chainId),
    enabled: queryEnabled,
    retry: true,
    retryDelay: 5000,
  })
  const step = gitcoinRequestSettled ? 2 : 1

  useEffect(() => {
    if (queryEnabled && data && data.status == 'done') {
      setGitcoinCredentials(data)
    }
  }, [data, setGitcoinCredentials, queryEnabled])

  return (
    <Wrapper>
      <Row>
        <ClockIcon size={38} />
        <FormHeading>Checking Your Score</FormHeading>
      </Row>
      <FormRow>
        <span>It will take about 1 minute. Please stay on this page.</span>
      </FormRow>
      <Stepper steps={gitcoinScoreSteps} currentStep={step} isFailed={gitcoinRequestError} />
      <Button isLoading={queryEnabled} disabled={!gitcoinRequestError} onClick={onSignAgainClick} wide={isMobileWidth}>
        Retry
      </Button>
    </Wrapper>
  )
}

const Wrapper = styled(FormWrapper)`
  width: 530px;

  ${MediaQueries.medium} {
    width: 100%;
    padding: 0;
  }
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
`
