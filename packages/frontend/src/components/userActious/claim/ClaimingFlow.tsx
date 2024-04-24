import { useUserBid } from "@/blockchain/hooks/useUserBid";
import { NoBidding } from "@/components/userActious/claim/NoBidding";
import { WinBidFlow } from "@/components/userActious/claim/WinBidFlow";
import { WinType } from "@/types/winType";

export const ClaimingFlow = () => {
  const bid = useUserBid()
  const userBid = bid ? { ...bid, winType: WinType.GoldenTicket, claimed: false } : undefined


  return userBid ? <WinBidFlow userBid={userBid}/> : <NoBidding/>
}
