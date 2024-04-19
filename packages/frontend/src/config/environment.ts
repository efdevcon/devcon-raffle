export const environment = {
  voucherRedeemDeadline: getDateEnv(process.env.NEXT_PUBLIC_VOUCHER_REDEEM_DEADLINE),
  walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? '',
}

function getDateEnv(envValue: string | undefined): number | undefined {
  return envValue ? new Date(Number(envValue)).getTime() / 1000 : undefined
}
