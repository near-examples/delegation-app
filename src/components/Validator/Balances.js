import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import styled, { css } from 'styled-components'
import { border } from '../../styles/mixin'
import { nearTo } from '../../util/near-util'
import { 
    onContractChange, batch
} from '../../redux/near'
import InputNear from '../InputNear'
const Root = styled.section`
    min-width: 400px;
    .balances {
        > div {
            display: flex;
            align-items: center;
            justify-content: space-between;
            > button {
                margin-left: auto;
                margin-bottom: 16px;
            }
        }
    }
    .action {
        
        .close {
            position:absolute;
            top: 0;
            right: 0;
            padding: 8px;
            height: 24px;
            line-height: 8px;
            z-index: 1000;
            background: white;
        }
    }
`;

const states = {
    1: { balance: 'balance', options: ['deposit'], labels: ['Deposit'] },
    2: { balance: 'unstaked', options: ['stake', 'withdraw'], labels: ['Stake', 'Withdraw'] },
    3: { balance: 'staked', options: ['unstake'], labels: ['Unstake'] },
}

const cap = (str) => str.substring(0, 1).toUpperCase() + str.substring(1)

const Balances = (props) => {
    const { balance = '0', staked = '0', unstaked = '0', total = '0' } = props
    const dispatch = useDispatch()

    const [state, setState] = useState(0)

    return <Root>
        {
            state === 0 &&
            <div className="balances">
                <InputNear options={[{
                    action: (amount) => dispatch(batch(amount)),
                    label: 'Deposit and Stake'
                }]}
                />
                <div>
                    <div>{nearTo(balance)} Available</div>
                    <button onClick={() => setState(1)}>Deposit</button>
                </div>
                {   parseInt(unstaked) > 0 &&
                    <div>
                        <div>{nearTo(unstaked)} Deposited</div>
                        <button onClick={() => setState(2)}>Stake/Withdraw</button>
                    </div>
                }
                {   parseInt(staked) > 0 &&
                    <div>
                        <div>{nearTo(staked)} Staked</div>
                        <button onClick={() => setState(3)}>Unstake</button>
                    </div>
                }
            </div>
        }

        { state > 0 && <>
            <div className="action">
                <div className="close" onClick={() => setState(0)}>×</div>
                <div>{cap(states[state].balance)} {nearTo(props[states[state].balance])}</div>
                <InputNear
                    options={ states[state].options.map((option, i) => {
                        const ret = { label: states[state].labels[i] }
                        if (option === 'deposit') {
                            ret.action = (amount) => dispatch(onContractChange(option, {}, amount))
                        } else {
                            ret.action = (amount) => dispatch(onContractChange(option, { amount }))
                        }
                        return ret
                    })}
                />
            </div>
        </>}
        
    </Root>
    
}

export default Balances