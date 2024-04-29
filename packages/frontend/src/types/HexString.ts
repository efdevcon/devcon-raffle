import z from 'zod'
import type { Hex } from 'viem'

export const HexStringSchema = z.string().refine((arg): arg is Hex => /^0x([0-9a-fA-F]{2})*$/.test(arg))
