import React from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import DashTutorial from './DashTutorial'
import TrackerTutorial from './TrackerTutorial'
import GroupTutorial from './GroupTutorial'
import ExploreLineChart from './ExploreLineChart'
import {Row,Container, Col, ListGroup, Carousel, Image } from 'react-bootstrap'

const Styles = styled.div`
    background: url(https://bit.ly/2NrvjD2);
    height: 100vh;
    .welcome-banner {
        width: 100%;
        height: 100%;
        background: rgb(0,0,0,0.7);
        text-align: center;
        animation: fade 2s linear;
    }
    .welcome-primary {
        color: white;
        font-size: 2.5rem;
        margin-top: 2vh;
    }
    .welcome-accent {
        color: #02c39a;
        font-size: 2.5rem;
    }
    .welcome-text {
        color: white;
    }
    .jumbo {
        background: url(https://bit.ly/2D8JT0g);
        height: 15vh;
        width:100%;
        margin-left: 0;
    }
    .container-explore {
        background: rgb(0,0,0,0.4);
        height: 100vh;
        width: 100%;
        color:white;
    }
    @keyframes fade {
        from {background-color: rgb(0,0,0, 0.0);}
        to {background-color: rgb(0,0,0, 0.7);}
    }
    .bg-over {
        background: rgb(0,0,0,0.4);
        width: 100%;
        height: 85vh;
        margin-top: 0;
        position: absolute;
        top:15vh;
        left:0;
    }
    .img {
        max-height: 50px;
        margin-left: 0;
    }
    .list-row {
        margin-left: 0;
        height: 100%;
        width: 100%;
    }
    .item {
        cursor: pointer;
        background: rgb(0,0,0,0);
        color: #f7f7f7;
        border: none;
        border-bottom: #02c39a solid 1px;
        &:hover {
            background: #02c39a;
            transition: 0.3s;
        }
    }
    .list-group1 {
        margin-top: 50%;
    }
    .list-col {
        height: 100%;
        border-right: white solid 1px;
    }
`

class Explore extends React.Component {
    state ={
        view: 0
    }

    renderTutorial = () => {
        return  this.state.view === 0 ?
            <DashTutorial/>   :
        this.state.view === 1 ?
            <TrackerTutorial/>:
            <GroupTutorial/>
    }
    changeView = (value) => {
        this.setState({
            view: value
        })
    }

    render() {
        return (
            <Styles>
                <Row className='jumbo'>
                    <div className='welcome-banner'>
                        
                        <h2 className='welcome-primary'>Welcome To <span className='welcome-accent'>VisTrack</span></h2>
                        {/* <div className='animate-line'></div> */}
                        <h6 className='welcome-text'>First Time Here? Let's go over the basics of Using VisTrack.</h6>
                        </div>
                </Row>
                
                <div className='bg-over'>
                    <Row className='list-row'>
                        <Col 
                        className='list-col'
                        xs={2}>
                            <ListGroup 
                            flush
                            className='list-group1'>
                                <ListGroup.Item 
                                onClick={() => this.changeView(0)}
                                className='item'>The DashBoard</ListGroup.Item>
                                <ListGroup.Item 
                                onClick={() => this.changeView(1)}
                                className='item'>Creating a Tracker</ListGroup.Item>
                                <ListGroup.Item 
                                onClick={() => this.changeView(2)}
                                className='item'>Groups</ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col xs={10}>
                            {this.renderTutorial()}
                        </Col>
                    </Row>
                
                </div>
            </Styles>
        )
    }
}

export default connect()(Explore)