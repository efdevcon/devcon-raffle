import { createConfig, webSocket } from 'wagmi'
import { arbitrum, arbitrumSepolia, hardhat } from 'wagmi/chains'
import { coinbaseWallet, walletConnect } from 'wagmi/connectors'
import { environment } from '@/config/environment'
import { SupportedChains } from '@/blockchain/chain'

export const wagmiConfig = createConfig({
  chains: SupportedChains,
  ssr: true,
  transports: {
    [arbitrum.id]: webSocket(`wss://arbitrum-mainnet.infura.io/ws/v3/${environment.infuraKey}`),
    [arbitrumSepolia.id]: webSocket(`wss://arbitrum-sepolia.infura.io/ws/v3/${environment.infuraKey}`),
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
