import { NoBidding } from '@/components/userActious/claim/NoBidding'
import { WinBidFlow } from '@/components/userActious/claim/WinBidFlow'
import { useUserSettledBid } from '@/blockchain/hooks/useUserSettledBid'

export const ClaimingFlow = () => {
  const { userBid } = useUserSettledBid()

  return userBid ? <WinBidFlow userBid={userBid} /> : <NoBidding />
}
