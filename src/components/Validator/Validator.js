import 'regenerator-runtime/runtime'
import React from 'react'
import { useDispatch } from 'react-redux'

import UnstakedView from './UnstakedView'
import SelectedView from './SelectedView'
import StakedView from './StakedView'
import styled, { keyframes } from 'styled-components'

const intro = keyframes`
  from {
    opacity: 0;
    transform: scale(1.15, 1.15);
  }
  to {
    opacity: 1;
    transform: scale(1, 1);
    box-shadow: none;
  }
`;

const Root = styled.section`
    transform-origin: 50% 50%;
    height: 134px;
    min-height: 134px;
    max-height: 134px;
    animation: ${intro} 250ms ease-in;
    > div {
        background: white;
        position: relative;
        transition: box-shadow 250ms ease-out, transform 250ms ease-out;
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
        nearState: { currentUser },
        validatorState: {
            selectedContract, selectedAction,
        },
        contract: {
            contractId, staked, unstaked
        }
    } = props
    const selected = contractId === selectedContract
    const hasStake = parseInt(staked) > 0

    return <Root>
        <div
            className={[
                selected ? 'selected' : '',
                hasStake > 0 ? 'staked' : ''
            ].join(' ')}
        >
            {
                selected ?
                    <SelectedView {...{ currentUser, selectedAction, staked, contractId }} /> :
                    hasStake ?
                        <StakedView {...{ contractId, unstaked, staked }} /> :
                        <UnstakedView {...{ currentUser, contractId }} />
            }
        </div>
    </Root>
}

export default Validator

