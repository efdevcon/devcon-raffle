import * as jose from 'jose'

/**
 * Encrypt voucher codes
 *
 * @param voucherCodes Array of voucher codes
 * @param secretKey Secret key (plaintext) to encrypt with, must be minimally encodable to 32
 *  bytes. If encoded key is >32B, then only the first 32B are used.
 * @returns compact JWE string
 */
export async function encryptVoucherCodes(voucherCodes: string[], secretKey: Uint8Array) {
  const encryptedVoucherCodes = await new jose.CompactEncrypt(new TextEncoder().encode(voucherCodes.join(',')))
    .setProtectedHeader({
      alg: 'dir',
      enc: 'A256GCM',
    })
    .encrypt(secretKey.slice(0, 32))
  return encryptedVoucherCodes
}
