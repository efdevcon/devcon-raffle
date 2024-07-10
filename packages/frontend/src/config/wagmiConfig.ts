import { cookieStorage, createConfig, createStorage, http } from 'wagmi'
import { arbitrum, arbitrumSepolia, hardhat } from 'wagmi/chains'
import { coinbaseWallet, walletConnect } from 'wagmi/connectors'
import { environment } from '@/config/environment'
import { SupportedChains } from '@/blockchain/chain'

const storage = createStorage({
  storage: cookieStorage,
})

export const wagmiConfig = createConfig({
  chains: SupportedChains,
  ssr: true,
  transports: {
    [arbitrum.id]: http(`https://arbitrum-mainnet.infura.io/v3/${environment.infuraKey}`),
    [arbitrumSepolia.id]: http(`https://arbitrum-sepolia.infura.io/v3/${environment.infuraKey}`),
    [hardhat.id]: http('http://127.0.0.1:8545'),
  },
  connectors: [
    walletConnect({ projectId: environment.walletConnectProjectId }),
    coinbaseWallet({ appName: 'Devcon Auction/Raffle' }),
  ],
  storage,
})

declare module 'wagmi' {
  interface Register {
    config: typeof wagmiConfig
  }
}
