import React from 'react'
import styled from 'styled-components'

const Styles = styled.div`
    border: #f7f7f7 solid 1px;
    height: 100vh;
    background: rgb(42, 157, 244, 0.1);
    `

const MainContainer = (props) => {
    return (
        <Styles>
        <div className='outer'>
            Main
        </div>
        </Styles>
    )
}

export default MainContainer