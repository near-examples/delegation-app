import 'regenerator-runtime/runtime'
import React, { useCallback, useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import { border } from '../styles/mixin'
import { nearTo } from '../util/near-util'

import Logo from './../img/logo.png'

const Root = styled.header`
    margin: var(--margin);
    display: flex;
    align-items: center;
    > img {
        width: 140px;
    }
    > h1 {
        font-family: 'Inter', sans-serif;
        font-weight: 300;
        margin: 0;
        margin-left: var(--margin);
    }
    > div {
        margin-left: auto;
        ${border}
        padding: 4px 0;
        > div {
            padding: 0 8px;
            display: inline-block;
        }
        > div:first-child {
            font-weight:bold;
            border-right: 0.1em solid var(--primary);
        }
        > div:nth-child(2) {
            color: #00C08B;
        }
    }
    @media (max-width: 414px) {
        > img, > h1 {
            display: none;
        }
        > div {
            margin: auto;
        }
    }
`;

const Header = ({ currentUser }) => {
    return <Root>
        <img src={Logo} />
        <h1>Staking Rewards</h1>
        {
            currentUser && <div>
                <div>@{currentUser.accountId}</div>
                <div><strong>Ⓝ</strong> {nearTo(currentUser.balance || 0)}</div>
            </div>
        }
    </Root>
}

export default Header
