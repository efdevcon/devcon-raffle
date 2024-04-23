import { useState } from 'react'
import { CheckGitcoinPassword } from './CheckGitcoinPassword'
import { CheckGitcoinScore } from './CheckingGitcoinScore'
import { UserGitcoinScore } from "@/components/userActious/gitcoin/UserGitcoinScore";

enum GitcoinState {
  INITIAL_PAGE,
  CHECKING_SCORE,
  YOU_DONT_HAVE_PASSPORT,
  YOUR_SCORE,
}

export const GitcoinFlow = () => {
  const [gitcoinState] = useState<GitcoinState>(GitcoinState.YOUR_SCORE)

  switch (gitcoinState) {
    case GitcoinState.INITIAL_PAGE:
      return <CheckGitcoinPassword />
    case GitcoinState.CHECKING_SCORE:
      return <CheckGitcoinScore />
    case GitcoinState.YOUR_SCORE:
      return <UserGitcoinScore />
    default:
      return <CheckGitcoinPassword />
  }
}
