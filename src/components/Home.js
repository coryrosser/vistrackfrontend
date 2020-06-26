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
    .brand-p {
        color: white;
        text-align: center;
        margin-right: 11vw;
        margin-top: 5vh;
    }
    .img {
        height: 350px;
        margin-top: 10vh;
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
                        <p className='brand-p'>
                            Your new solution
                            for data management.
                        </p>
                        <p className='brand-p'>
                            Upload your CSV file and get
                            instant Data Visualizations
                        </p>
                        <p className='brand-p'>
                            Collaborate on Projects with VisTeams
                        </p>
                    </Col>
                    <Col xs={4}>
                        <Image
                        className="img"
                        src='https://screenshots.codesandbox.io/8xstw.png' />
                    </Col>
                    <Col xs={2} />

                </Row>
            </div>
        </Styles>
    )
}

export default Home