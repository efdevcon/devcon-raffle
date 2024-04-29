import { Hex } from 'viem'
import { useChainId, useChains } from 'wagmi'

export function useExplorerAddressLink(address: Hex | undefined): string | undefined {
  const url = useExplorerUrl()
  return url && `${url}/address/${address}`
}

export function useExplorerTxLink(txHash: string) {
  const url = useExplorerUrl()
  return `${url}/tx/${txHash}`
}

function useExplorerUrl() {
  const chains = useChains()
  const chainId = useChainId()
  const currentChain = chains.find((chain) => chain.id === chainId)
  return currentChain?.blockExplorers?.default.url
}
