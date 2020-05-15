
import { getReducer, getState } from '../util/redux-util'
import getConfig from './../config.js'
import * as nearAPI from 'near-api-js'
import Big from 'big.js'
const nearConfig = getConfig(process.env.NODE_ENV || 'development')
// all the methods for all staking contracts
const BOATLOAD_OF_GAS = Big(2).times(10 ** 14).toFixed()

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
	contractNames: [
		'staking-pool-2',
		'mattlock-val-2',
		'mattlock-val-3',
		'dev-1589245082250',
		'not-a-contract',
	],
	staked: 0,
	unstaked: 0,
	total: 0,
	loadingBalances: false,
	initialized: false,
	currentUser: { accountId: '' },
	connections: [],
	contracts: {},
	selectedContract: '',
}
const type = 'nearReducer'
export const nearReducer = getReducer(type, defaultState)
export const nearState = getState(type)
//functions
export const updateState = (prop, value) => async (dispatch, getState) => {
	dispatch({ type, [prop]: value})
}

/********************************
Deposit and Stake
********************************/
export const batch = (amount) => async(dispatch, getState) => {
	const { walletConnection, selectedContract, contracts } = getState().nearReducer
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
Call a contract view method and map result to a state variable,
********************************/
export const onContractView = (method, args, stateProp) => async (dispatch, getState) => {
	const { selectedContract, contracts } = getState().nearReducer
	const contract = contracts[selectedContract] 
	if (!contract) {
		console.log('no contract selected')
		return
	}
	//view
	const res = await contract[method](args)
		.catch((e) => {
			console.log(e)
		})
	if (stateProp) {
		dispatch({ type, [stateProp]: res })
	}
}
export const onContractChange = (method, args = {}, payableAmount = '0') => async (dispatch, getState) => {
	const { selectedContract, contracts } = getState().nearReducer
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
		.catch((e) => {
			console.log(e)
		})
	console.log(res)
}
export const signIn = (contractName = 'mattlock-val-1') => async (dispatch, getState) => {
	const { walletConnection } = getState().nearReducer
    walletConnection.requestSignIn(
        contractName,
        'Near Staking Rewards'
    )
}
export const signOut = () => async (dispatch, getState) => {
	const { walletConnection } = getState().nearReducer
	console.log(walletConnection)
    walletConnection.signOut()
    // window.location = '/'
}
export const initNear = () => async (dispatch) => {
	const { contractNames } = getState().nearReducer || defaultState
	// Initializing connection to the NEAR DevNet
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

	const contracts = {}
	for (let i = 0; i < contractNames.length; i++) {
		const contractName = contractNames[i]
		const contract = contracts[contractName] = await new nearAPI.Contract(walletConnection.account(), contractName, {
			...stakingMethods,
			sender: walletConnection.getAccountId()
		})
		// console.log(contract)
	}

	dispatch({ type, initialized: true, contracts, currentUser, nearConfig, walletConnection })
}



// useEffect(() => {
//     (async() => {

//         console.log(contract)
//         console.log(currentUser)
//         // console.log(nearConfig)
//         // console.log(wallet)
//         const balance = await contract.get_account_unstaked_balance({account_id: currentUser.accountId})
//         console.log(balance)
//         const total = await contract.get_account_total_balance({account_id: currentUser.accountId})
//         console.log(total)
        
//         // contract.ping()
//         // contract.get_account_total_balance({account_id: currentUser.accountId})
        
//     })()
// }, [])

// const test = useCallback(async (e) => {
//     // const { public_key } = await wallet.account().accessKeyForTransaction()
//     // console.log(public_key)
//     // contract.new({
//     // 	owner_id: "owner",
//     // 	stake_public_key: public_key.split(':')[1],
//     // 	reward_fee_fraction: { "numerator": 10, "denominator": 100 }
//     // })
// })

// const onSubmit = useCallback(e => {
//     e.preventDefault()

//     const { fieldset, message, donation } = e.target.elements

//     fieldset.disabled = true

//     // TODO: optimistically update page with new message,
//     // update blockchain data in background
//     // add uuid to each message, so we know which one is already known
//     contract.addMessage(
//         { text: message.value },
//         BOATLOAD_OF_GAS,
//         Big(donation.value || '0').times(10 ** 24).toFixed()
//     ).then(() => {
//         contract.getMessages().then(messages => {
//             setMessages(messages)

//             message.value = ''
//             donation.value = SUGGESTED_DONATION
//             fieldset.disabled = false
//             message.focus()
//         })
//     })
// }, [contract])
