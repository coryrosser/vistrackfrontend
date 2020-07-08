import React from 'react'
import styled from 'styled-components'
import {Row, Col, Image} from 'react-bootstrap'
import {FaChartBar, FaSlidersH, FaSave} from 'react-icons/fa'

const Styles = styled.div`
    background: url(https://bit.ly/2NrvjD2);
    height: 100vh;
    z-index: 0;

    span {
        color: #02c39a;
    }
    .home-row {
        height: 75%;
    }
    .graph-icon {
        margin-top: 1vh;
        font-size: 7rem;
        color:#02c39a;
        margin-left: auto;
        margin-right:auto;
    }
    .branding-row {
        margin-left: 0;
        height: 25%;
        text-align:center;
    }
    .lower-brand-text {
        color: #f7f7f7;
        text-align:center;
        margin-left:auto;
        margin-right:auto;
    }
    .container-home {
        overflow: hidden;
        z-index: 2;
        background: rgb(0,0,0,0.4);
        height: 100vh;
        width: 100%;
    }
    .brand-p {
        color: #f7f7f7;
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
                        <h6 className='brand-p'>
                            Data Management made <span>Simple</span> and <span>Engaging</span>
                        </h6>
                        <p className='brand-p'>
                            Upload your CSV file and get
                            instant Data Visualizations
                        </p>
                        <p className='brand-p'>
                            Personalize and Export your Trackers
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