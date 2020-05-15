import React from 'react'
import styled from 'styled-components'

import NearLogo from './../../img/logo-solo.png'

const Root = styled.section`
    display: inline-block;
    border: 0.1em solid var(--primary);
    width: 100px;
    min-width: 100px;
    height: 100px;
    img {
        width: 100%;
    }
`;

// https://explorer.testnet.near.org/accounts/staking-pool-2

const Avatar = () => {
    return <Root>
        <img src={NearLogo} />
    </Root>
}

export default Avatar

