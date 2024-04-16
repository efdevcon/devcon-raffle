import { SupportedChainId } from "@/blockchain/chain";
import { Hex } from "viem";
import { arbitrum, arbitrumSepolia, hardhat } from "wagmi/chains";

export const AUCTION_ADDRESSES: Record<SupportedChainId, Hex> = {
  [arbitrum.id]: '0xF53d383525117d1f51BF234966E39bD1508a5948',
  [arbitrumSepolia.id]: '0xF53d383525117d1f51BF234966E39bD1508a5948',
  [hardhat.id]: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
}

export const DEPLOYMENT_BLOCK: Record<SupportedChainId, bigint> = {
  [arbitrum.id]: BigInt(16977962),
  [arbitrumSepolia.id]: BigInt(33877486),
  [hardhat.id]: BigInt(0),
}
