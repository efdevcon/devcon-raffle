import { useState } from 'react'
import { CheckGitcoinPassword } from './CheckGitcoinPassword'
import { CheckGitcoinScore } from './CheckingGitcoinScore'

enum GitcoinState {
  INITIAL_PAGE,
  CHECKING_SCORE,
  YOU_DONT_HAVE_PASSPORT,
  YOUR_SCORE,
}

export const GitcoinFlow = () => {
  const [gitcoinState] = useState<GitcoinState>(GitcoinState.CHECKING_SCORE)

  switch (gitcoinState) {
    case GitcoinState.INITIAL_PAGE:
      return <CheckGitcoinPassword />

    case GitcoinState.CHECKING_SCORE:
        return <CheckGitcoinScore />
    default:
      return <CheckGitcoinPassword />
  }
}
