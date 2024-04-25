import { useAccount } from 'wagmi'

export function useExplorerAddressLink(address: string) {
  const url = useExplorerUrl()
  return `${url}/address/${address}`
}

export function useExplorerTxLink(txHash: string) {
  const url = useExplorerUrl()
  return `${url}/tx/${txHash}`
}

function useExplorerUrl() {
  const { chain } = useAccount()
  return chain?.blockExplorers?.default.url
}
