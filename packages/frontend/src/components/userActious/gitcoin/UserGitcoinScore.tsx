import { SufficientUserScore } from "@/components/userActious/gitcoin/SufficientUserScore";
import { InsufficientUserScore } from "@/components/userActious/gitcoin/InsufficientUserScore";

const requiredScore = 20
const userScore = 17

export interface UserScoreProps {
  userScore: number
  requiredScore: number
}

export const UserGitcoinScore = () => {
  const isSufficientScore = userScore >= requiredScore
  return isSufficientScore ? <SufficientUserScore userScore={userScore} requiredScore={requiredScore}/> :
    <InsufficientUserScore userScore={userScore} requiredScore={requiredScore}/>
}
