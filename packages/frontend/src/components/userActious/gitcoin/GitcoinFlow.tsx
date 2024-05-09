import { useState } from 'react'
import { CheckGitcoinPassport } from './CheckGitcoinPassport'
import { CheckGitcoinScore } from './CheckingGitcoinScore'
import { UserGitcoinScore } from '@/components/userActious/gitcoin/UserGitcoinScore'
import { MissingGitcoinPassport } from './MissingGitcoinPassport'
import { useSendForScoring } from '@/backend/getPassportScore'
import { GitcoinCredentials } from '@/types/passport/GticoinCredentials'
import { GetScoreResponseSuccess } from '@/types/api/scorer'

enum GitcoinState {
  INITIAL_PAGE,
  CHECKING_SCORE,
  MISSING_PASSPORT,
  YOUR_SCORE,
}

const ScoreDecimals = 8
const ScoreMultiplier = 10 ** ScoreDecimals

interface Props {
  setGitcoinCredentials: (credentials: GitcoinCredentials) => void
  gitcoinCredentials: GitcoinCredentials | undefined
  gitcoinSettled: () => void
}

export const GitcoinFlow = ({ gitcoinCredentials, setGitcoinCredentials, gitcoinSettled }: Props) => {
  const [gitcoinState, setGitcoinState] = useState<GitcoinState>(GitcoinState.INITIAL_PAGE)
  const { mutateAsync, isSuccess, isError } = useSendForScoring()

  const setCredentials = (credentials: GetScoreResponseSuccess) => {
    setGitcoinCredentials({
      score: BigInt(credentials?.score),
      proof: credentials.signature,
    })
    setGitcoinState(GitcoinState.YOUR_SCORE)
  }

  const sendForScoring = async () => {
    const data = await mutateAsync()
    if (data?.status === 'done') {
      setCredentials(data)
    }
  }

  const onCheckScoreClick = () => {
    setGitcoinState(GitcoinState.CHECKING_SCORE)
    sendForScoring()
  }

  switch (gitcoinState) {
    case GitcoinState.INITIAL_PAGE:
      return <CheckGitcoinPassport onCheckScoreClick={onCheckScoreClick} />
    case GitcoinState.CHECKING_SCORE:
      return (
        <CheckGitcoinScore
          setGitcoinCredentials={setCredentials}
          gitcoinRequestSettled={isSuccess}
          gitcoinRequestError={isError}
          onSignAgainClick={sendForScoring}
        />
      )
    case GitcoinState.YOUR_SCORE:
      return (
        <UserGitcoinScore
          userScore={Number(gitcoinCredentials?.score) / ScoreMultiplier}
          gitcoinSettled={gitcoinSettled}
          getBackToScoring={onCheckScoreClick}
        />
      )
    case GitcoinState.MISSING_PASSPORT:
      return <MissingGitcoinPassport afterCreateClick={() => setGitcoinState(GitcoinState.INITIAL_PAGE)} />

    default:
      return <CheckGitcoinPassport onCheckScoreClick={onCheckScoreClick} />
  }
}
