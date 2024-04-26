import z from 'zod'
import { getAddress, isAddress, Address } from 'viem'

export const EthereumAddressSchema = z.string().refine((arg): arg is Address => {
  try {
    return isAddress(getAddress(arg))
  } catch (err) {
    return false
  }
})
