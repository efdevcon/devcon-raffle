import { arbitrum, arbitrumSepolia, hardhat } from 'wagmi/chains'

const AllSupportedChains = [hardhat, arbitrum, arbitrumSepolia] as const
export type SupportedChainId = (typeof AllSupportedChains)[number]['id']

export const SupportedChains = process.env.NODE_ENV === 'production' ? ([arbitrum] as const) : AllSupportedChains
