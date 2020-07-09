import React from 'react'
import {Spinner} from 'react-bootstrap' 
import styled from 'styled-components'

const Styles = styled.div`
    margin-left: auto;
    margin-right: auto;
    .loader {
        color: rgb(42, 157, 244);
        margin: 1rem;
    }
`
const Load = () => {
    return (
        <Styles>
            <Spinner className='loader' animation='grow'/>
            <Spinner className='loader' animation='grow' />
            <Spinner className='loader' animation='grow' />
        </Styles>
    )
}

export default Load