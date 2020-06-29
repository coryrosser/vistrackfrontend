import React from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import ExploreLineChart from './ExploreLineChart'
import ExploreBubbleChart from './ExploreBubbleChart'
import { Container, Jumbotron } from 'react-bootstrap'

const Styles = styled.div`
    background: url(https://bit.ly/2NrvjD2);
    height: 100vh;
    .j-contain {
        text-align: center;
        background: rgb(0,0,0,0.0);
    }
    .jumbo {
        background: linear-gradient(0deg, rgba(2, 195, 154, 0.0) 0%, rgba(2, 195, 154, 1) 100%);
    }
    .container-explore {
        z-index: 2;
        background: rgb(0,0,0,0.4);
        height: 100vh;
        width: 100%;
        color:white;
    }
`

class Explore extends React.Component {
    render() {
        return (
            <Styles>
                <div className='container-explore'>
                <Jumbotron 
                className='jumbo'
                fluid>
                    <Container className='j-contain'>
                    <h1>Explore</h1>
                    </Container>
                </Jumbotron>
                    <ExploreLineChart />
                </div>
            </Styles>
        )
    }
}

export default connect()(Explore)