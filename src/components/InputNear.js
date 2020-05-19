import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import styled, { css } from 'styled-components'
import { border } from '../styles/mixin'
import { toNear } from '../util/near-util'

import { 
    onContractChange,
} from './../redux/near'

const Root = styled.section`
    .note {
    }
    .near {
        display: inline-block;
        ${ border }
        strong {
            margin: 0 8px;
        }
        background: #F8F8F8;
    }
    button {
        margin-left: 16px;
        background: #00C08B;
        color: white;
        border-color: #00C08B;
    }
`;

const InputNear = ({
    options
}) => {

    const [amount, setAmount] = useState('0')

    return <Root>
        <div className="near"><strong>Ⓝ</strong>
            <input type="number" onChange={(e) => setAmount(e.target.value)} />
        </div>
        {
            options.map(({action, label}, i) => 
                <button key={i} onClick={() => action(toNear(amount))}>{ label }</button>
            )
        }
    </Root>
}

export default InputNear