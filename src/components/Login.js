import React from 'react'
import { Form, Button } from 'react-bootstrap'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const Styles = styled.div`
    max-width: 75vw;
    margin-top: 15vh;
    margin-left: auto; 
    margin-right: auto;
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
            this.props.sendLogin(user)
            this.props.history.push('/dashboard')
        })
    }


    render() {
        return (
            <Styles>
                <Form
            onSubmit={e => {
                e.preventDefault()
                this.onLogin(this.state)
            }}
            >
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                    value={this.state.email}
                    onChange={e => this.setEmail(e.target.value)}
                    type="email" 
                    placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                    value={this.state.password}
                    onChange={e => this.setPassword(e.target.value)}
                    type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            </Styles>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        sendLogin: user => dispatch({type: 'LOGIN', user: user})
    } 
}


export default withRouter(connect(null, mapDispatchToProps)(Login))