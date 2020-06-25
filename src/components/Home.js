import React from 'react'
import styled from 'styled-components'
import {Row, Col, Image} from 'react-bootstrap'

const Styles = styled.div`
    background: url(https://bit.ly/2NrvjD2);
    height: 100vh;
    z-index: 0;
    .container-home {
        z-index: 2;
        background: rgb(0,0,0,0.4);
        height: 100vh;
        width: 100%;
    }
    .home-row {
        
    }
    .img {
        height: 350px;
        margin-top: 25vh;
    }
    .title-white { 
        color: white;
        font-size: 5rem;
        margin-left: auto;
        margin-right: auto;
        margin-top: 10vh;
    }
`

const Home = props => {
    return (
        <Styles>
            <div className='container-home'>
                <Row className='home-row'>
                    <Col xs={2} />
                    <Col xs={4}>
                        <h1 className='title-white'>VisTrack</h1>
                        <p>Your new solution
                            for data management.
                        </p>
                    </Col>
                    <Col xs={4}>
                        <Image
                        className='img'
                        src='https://user-images.githubusercontent.com/1454752/29993250-51208336-8fcf-11e7-9723-a392f307a98d.jpg'/>
                    </Col>
                    <Col xs={2} />

                </Row>
            </div>
        </Styles>
    )
}

export default Home