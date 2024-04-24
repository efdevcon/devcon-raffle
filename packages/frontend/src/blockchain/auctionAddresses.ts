import { SupportedChainId } from '@/blockchain/chain'
import { Hex } from 'viem'
import { arbitrum, arbitrumSepolia, hardhat } from 'wagmi/chains'

export const AUCTION_ADDRESSES: Record<SupportedChainId, Hex> = {
  [arbitrum.id]: '0xF53d383525117d1f51BF234966E39bD1508a5948',
  [arbitrumSepolia.id]: '0x426Ee70332Ae67a5FdFb7B4B4A2C91F1f51712b0',
  [hardhat.id]: '0xa513e6e4b8f2a923d98304ec87f64353c4d5c853',
}

export const DEPLOYMENT_BLOCK: Record<SupportedChainId, bigint> = {
  [arbitrum.id]: BigInt(16977962),
  [arbitrumSepolia.id]: BigInt(33877486),
  [hardhat.id]: BigInt(0),
}
