import { formatEther } from 'viem'

const decimalPlaces = 4
const factor = 10 ** decimalPlaces

export function formatBalance(balance: bigint | undefined) {
  if (!balance) {
    return '-'
  }

  const balanceStr = formatEther(balance)
  const formattedValue = Math.round(Number(balanceStr) * factor) / factor
  return formattedValue.toString()
}
