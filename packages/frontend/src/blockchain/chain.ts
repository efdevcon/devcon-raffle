import {arbitrum, arbitrumSepolia, hardhat} from "wagmi/chains";

const SUPPORTED_CHAIN_IDS = [arbitrum.id, arbitrumSepolia.id, hardhat.id] as const
export type SupportedChainId = (typeof SUPPORTED_CHAIN_IDS)[number]
