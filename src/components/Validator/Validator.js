import 'regenerator-runtime/runtime'
import React from 'react'
import { useDispatch } from 'react-redux'

import {
    updateState,
} from '../../redux/near'

import ListView from './ListView'
import SelectedView from './SelectedView'
import styled from 'styled-components'

const Root = styled.section`
    height: 134px;
    min-height: 134px;
    max-height: 134px;
    > div {
        background: white;
        position: relative;
        transition: box-shadow 0.25s ease-out, transform 0.25s ease-out;
        border-top: 0.1rem solid var(--primary);
        padding: 16px;
    }
    > div.selected {
        border: 0.1rem solid var(--primary);
        box-shadow: 0 0 16px rgba(0, 0, 0, 0.25);
        transform: translateY(-8px);
        z-index:1000;
    }
`;

// https://explorer.testnet.near.org/accounts/staking-pool-2

const Validator = (props) => {
    const dispatch = useDispatch()
    const {
        nearState: {
            selectedContract,
            loadingBalances,
        },
        contractName
    } = props
    const selected = contractName === selectedContract

    return <Root>
        <div className={selected ? 'selected' : ''}
            onClick={() => {
                if (selected || loadingBalances) return
                // dispatch(updateState('loadingBalances', true))
                dispatch(updateState('selectedContract', contractName))
            }}
        >
            {
                selected
                    ?
                    <SelectedView {...props} />
                    :
                    <ListView {...props} />
            }
        </div>
    </Root>
}

export default Validator

