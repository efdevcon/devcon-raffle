import { State, WagmiProvider } from 'wagmi'
import { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { wagmiConfig } from '@/config/wagmiConfig'
import { createWeb3Modal } from '@web3modal/wagmi/react'
import { environment } from '@/config/environment'

interface ProviderProps {
  children: ReactNode
  initialState: State | undefined
}

const queryClient = new QueryClient()

createWeb3Modal({
  projectId: environment.walletConnectProjectId,
  wagmiConfig,
})

export const BlockchainProviders = ({ children, initialState }: ProviderProps) => {
  return (
    <WagmiProvider config={wagmiConfig} initialState={initialState} reconnectOnMount>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}
