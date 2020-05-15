import React from 'react'
import styled from 'styled-components'

import { nearTo } from '../../util/near-util'

import Avatar from './Avatar'
import InputNear from './../InputNear'

import countries from '../../data/countries'

const Root = styled.section`
    height: 134px;
    min-height: 134px;
    max-height: 134px;
    margin: 16px 0;
    > div {
        display: flex;
        align-items: center;
        width: 100%;
        background: white;
        padding: 16px;

        border: 0.1rem solid var(--primary);
        box-shadow: 0 0 16px rgba(0, 0, 0, 0.1);

        .desc {
            width: 100%;
            align-self: flex-start;
            font-size: 0.8rem;
            margin-left: var(--half-margin);
            p, h1, h2, h3 {
                margin: 0;
            }
            p {
                margin-top: 24px;
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
        
    }
    
`;

// staking-pool-2

const StakedView = (props) => {

    const {
        nearState: {
            staked
        }, 
        contractName
    } = props
    return <Root>
        <div>
            <Avatar />
            <div className="desc">
                <h1>{contractName} {countries.CA.emoji}</h1>
                <p>
                    <a href={`https://explorer.testnet.near.org/accounts/${{contractName}}`}>
                        📈  View transactions on Near
                    </a>
                </p>
            </div>
            <div className="near">
                Ⓝ {nearTo(Math.random()*1000000000000000000000000000, 4)}
            </div>
            <div className="actions">
                
                <button>Withdraw</button>
                <button>Stake More</button>
            </div>
        </div>
    </Root>
}

export default StakedView