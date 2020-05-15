import 'regenerator-runtime/runtime'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import styled, { css } from 'styled-components'
import Header from './components/Header'
import Validator from './components/Validator/Validator'
import StakedView from './components/Validator/StakedView'

//redux
import { nearState, initNear } from './redux/near'

const Root = styled.main`
	margin: auto;
	max-width: 1000px;
`;

const Heading = styled.div`
	margin: auto;
	padding: 16px 0;
	max-width: 1000px;
	font-weight: 300;
`;

const App = (props) => {

	const { 
		nearState: { currentUser, contractNames, selectedContract }
	} = props

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(initNear())
	}, [])

	return (<>
		<Header {...{ currentUser }} />
		<Root>
			<Heading>MY VALIDATORS</Heading>
			{
				contractNames.slice(0, 2).map((contractName) => 
					<StakedView {...{
						...props, key: contractName, contractName
					}} />
				)
			}
			<Heading>EXPLORE OTHER VALIDATORS</Heading>
			{
				contractNames.map((contractName) => 
				<Validator {...{
					...props, key: contractName, contractName
				}} />
				)
			}
		</Root>
		<div>
			<button onClick={() => dispatch(signIn())}>Sign In</button>
			<button onClick={() => dispatch(signOut())}>Sign Out</button>
		</div>
		</>
	)
}

export default connect(
	(state) => ({
		nearState: nearState(state),
	})
)(App)
