import React from 'react'
import { Form, Button } from 'react-bootstrap'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const Styles = styled.div`
    background: url(https://bit.ly/2NrvjD2);
    height: 100%;
    .contain {
        background: rgba(0,0,0,0.4);
        height: 100%;
        margin-top: 0;
        display: block;
        overflow: hidden;
    }
    .login-form {
        margin-top: 20vh;
        text-align: center;
        font-size: 1.4rem;
    }
    .email, .pass {
        color: #f7f7f7;
        max-width: 50vw;
        margin-left: auto;
        margin-right: auto;
    }
    .user-input {
        color: #f7f7f7;
        background: rgb(255,255,255, 0.2);
        border: none;
        &:hover {
            background: rgb(255,255,255, 0.4);
            transition: 0.3s;
        }
    
    }
    .sub-btn {
        color: #f7f7f7;
        background: rgb(255,255,255, 0.2);
        border: none;
        &:hover {
            background: rgb(255,255,255, 0.8);
            color: #222;
            transition: 0.3s;
        }
    }

`

class Login extends React.Component {

    state={
        email: '',
        password: '',
    }

    setEmail = (value) => {
        this.setState({email: value})
    }
    setPassword = (value) => {
        this.setState({password: value})
    }
    onLogin = (user) => {
        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user: user})
        })
        .then(res => res.json())
        .then(user => {
            localStorage.setItem('user', `${user.user.id}` )
            this.props.sendLogin(user.user)
            this.props.history.push('/dashboard')
        })
    }


    render() {
        return (
            <Styles>
                <div className='contain'>
                <Form
                className='login-form'
            onSubmit={e => {
                e.preventDefault()
                this.onLogin(this.state)
            }}
            >
                <Form.Group 
                className='email'
                controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                    className='user-input'
                    value={this.state.email}
                    onChange={e => this.setEmail(e.target.value)}
                    type="email" 
                    placeholder="Enter email" />
                </Form.Group>

                <Form.Group 
                className='pass'
                controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                    className='user-input'
                    value={this.state.password}
                    onChange={e => this.setPassword(e.target.value)}
                    type="password" placeholder="Password" />
                </Form.Group>
                <Button 
                className='sub-btn'
                variant="primary" type="submit">
                    Login
                </Button>
            </Form>
                </div>
            </Styles>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        sendLogin: (user) => dispatch({type: 'LOGIN', user: user})
    } 
}


export default withRouter(connect(null, mapDispatchToProps)(Login))