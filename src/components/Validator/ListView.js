import React from 'react'
import styled from 'styled-components'

import Avatar from './Avatar'

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
    }
    .flag {
        width: 100px;
        min-width: 100px;
        text-align: center;
        margin: 0 32px;
        font-size: 3rem;
        img {
            width: 100%;
        }
    }
    .start {
        text-align: right;
        margin-left: auto;
        width: 140px;
        min-width: 140px;
    }
`;

// https://explorer.testnet.near.org/accounts/staking-pool-2

const ListView = ({ contractName }) => {
    return <Root>
        <Avatar />
        <div className="desc">
            <h2>{contractName}</h2>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ultrices erat lacus, in feugiat dui pellentesque sit amet. Praesent at lectus accumsan, semper elit quis. <a href="#">Learn More</a>
            
            </p>
        </div>
        <div className="flag">
            {/* {countries.CA.emoji} */}
            <img src={`https://cdn.countryflags.com/thumbs/${countries.CA.name.toLowerCase()}/flag-400.png`} />
        </div>
        <div className="start">
            <button>Start Staking</button>
        </div>
    </Root>
}

export default ListView

