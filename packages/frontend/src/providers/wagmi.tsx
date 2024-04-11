import {createConfig, http, WagmiProvider} from "wagmi";
import {arbitrum, arbitrumSepolia, hardhat} from "wagmi/chains";
import {ReactNode} from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

interface ProviderProps {
  children: ReactNode
}

const queryClient = new QueryClient()

export const BlockchainProviders = ({children}: ProviderProps) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  )
}

const config = createConfig({
  chains: [arbitrum, arbitrumSepolia, hardhat],
  ssr: true,
  transports: {
    [arbitrum.id]: http(),
    [arbitrumSepolia.id]: http(),
    [hardhat.id]: http()
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
