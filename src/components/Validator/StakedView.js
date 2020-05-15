import React, { memo } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'

import { nearTo } from '../../util/near-util'

import {
    updateState,
} from '../../redux/validator'
import Avatar from './Avatar'
import InputNear from './../InputNear'

import countries from '../../data/countries'

const Root = styled.section`
        display: flex;
        align-items: center;

        .desc {
            width: 100%;
            align-self: flex-start;
            font-size: 0.8rem;
            margin-left: var(--half-margin);
            p, h1, h2, h3 {
                margin: 0;
            }
            p {
                margin-top: 52px;
            }
            h1 {
                font-size: 1.5rem;
            }
        }
        .near {
            text-align: right;
            width: 150px;
            min-width: 150px;
            font-size: 16px;
            font-weight: bold;
        }
        .actions {
            text-align: right;
            width: 300px;
            min-width: 300px;
            margin-left: auto;
            button:first-child {
                margin-right: 16px;
                color: #0071CE;
                border-color: #0071CE;
            }
        }
    
`;

// staking-pool-2

const StakedView = ({ staked, contractId }) => {
    const dispatch = useDispatch()

    return <Root>
        <Avatar />
        <div className="desc">
            <h1>{contractId} {countries.CA.emoji}</h1>
            <p>
                <a href={`https://explorer.testnet.near.org/accounts/${contractId}`} target="_blank">
                    📈  View transactions on Near
                </a>
            </p>
        </div>
        <div className="near">
            Ⓝ {nearTo(staked, 4)}
        </div>
        <div className="actions">
            <button onClick={() => {
                dispatch(updateState('selectedAction', 'withdraw'))
                dispatch(updateState('selectedContract', contractId))
            }}>
                Withdraw
            </button>
            <button onClick={() => {
                dispatch(updateState('selectedAction', 'stake'))
                dispatch(updateState('selectedContract', contractId))
            }}>
                Stake More
            </button>
        </div>
    </Root>
}

export default memo(StakedView)