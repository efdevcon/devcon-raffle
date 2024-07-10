import { useMemo } from 'react'
import { environment } from '@/config/environment'
import moment from 'moment-timezone'
import { useReadAuctionParams } from '@/blockchain/hooks/useReadAuctionParams'

const REDEEM_PERIOD = BigInt(moment.unix(0).add(48, 'h').unix())

export function useVoucherRedeemDeadline() {
  const { biddingEndTime } = useReadAuctionParams()
  return useMemo(() => {
    if (environment.voucherRedeemDeadline) {
      return BigInt(environment.voucherRedeemDeadline)
    }
    return biddingEndTime ? biddingEndTime + REDEEM_PERIOD : undefined
  }, [biddingEndTime])
}
