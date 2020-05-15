
import Big from 'big.js'

export const nearTo = (value = '0', to = 2) => Big(value).div(10 ** 24).toFixed(to)