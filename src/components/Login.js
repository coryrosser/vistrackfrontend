import React from 'react'
import { Form, Button, Card, InputGroup} from 'react-bootstrap'
import {FaLock, FaEnvelope} from 'react-icons/fa'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const Styles = styled.div`
    background: url(https://bit.ly/2NrvjD2);
    height: 100%;
    .icon {
        color: #444;
    }
    .contain {
        background: rgba(0,0,0,0.4);
        height: 100%;
        margin-top: 0;
        align-items: center;
        display: block;
        overflow: hidden;
    }
    .login-form {
        margin-top: 0vh;
        text-align: center;
        font-size: 1.4rem;
    }
    .email, .pass {
        color: #444;
        max-width: 60%;
        margin-left: auto;
        margin-right: auto;
    }
    .user-input {
        color: #444;
        border: none;
        border-radius: 0;
        border-bottom: #888 solid 1px;
        &:hover {
            transition: 0.3s;
        }
}    
    .form-card {
        box-shadow: 0px 0px 50px rgb(0,0,0,0.5);
        background: #ebf3f7;
        margin-top: 15vh;
        width: 50%;
        height: 50vh;
        margin-right: auto;
        margin-left: auto;
    }
    .prepend {
        background :#ebf3f7;
        border: none;
    }
    .form-header {
        margin-right: auto;
        margin-left: auto;
        margin-top: 3vh;
        font-size: 3rem;
        color: #444;
    }
    }
    .form-header2 {
        margin-right: auto;
        margin-left: auto;
        margin-top: 1vh;
        font-size: 1.5rem;
        color: #444;
    }
    }
    .prepend-text {
        border: none;
        border-radius: 0 0 0 10px;
        background: #ebf3f7;
        border-bottom: #888 solid 1px;
    }
    .sub-btn {
        color: #f7f7f7;
        background: rgb(42, 157, 244);
        width: 40%;
        border: none;
        &:hover {
            background: rgb(2, 195, 154, 0.4);
            color: #444;
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
                    <Card className='form-card'>
                    <p className='form-header'>Sign In</p>
                    <p className='form-header2'>Welcome back to VisTrack</p>
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
                    <Form.Label></Form.Label>
                    <InputGroup>
                    <InputGroup.Prepend className='prepend'> 
                    <InputGroup.Text className='prepend-text'><FaEnvelope className='icon'/></InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control 
                    className='user-input'
                    value={this.state.email}
                    onChange={e => this.setEmail(e.target.value)}
                    type="email" 
                    placeholder="Enter email" />
                    </InputGroup>

                </Form.Group>

                <Form.Group 
                className='pass'
                controlId="formBasicPassword">
                    <Form.Label></Form.Label>
                    <InputGroup>
                    <InputGroup.Prepend className='prepend'> 
                    <InputGroup.Text className='prepend-text'><FaLock className='icon'/></InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control 
                    className='user-input'
                    value={this.state.password}
                    onChange={e => this.setPassword(e.target.value)}
                    type="password" placeholder="Password" />
                    </InputGroup>
                </Form.Group>
                <Button 
                className='sub-btn'
                variant="primary" type="submit">
                    Login
                </Button>
                <p className='card-form-text'>Don't have an account? <a href='/signup'>Sign Up!</a></p>
            </Form>
                    </Card>
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