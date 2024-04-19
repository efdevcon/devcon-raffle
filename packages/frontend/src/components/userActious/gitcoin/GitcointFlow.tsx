import { useState } from 'react'
import { CheckGitcoinPassword } from './CheckGitcoinPassword'

enum GitcoinState {
  INITIAL_PAGE,
  CHECKING_SCORE,
  YOU_DONT_HAVE_PASSPORT,
  YOUR_SCORE,
}

export const GitcoinFlow = () => {
  const [gitcoinState] = useState<GitcoinState>(GitcoinState.INITIAL_PAGE)

  switch (gitcoinState) {
    case GitcoinState.INITIAL_PAGE:
      return <CheckGitcoinPassword />

    default:
      return <CheckGitcoinPassword />
  }
}
