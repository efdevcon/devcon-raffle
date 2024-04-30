import { Address } from 'viem'

/**
 * Build voucher claim message for EIP-191 signing
 */
export function buildVoucherClaimMessage(chainId: number, userAddress: Address, nonce: string) {
  return `Claim voucher code for address ${chainId}:${userAddress}. Nonce: ${nonce}`
}
