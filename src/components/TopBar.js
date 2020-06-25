import React, { Component } from "react";
import {Row, Nav, Navbar, Col} from 'react-bootstrap'

import styled from 'styled-components'
import { BrowserRouter as Router } from 'react-router-dom';

const Styles = styled.div`
    max-width: 100vw;
    max-height: 2vh;
    .nav-row {
        width: 100vw;
    }
    .navbar {
        background-color: #222;
    }
    .navbar-brand, .navbar-nav .nav-link {
        padding: 0.4rem;
        border-right: #222 solid 1px;
        border-left: #222 solid 1px;
        color: #bbb;
        margin-left: 1rem;
        font-size: 1rem;

        &:hover {
            color: white;
            border-right: #bbb solid 1px;
            border-left: #bbb solid 1px;
            transition: 0.3s;
        }
    }
`;

class TopBar extends Component {

render() {
    return (
    <Styles>
        <Row className='nav-row'>
        <Navbar>
            <Col md={2}>
                <Navbar.Brand href="/">VisTrack</Navbar.Brand>
            </Col>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Col md={6}>
                </Col>
                <Col md={4}>
                    <Nav className="ml-auto">
                    <Nav.Item><Nav.Link href="/signup">About</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link href="/signup">Sign Up</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link href="/signup">Sign In</Nav.Link></Nav.Item>
                    
                </Nav>
                </Col>
                
            </Navbar.Collapse>
        </Navbar>
        </Row>
    </Styles>
    );
}
}

export default TopBar;