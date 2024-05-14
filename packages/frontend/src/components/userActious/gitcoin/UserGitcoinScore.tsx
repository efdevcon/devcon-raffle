import { SufficientUserScore } from '@/components/userActious/gitcoin/SufficientUserScore'
import { InsufficientUserScore } from '@/components/userActious/gitcoin/InsufficientUserScore'
import { environment } from '@/config/environment'

export interface UserScoreProps {
  userScore?: number
  gitcoinSettled?: () => void
  getBackToScoring?: () => void
}

export const UserGitcoinScore = ({ userScore, gitcoinSettled, getBackToScoring }: UserScoreProps) => {
  const isSufficientScore = userScore !== undefined && userScore >= environment.gitcoinRequiredScore
  return isSufficientScore ? (
    <SufficientUserScore userScore={userScore} gitcoinSettled={gitcoinSettled} />
  ) : (
    <InsufficientUserScore userScore={userScore} getBackToScoring={getBackToScoring} />
  )
}
