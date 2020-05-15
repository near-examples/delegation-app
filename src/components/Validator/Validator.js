import 'regenerator-runtime/runtime'
import React from 'react'
import { useDispatch } from 'react-redux'

import {
    updateState,
} from '../../redux/validator'

import UnstakedView from './UnstakedView'
import SelectedView from './SelectedView'
import StakedView from './StakedView'
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
    > div.staked {
        border: 0.1rem solid var(--primary);
        box-shadow: 0 0 16px rgba(0, 0, 0, 0.1);
        margin: 16px 0;
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
        validatorState: {
            selectedContract,
        },
        contract: {
            contractId, staked
        }
    } = props
    const selected = contractId === selectedContract

    return <Root>
        <div 
            className={[
                selected ? 'selected' : '',
                parseInt(staked) > 0 ? 'staked' : ''
            ].join(' ')}
        >
            {
                selected
                    ?
                    <SelectedView {...props} />
                    :
                    parseInt(staked) > 0
                        ?
                        <StakedView {...props} />
                        :
                        <UnstakedView {...props} />
            }
        </div>
    </Root>
}

export default Validator

