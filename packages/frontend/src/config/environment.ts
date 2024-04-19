export const environment = {
  voucherRedeemDeadline: getDateEnv(process.env.NEXT_PUBLIC_VOUCHER_REDEEM_DEADLINE),
}

function getDateEnv(envValue: string | undefined): number | undefined {
  return envValue ? new Date(Number(envValue)).getTime() / 1000 : undefined
}
