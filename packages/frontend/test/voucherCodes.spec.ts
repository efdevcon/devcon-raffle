// @vitest-environment node
import { expect, test, describe, assert } from 'vitest'
import { encryptVoucherCodes } from '@/utils/encryptVoucherCodes'
import { randomUUID } from 'crypto'
import { decryptVoucherCodes } from '@/utils/getVoucherCodes'

describe('Voucher codes', () => {
  test('encryption/decryption', async () => {
    const secretKey = new TextEncoder().encode('this encodes to at least 32 bytes!')
    const voucherCodes = Array(20)
      .fill(0)
      .map((_) => randomUUID())
    const encryptedVoucherCodes = await encryptVoucherCodes(voucherCodes, secretKey)
    expect(await decryptVoucherCodes(encryptedVoucherCodes, secretKey)).to.deep.eq(voucherCodes)
  })
})
