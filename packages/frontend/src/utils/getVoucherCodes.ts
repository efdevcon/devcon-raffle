import * as jose from 'jose'
import { environment } from '@/config/environment'
import { readFile } from 'node:fs/promises'

export async function getVoucherCodes() {
  console.log('Get voucher codes for', process.env.NODE_ENV)
  const encryptedVoucherCodes = await readFile(process.cwd() + `/src/voucherCodes.production`, {
    encoding: 'utf-8',
  })
  return decryptVoucherCodes(encryptedVoucherCodes, environment.authSecret)
}

/**
 * Decrypt voucher codes from a JWE string
 *
 * @param encryptedVoucherCodes Encrypted JWE string containing voucher codes
 * @param secretKey Secret key (plaintext) to encrypt with, must be minimally encodable to 32
 *  bytes. If encoded key is >32B, then only the first 32B are used.
 * @returns Array of voucher codes
 */
export async function decryptVoucherCodes(encryptedVoucherCodes: string, secretKey: Uint8Array) {
  console.log('Decrypting file..')
  console.log(encryptedVoucherCodes)

  try {
    const { plaintext } = await jose.compactDecrypt(encryptedVoucherCodes, secretKey.slice(0, 32))
    console.log('File decrypted..')

    const vouchers = new TextDecoder().decode(plaintext).split(',')
    console.log('# of vouchers:', vouchers.length)
    return vouchers
  } catch (e) {
    console.error('Error decrypting voucher codes', e)
    return []
  }
}
