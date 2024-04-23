export const environment = {
  voucherRedeemDeadline: getDateEnv(process.env.NEXT_PUBLIC_VOUCHER_REDEEM_DEADLINE),
  walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? '',
  infuraKey: process.env.NEXT_PUBLIC_INFURA_KEY,
  gitcoinRequiredScore: Number(process.env.NEXT_PUBLIC_GITCOIN_REQUIRED_SCORE)
}

function getDateEnv(envValue: string | undefined): number | undefined {
  return envValue ? new Date(Number(envValue)).getTime() / 1000 : undefined
}
