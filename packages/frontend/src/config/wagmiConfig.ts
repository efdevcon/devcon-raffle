import { createConfig, webSocket } from 'wagmi'
import { arbitrum, arbitrumSepolia, hardhat } from 'wagmi/chains'
import { coinbaseWallet, walletConnect } from 'wagmi/connectors'
import { environment } from '@/config/environment'

export const wagmiConfig = createConfig({
  chains: [arbitrum, arbitrumSepolia, hardhat],
  ssr: true,
  transports: {
    [arbitrum.id]: webSocket(`wss://arbitrum-mainnet.infura.io/ws/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`),
    [arbitrumSepolia.id]: webSocket(`wss://arbitrum-sepolia.infura.io/ws/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`),
    [hardhat.id]: webSocket('ws://127.0.0.1:8545'),
  },
  connectors: [
    walletConnect({ projectId: environment.walletConnectProjectId }),
    coinbaseWallet({ appName: 'Devcon Auction/Raffle' }),
  ],
})

declare module 'wagmi' {
  interface Register {
    config: typeof wagmiConfig
  }
}
