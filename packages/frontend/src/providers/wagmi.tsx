import { WagmiProvider } from "wagmi";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { wagmiConfig } from "@/config/wagmiConfig";

interface ProviderProps {
  children: ReactNode
}

const queryClient = new QueryClient()

export const BlockchainProviders = ({ children }: ProviderProps) => {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  )
}
