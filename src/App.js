import 'regenerator-runtime/runtime'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import styled, { css } from 'styled-components'
import Header from './components/Header'
import Validator from './components/Validator/Validator'

//redux
import { nearState, initNear, signIn, signOut } from './redux/near'
import { validatorState, initValidators } from './redux/validator'

const Root = styled.main`
	margin: auto;
	max-width: 1000px;
`;

const Buttons = styled.div`
	float: right;
	margin: auto;
	padding: 0 32px;
`;

const Heading = styled.div`
	margin: auto;
	padding: 16px 0;
	max-width: 1000px;
	font-weight: 300;
`;

let leInterval


const App = (props) => {

	const { 
		nearState: { currentUser },
		validatorState: { isLoading, contracts, selectedContract }
	} = props

	let [loadingElip, setLE] = useState('')

	const dispatch = useDispatch()

	const init = async() => {
		await dispatch(initNear()) // need state before initValidators
		await dispatch(initValidators())
	}

	useEffect(() => {
		init()
		if (isLoading) {
			leInterval = setInterval(() => {
				loadingElip += '.'
				if (loadingElip.length === 4) loadingElip = ''
				setLE(loadingElip)
			}, 500)
		}
	}, [])
	if (!isLoading) clearInterval(leInterval)

	// validator lists (each validator is a contract loading in redux/validator.js)
	const loaded = Object.keys(contracts).map((n) => contracts[n])
	const staked = loaded.filter((v) => parseInt(v.staked) > 0)
	const unstaked = loaded.filter((v) => parseInt(v.staked) === 0)
	
	return (<>
		
		<Header {...{ currentUser }} />

		<Buttons>
			{ currentUser ? 
				<button onClick={() => dispatch(signOut())}>Sign Out</button> :
				<button onClick={() => dispatch(signIn())}>Sign In</button>
			}
		</Buttons>

		<Root>
			{ staked.length > 0 && <Heading>MY VALIDATORS {isLoading ? `(loading${loadingElip})` : ''}</Heading>}
			{
				staked.map((contract) => 
					<Validator {...{
						...props, key: contract.contractId, contract,
					}} />
				)
			}
			{ unstaked.length > 0 && <Heading>EXPLORE VALIDATORS {isLoading ? `(loading${loadingElip})` : ''}</Heading>}
			{
				unstaked.map((contract) => 
				<Validator {...{
					...props, key: contract.contractId, contract, 
				}} />
				)
			}
		</Root>
		</>
	)
}

export default connect(
	(state) => ({
		nearState: nearState(state),
		validatorState: validatorState(state),
	})
)(App)
