import React, { memo } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { big, nearTo } from '../../util/near-util'

import Avatar from './Avatar'
import InputNear from './../InputNear'

import {
    updateState, depositAndStake, onContractChange, onContractView
} from '../../redux/validator'

import countries from '../../data/countries'

const Root = styled.section`
    position: relative;
    display: flex;
    align-items: center;
    .desc {
        align-self: flex-start;
        font-size: 0.8rem;
        margin-left: var(--half-margin);
        p, h1, h2, h3 {
            margin: 0;
        }
        h1 {
            font-size: 1.5rem;
        }
    }
    .actions {
        text-align: right;
        width: 400px;
        min-width: 400px;
        margin-left: auto;
        > div:first-child {
            color: #888;
            font-size: 0.75rem;
            margin: 8px 0;
        }
    }
    .close {
        position:absolute;
        top: -16px;
        right: -16px;
        padding: 12px;
        line-height: 12px;
        z-index: 1000;
        background: white;
    }
`;

const SelectedView = ({selectedAction, contractId, staked, unstaked }) => {
    const dispatch = useDispatch()
    
    let option
    switch (selectedAction) {
        case 'stake': option = {
            label: 'Stake',
            desc: `Delegate a certain amount of Ⓝ to start earning rewards. Enter the amount you want to deposit and stake:`,
            action: (amount) => { // amount is in near (big)
                // enough unstaked balance to restake
                if (big(amount).lt(big(unstaked))) {
                    dispatch(onContractChange(selectedAction, {amount}))
                } else {
                    // no unstaked balance or not enough unstaked to cover
                    dispatch(depositAndStake(amount))
                }
            }
        }
        break
        case 'withdraw': option = {
            label: 'Withdraw',
            desc: `Withdraw up to ${nearTo(unstaked, 4)} Ⓝ from this validator. Enter the amount you want to withdraw:`,
            // action: (amount) => dispatch(onContractChange('unstake', {amount}))
            action: (amount) => dispatch(onContractChange(selectedAction, {amount}))  // amount is in near (big)
        }
        break
        case 'unstake': option = {
            label: 'Unstake',
            desc: `Unstake up to ${nearTo(staked, 4)} Ⓝ from this validator. Enter the amount you want to unstake:`,
            // action: (amount) => dispatch(onContractChange('unstake', {amount}))
            action: (amount) => dispatch(onContractChange(selectedAction, {amount}))  // amount is in near (big)
        }
    }

    return <Root>

        <div className="close" onClick={() => dispatch(updateState('selectedContract', false))}>×</div>
        <Avatar />
        <div className="desc">
            <h1>{contractId} {countries.CA.emoji}</h1>
            <p>
                {option.desc}
            </p>
        </div>


        {
            /********************************
            Debugging
            ********************************/
        }
        <div>
            <button onClick={() => {
                dispatch(onContractChange('ping'))
            }}>
                Ping
            </button>
        </div>
        <div>
            <button onClick={() => {
                dispatch(onContractChange('deposit', {}, '1'))
            }}>
                Deposit 1
            </button>
            <button onClick={() => {
                dispatch(onContractChange('unstake', { amount: '1' }))
            }}>
                Unstake 1
            </button>
        </div>
        {
            /********************************
            END OF Debugging
            ********************************/
        }


        
        <div className="actions">
            <div>🔒 You will be sent to your wallet to confirm this transaction.</div>
            <InputNear {...{options: [option]}} />
        </div>
    </Root>
}

export default memo(SelectedView)