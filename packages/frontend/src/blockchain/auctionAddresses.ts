import { SupportedChainId } from '@/blockchain/chain'
import { Hex } from 'viem'
import { arbitrum, arbitrumSepolia, hardhat } from 'wagmi/chains'

export const AUCTION_ADDRESSES: Record<SupportedChainId, Hex> = {
  [arbitrum.id]: '0xF53d383525117d1f51BF234966E39bD1508a5948',
  [arbitrumSepolia.id]: '0x2cc7f85730052dA7389e276115975a5dB1e7A668',
  [hardhat.id]: '0xa513e6e4b8f2a923d98304ec87f64353c4d5c853',
}
