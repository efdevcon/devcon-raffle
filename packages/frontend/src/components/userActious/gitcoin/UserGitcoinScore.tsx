import { SufficientUserScore } from '@/components/userActious/gitcoin/SufficientUserScore'
import { InsufficientUserScore } from '@/components/userActious/gitcoin/InsufficientUserScore'
import { environment } from '@/config/environment'

const userScore = 17

export interface UserScoreProps {
  userScore: number
}

export const UserGitcoinScore = () => {
  const isSufficientScore = userScore >= environment.gitcoinRequiredScore
  return isSufficientScore ? (
    <SufficientUserScore userScore={userScore} />
  ) : (
    <InsufficientUserScore userScore={userScore} />
  )
}
