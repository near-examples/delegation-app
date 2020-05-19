
import Big from 'big.js'

export const toNear = (value = '0') => Big(value).times(10 ** 24).toFixed()
export const nearTo = (value = '0', to = 2) => Big(value).div(10 ** 24).toFixed(to === 0 ? undefined : to)
export const big = (value = '0') => Big(value)
export const gtZero = (value = '0') => big(value).gt(big())
export const gtZeroApprox = (value = '0') => big(value).gt(big(1))