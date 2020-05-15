import React from 'react'
import styled from 'styled-components'

import Avatar from './Avatar'
import InputNear from './../InputNear'

import countries from '../../data/countries'

const Root = styled.section`
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
        width: 360px;
        min-width: 360px;
        margin-left: auto;
        > div:first-child {
            color: #888;
            font-size: 0.75rem;
            margin: 8px 0;
        }
    }
`;

// https://explorer.testnet.near.org/accounts/staking-pool-2

const SelectedView = ({ contractName }) => {
    return <Root>
        <Avatar />
        <div className="desc">
            <h1>{contractName} {countries.CA.emoji}</h1>
            <p>
            Delegate a certain amount of Ⓝ to start earning rewards. Enter the amount you want to deposit and stake:
            </p>
        </div>
        
        <div className="actions">
            <div>🔒 You will be sent to your wallet to confirm this transaction.</div>
            <InputNear 
                options={[
                    {
                        label: 'Stake',
                        action: (amount) => dispatch(batch(amount))
                    }
                ]}
            />
        </div>
    </Root>
}

export default SelectedView