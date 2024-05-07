import { useState } from 'react'
import { CheckGitcoinPassword } from './CheckGitcoinPassword'
import { CheckGitcoinScore } from './CheckingGitcoinScore'
import { UserGitcoinScore } from '@/components/userActious/gitcoin/UserGitcoinScore'
import { MissingGitcoinPassport } from './MissingGitcoinPassport'
import { GetScoreResponseSuccess } from '@/types/api/scorer'
import { useSendForScoring } from '@/backend/getPassportScore'

enum GitcoinState {
  INITIAL_PAGE,
  CHECKING_SCORE,
  MISSING_PASSPORT,
  YOUR_SCORE,
}

interface Props {
  setGitcoinCredentials: (credentials: GetScoreResponseSuccess) => void
  gitcoinCredentials: GetScoreResponseSuccess | undefined
}

export const GitcoinFlow = ({ gitcoinCredentials, setGitcoinCredentials }: Props) => {
  const [gitcoinState, setGitcoinState] = useState<GitcoinState>(GitcoinState.INITIAL_PAGE)
  const { mutate, requestSettled } = useSendForScoring()

  const onClickCheckScore = () => {
    setGitcoinState(GitcoinState.CHECKING_SCORE)
    mutate()
  }

  switch (gitcoinState) {
    case GitcoinState.INITIAL_PAGE:
      return <CheckGitcoinPassword onClickCheckScore={onClickCheckScore} />
    case GitcoinState.CHECKING_SCORE:
      return <CheckGitcoinScore setGitcoinCredentials={setGitcoinCredentials} gitcoinRequestSettled={requestSettled} />
    case GitcoinState.YOUR_SCORE:
      return <UserGitcoinScore userScore={Number(gitcoinCredentials?.score)} />
    case GitcoinState.MISSING_PASSPORT:
      return <MissingGitcoinPassport afterCreateClick={() => setGitcoinState(GitcoinState.INITIAL_PAGE)} />

    default:
      return <CheckGitcoinPassword onClickCheckScore={onClickCheckScore} />
  }
}
