import React, { memo } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'

import { nearTo, gtZero, gtZeroApprox } from '../../util/near-util'

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
            min-width: 400px;
            margin: var(--half-margin);
            > div {
                display: flex;
                align-items: center;
                font-weight: 300;
                > div {
                    width: 200px;
                    text-align: left;
                }
                > div:first-child {
                    width: 200px;
                }
            }
            /* the labels */
            > div:nth-child(1) {
                text-transform: uppercase;
                span {
                    color: var(--mint);
                }
                margin-bottom: var(--half-margin);
            }
            /* the near amounts */
            > div:nth-child(2) {
                font-weight: bold;
                font-size: 20px;
                transform-origin: 0 50%;
                transform: scale(1.1, 1);
                > div:nth-child(2) {
                    margin-left: -20px;
                    span {
                        color: #999;
                        span {
                            font-size: 0.7rem;
                        }
                    }
                }
            }
        }
        .actions {
            width: 128px;
            min-width: 128px;
            button {
                min-width: 128px;
                display: block;
                margin-left: auto;
                margin-bottom: var(--half-margin);
            }
            button:nth-child(2) {
                margin-bottom: 0;
                color: var(--blue);
                border-color: var(--blue);
            }
        }
    
`;

const StakedView = ({ contractId, staked, unstaked, unstakedAvailable }) => {
    const dispatch = useDispatch()

    console.log(unstaked, unstakedAvailable, gtZeroApprox(unstaked))

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
            <div>
                <div>🔒 Staked</div>
                {
                    unstakedAvailable ?
                    <div><span>Available</span></div> :
                    gtZeroApprox(unstaked) && <div>Pending</div>
                }
            </div>
            <div>
                <div>Ⓝ {nearTo(staked, 2)}</div>
                {
                    unstakedAvailable ?
                    <div>Ⓝ {nearTo(unstaked, 2)}</div> :
                    gtZeroApprox(unstaked) &&
                    <div><span>{nearTo(unstaked, 2)} <span>in 48 h</span></span></div>
                }
            </div>
        </div>
        <div className="actions">
            <button onClick={() => {
                dispatch(updateState('selectedAction', 'stake'))
                dispatch(updateState('selectedContract', contractId))
            }}>
                Stake
            </button>
            {
                unstakedAvailable && gtZeroApprox(unstaked) ?
                <button onClick={() => {
                    dispatch(updateState('selectedAction', 'withdraw'))
                    dispatch(updateState('selectedContract', contractId))
                }}>
                    Withdraw
                </button> :
                <button onClick={() => {
                    dispatch(updateState('selectedAction', 'unstake'))
                    dispatch(updateState('selectedContract', contractId))
                }}>
                    Unstake
                </button>
            }
        </div>
    </Root>
}

export default memo(StakedView)