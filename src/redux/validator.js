
import { getReducer, getState } from '../util/redux-util'
import getConfig from '../config.js'
import * as nearAPI from 'near-api-js'
import Big from 'big.js'
const nearConfig = getConfig(process.env.NODE_ENV || 'development')
const BOATLOAD_OF_GAS = Big(2).times(10 ** 14).toFixed()
const contractNames = [
	'staking-pool-2',
	'mattlock-val-2',
	'mattlock-val-3',
	'dev-1589245082250',
	'not-a-contract',
]
const stakingMethods = {
	viewMethods: [
		'get_account_staked_balance',
		'get_account_unstaked_balance',
		'get_account_total_balance',
		'is_account_unstaked_balance_available',
		'get_total_staked_balance',
		'get_owner_id',
		'get_reward_fee_fraction',
	],
	changeMethods: [
		'ping',
		'deposit',
		'withdraw',
		'stake',
		'unstake',
	],
}
//default state
const defaultState = {
	isLoading: true,
	contracts: {},
	selectedContract: '',
	selectedAction: 'stake',
}
const type = 'validatorReducer'
export const validatorReducer = getReducer(type, defaultState)
export const validatorState = getState(type)
//functions
export const updateState = (prop, value) => async (dispatch, getState) => {
	dispatch({ type, [prop]: value})
}
/********************************
Deposit and Stake
********************************/
export const depositAndStake = (amount) => async(dispatch, getState) => {
	const { walletConnection } = getState().nearReducer
	const { selectedContract, contracts } = getState().validatorReducer
	const contract = contracts[selectedContract] 
	console.log(contract, walletConnection)
	amount = Big(amount).times(10 ** 24).toFixed()
	const { functionCall } = nearAPI.transactions
	const actions = []
	actions.push(functionCall('deposit', new Uint8Array(), BOATLOAD_OF_GAS, amount))
	actions.push(functionCall('stake', new TextEncoder().encode(JSON.stringify({amount})), BOATLOAD_OF_GAS))
	const account = walletConnection.account()
	account.signAndSendTransaction(selectedContract, actions)
}
/********************************
Call a contract view method and optionally map the result to a state variable
********************************/
export const onContractView = (method, args, stateProp) => async (dispatch, getState) => {
	const { selectedContract, contracts } = getState().validatorReducer
	const contract = contracts[selectedContract] 
	if (!contract) {
		console.log('no contract selected')
		return
	}
	//view
	const res = await contract[method](args).catch((e) => { console.log(e) })
	if (stateProp) {
		dispatch({ type, [stateProp]: res })
	}
	return res
}
/********************************
Call a contract change method, using web wallet will be re-directed then re-mount app
********************************/
export const onContractChange = (method, args = {}, payableAmount = '0') => async (dispatch, getState) => {
	const { selectedContract, contracts } = getState().validatorReducer
	const contract = contracts[selectedContract] 
	if (!contract) {
		console.log('no contract selected')
		return
	}
	//convert
	if (args.amount) args.amount = Big(args.amount).times(10 ** 24).toFixed()
	payableAmount = Big(payableAmount).times(10 ** 24).toFixed()
	//call
	const res = await contract[method](args, BOATLOAD_OF_GAS, payableAmount)
		.catch((e) => { console.log(e) }) // (web wallet handles this part)
	console.log(res)
}
/********************************
Run after initNear redux/near.js
********************************/
export const initValidators = () => async (dispatch, getState) => {
	const { walletConnection } = getState().nearReducer
	const account = walletConnection.account()
	const {accountId} = account

	const contracts = {}
	for (let i = 0; i < contractNames.length; i++) {
		const contractName = contractNames[i]
		const contract = contracts[contractName] = await new nearAPI.Contract(account, contractName, {
			...stakingMethods,
			sender: accountId
		})
		// reading state and attaching to contract instance (bad practice?)
		const account_id = accountId // rust naming of params
		await Promise.all([
			contract.get_account_staked_balance({ account_id })
				.then((res) => contract.staked = res || '0')
				.catch((e) => contract.staked = '0'),
			contract.get_account_unstaked_balance({ account_id })
				.then((res) => contract.unstaked = res || '0')
				.catch((e) => contract.unstaked = '0')
		])
		dispatch({ type, contracts }) // update UI with each contract we instantiate
	}
	dispatch({ type, isLoading: false })
}

