import styled from 'styled-components'
import { FormHeading, FormRow, FormWrapper } from '../../form'
import { Stepper } from '@/components/stepper/Stepper'
import { ClockIcon } from '@/components/icons'
import { Button } from '@/components/buttons'
import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useAccount, useChainId } from 'wagmi'
import { Hex } from 'viem'
import { getGitcoinScore, useSendForScoring } from '@/backend/getPassportScore'
import { GetScoreResponseSuccess } from '@/types/api/scorer'

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
}

export const CheckGitcoinScore = ({ setGitcoinCredentials }: CheckGitcoinScoreProps) => {
  const { address } = useAccount()
  const chainId = useChainId()
  const { mutate, requestSettled } = useSendForScoring()

  const { data } = useQuery({
    queryKey: ['gitcoinScore', address, chainId],
    queryFn: () => getGitcoinScore(address as Hex, chainId),
    enabled: !!(requestSettled && address),
    retry: true,
    retryDelay: 5000,
  })
  const step = requestSettled ? 2 : 1

  useEffect(() => {
    mutate()
  }, [mutate])

  useEffect(() => {
    if (data && data.status == 'done') {
      setGitcoinCredentials(data)
    }
  }, [data, setGitcoinCredentials])

  return (
    <Wrapper>
      <Row>
        <ClockIcon size={38} />
        <FormHeading>Checking Your Score</FormHeading>
      </Row>
      <FormRow>
        <span>It will take about 1 minute. Please stay on this page.</span>
      </FormRow>
      <Stepper steps={gitcoinScoreSteps} currentStep={step} isFailed={false} />
      <Button>Sign Again</Button>
    </Wrapper>
  )
}

const Wrapper = styled(FormWrapper)`
  width: 530px;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
`
