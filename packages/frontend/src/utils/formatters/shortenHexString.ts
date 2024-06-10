import { Hex } from 'viem'

export const shortenHexString = (hexString: Hex, start = 6, end = 4) =>
  `${hexString.substring(0, start)}....${hexString.substring(hexString.length - end)}`
