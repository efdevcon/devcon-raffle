import { createConfig, http } from "wagmi";
import { arbitrum, arbitrumSepolia, hardhat } from "wagmi/chains";

export const wagmiConfig = createConfig({
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
    config: typeof wagmiConfig
  }
}
