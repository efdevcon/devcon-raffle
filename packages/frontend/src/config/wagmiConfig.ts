import { createConfig, http, webSocket } from "wagmi";
import { arbitrum, arbitrumSepolia, hardhat } from "wagmi/chains";

export const wagmiConfig = createConfig({
  chains: [arbitrum, arbitrumSepolia, hardhat],
  ssr: true,
  transports: {
    [arbitrum.id]: webSocket(`wss://arbitrum-mainnet.infura.io/ws/v3/${process.env.NEXT_INFURA_KEY}`),
    [arbitrumSepolia.id]: webSocket(`wss://arbitrum-sepolia.infura.io/ws/v3/${process.env.NEXT_INFURA_KEY}`),
    [hardhat.id]: webSocket('http://127.0.0.1:8545'),
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof wagmiConfig
  }
}
