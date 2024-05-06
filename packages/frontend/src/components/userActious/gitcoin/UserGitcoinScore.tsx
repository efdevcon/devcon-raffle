import { SufficientUserScore } from '@/components/userActious/gitcoin/SufficientUserScore'
import { InsufficientUserScore } from '@/components/userActious/gitcoin/InsufficientUserScore'
import { environment } from '@/config/environment'

export interface UserScoreProps {
  userScore?: number
}

export const UserGitcoinScore = ({ userScore }: UserScoreProps) => {
  const isSufficientScore = userScore && userScore >= environment.gitcoinRequiredScore
  return isSufficientScore ? (
    <SufficientUserScore userScore={userScore} />
  ) : (
    <InsufficientUserScore userScore={userScore} />
  )
}
