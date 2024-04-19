import { WagmiProvider } from 'wagmi'
import { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { wagmiConfig } from '@/config/wagmiConfig'
import { createWeb3Modal } from '@web3modal/wagmi/react'
import { environment } from '@/config/environment'

interface ProviderProps {
  children: ReactNode
}

const queryClient = new QueryClient()

createWeb3Modal({
  projectId: environment.walletConnectProjectId,
  wagmiConfig,
})

export const BlockchainProviders = ({ children }: ProviderProps) => {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}
