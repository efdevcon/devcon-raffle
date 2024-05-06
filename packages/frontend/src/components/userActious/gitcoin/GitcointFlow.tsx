import { useState } from 'react'
import { CheckGitcoinPassword } from './CheckGitcoinPassword'
import { CheckGitcoinScore } from './CheckingGitcoinScore'
import { UserGitcoinScore } from '@/components/userActious/gitcoin/UserGitcoinScore'
import { MissingGitcoinPassport } from './MissingGitcoinPassport'
import { GetScoreResponseSuccess } from '@/types/api/scorer'

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

  switch (gitcoinState) {
    case GitcoinState.INITIAL_PAGE:
      return <CheckGitcoinPassword onClickCheckScore={() => setGitcoinState(GitcoinState.CHECKING_SCORE)} />
    case GitcoinState.CHECKING_SCORE:
      return <CheckGitcoinScore setGitcoinCredentials={setGitcoinCredentials} />
    case GitcoinState.YOUR_SCORE:
      return <UserGitcoinScore userScore={Number(gitcoinCredentials?.score)} />
    case GitcoinState.MISSING_PASSPORT:
      return <MissingGitcoinPassport afterCreateClick={() => setGitcoinState(GitcoinState.INITIAL_PAGE)} />

    default:
      return <CheckGitcoinPassword onClickCheckScore={() => setGitcoinState(GitcoinState.CHECKING_SCORE)} />
  }
}
