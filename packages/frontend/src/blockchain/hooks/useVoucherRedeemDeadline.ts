import {useMemo} from "react";
import {environment} from "@/config/environment";
import moment from "moment-timezone";
import {useReadAuctionParams} from "@/blockchain/hooks/useReadAuctionParams";

const REDEEM_PERIOD = BigInt(moment.unix(0).add(48, 'h').unix())

export function useVoucherRedeemDeadline() {
  const {biddingEndTime} = useReadAuctionParams()
  return useMemo(() => {
    if (biddingEndTime) {
      return biddingEndTime + REDEEM_PERIOD
    }
    return environment.voucherRedeemDeadline ? BigInt(environment.voucherRedeemDeadline) : undefined
  }, [biddingEndTime])
}
