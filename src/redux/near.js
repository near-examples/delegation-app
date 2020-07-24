
import { getReducer, getState } from '../util/redux-util'
import getConfig from './../config.js'
import { accountId } from '../config-app.js'
import { network } from '../config-app.js'
import * as nearAPI from 'near-api-js'
import Big from 'big.js'
const nearConfig = getConfig(network || process.env.NODE_ENV || 'development')
const BOATLOAD_OF_GAS = Big(2).times(10 ** 14).toFixed()

//default state
const defaultState = {
	initialized: false,
	currentUser: { accountId: '' },
}
const type = 'nearReducer'
export const nearReducer = getReducer(type, defaultState)
export const nearState = getState(type)
//functions
export const updateState = (prop, value) => async (dispatch, getState) => {
	dispatch({ type, [prop]: value})
}
// the contract here doesn't really matter but it should be one we use
export const signIn = () => async (dispatch, getState) => {
	const { walletConnection } = getState().nearReducer
    walletConnection.requestSignIn(
        accountId,
        'Near Staking Rewards'
    )
}
export const signOut = () => async (dispatch, getState) => {
	const { walletConnection } = getState().nearReducer
	console.log(walletConnection)
    walletConnection.signOut()
    window.location = '/'
}
export const initNear = () => async (dispatch) => {
	// Initializing connection to the NEAR TestNet
	const near = await nearAPI.connect({
		deps: {
			keyStore: new nearAPI.keyStores.BrowserLocalStorageKeyStore()
		},
		...nearConfig
	})
	console.log(nearAPI)
	// Needed to access wallet
	const walletConnection = new nearAPI.WalletConnection(near)
	console.log(walletConnection)

	// Load in account data
	let currentUser
	if (walletConnection.getAccountId()) {
		currentUser = {
			accountId: walletConnection.getAccountId(),
			balance: (await walletConnection.account().state()).amount
		}
	}
	console.log(currentUser)

	dispatch({ type, initialized: true, currentUser, nearConfig, walletConnection })
}
