import React from 'react'
import styled from 'styled-components'
import {Row, ListGroup} from 'react-bootstrap'
import { connect } from 'react-redux'


const Styles = styled.div`
border: rgb(42, 157, 244, 0.25) solid 1px;
height: 100vh;
text-align: center;
align-items: center;
justify-content: center;
background: rgb(42, 157, 244);
.brand {
    color: #f7f7f7;
    text-decoration: none;
    font-size: 4rem;
    margin-top: 5vh;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
}
.group {
    margin-top: 5vh;
}

.item {
    color:white;
    margin-top: 5vh;
    background: rgb(0, 0, 0, 0.05);
    border: rgb(42, 157, 244, 0.5) solid 1px;
    &:hover {
        background: #ff5733;
        transition: 0.3s;
    }

}
a {
    color: #f7f7f7;
}
`

const SideNav = (props) => {
    return (
        <Styles>
            <Row className='side-brand'>
                <a href='/' className='brand'>VisTrack</a>
            </Row>
            <ListGroup className='group'>
                <ListGroup.Item className='item'>
                    <a href='/dashboard'>Dashboard</a>
                </ListGroup.Item>
                <ListGroup.Item className='item'>
                    <a href='/explore'>Explore</a>
                </ListGroup.Item>
                <ListGroup.Item className='item'>
                    <a href='/'>My Tracks</a>
                </ListGroup.Item>
                <ListGroup.Item className='item'>
                    <a href='/newtracker'>Create a New Tracker</a>
                </ListGroup.Item>
                <ListGroup.Item className='item'>
                    <a href='/'>VisTeams</a>
                </ListGroup.Item>
                
                {props.isLoggedIn ?
                <ListGroup.Item className='item'>
                    <a href='/'>Logout</a>
                </ListGroup.Item>
                    :
                <>
                <ListGroup.Item className='item'>
                    <a href='/login'>Log In</a>
                </ListGroup.Item>                
                <ListGroup.Item className='item'>
                    <a href='/signup'>Sign Up</a>
                </ListGroup.Item>
                </>
                }
                
            </ListGroup>
        </Styles>
    )
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.userReducer.isLoggedIn
    }
}

export default connect(mapStateToProps, null)(SideNav)


