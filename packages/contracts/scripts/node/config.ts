import { utils } from 'ethers'
import { HOUR } from 'scripts/utils/consts'

export const reservePrice = utils.parseEther('0.15')
export const minBidIncrement = utils.parseEther('0.01')
export const minStateDuration = 6 * HOUR
export const initialRequiredScore = 20 * 10 ** 8 // 20.0
