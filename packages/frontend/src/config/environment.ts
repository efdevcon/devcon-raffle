export const environment = {
  voucherRedeemDeadline: getDateEnv(process.env.NEXT_VOUCHER_REDEEM_DEADLINE),
}

function getDateEnv(envValue: string | undefined): number | undefined {
  return envValue ? new Date(envValue).getTime() / 1000 : undefined
}
