import React from 'react'
import styled from 'styled-components'
import {withRouter} from 'react-router-dom'
import {Row, ListGroup, Container, Jumbotron} from 'react-bootstrap'
import { connect } from 'react-redux'


const Styles = styled.div`
.jumbo {
    background: url(https://bit.ly/2NrvjD2);
    height: 50vh;
    width: 100%;
    margin-left: 0;
    border-bottom: #02c39a solid 5px;
}
.contain {
    background: rgba(0,0,0,0.4);
    height: 100%;
    width: 100%;
    color: white;
    text-align: center;
}
`

const SideNav = (props) => {
    return (
        <Styles>
            <Row className='jumbo'>
                <div className='contain'>
                    <h1>VisTeams</h1>
                    <h4>Invite other users to view and manage your data.</h4>
                    </div>
                </Row>
        </Styles>
    )
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.userReducer.isLoggedIn
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logOut: () => dispatch({type: 'LOGOUT'})
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SideNav))