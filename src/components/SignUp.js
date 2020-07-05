import React from 'react'
import { connect } from 'react-redux'
import { Form, Button, Col } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'

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
.signup-form {
    margin-top: 20vh;
    text-align: center;
    font-size: 1.4rem;
    width: 80%;
    color: #f7f7f7;
    text-align: center;
    margin-left:auto;
    margin-right:auto;
}
.user-input {
    color: #f7f7f7;
    background: rgb(255,255,255, 0.02);
    border: none;
    border-bottom: #f7f7f7 solid 1px;
    &:hover {
        background: rgb(255,255,255, 0.4);
        transition: 0.3s;
    }

}
`

class SignUp extends React.Component {

    state={
        first_name:'',
        last_name:'',
        email:'',
        password:'',
        location:'',
        role:'',
    }
    setFirstName = (value) => {
        this.setState({first_name: value})
    }
    setLastName = (value) => {
        this.setState({last_name: value})
    }
    setEmail = (value) => {
        this.setState({email: value})
    }
    setPassword = (value) => {
        this.setState({password: value})
    }
    setLocation = (value) => {
        this.setState({location: value})
    }
    setRole = (value) => {
        this.setState({role: parseInt(value)})
    }
    submitUserSignup = user => {
        fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({user: user})
        })
        .then(res => res.json())
        .then(user => {
            debugger
            this.props.createUser(user)
            localStorage.setItem('user', user.user.id)
            console.log(this.props.current_user)
            this.props.history.push('/dashboard')
        })
    }

    render() {
        return (
            <Styles>
                <div className='contain'>
                <Form
            className='signup-form'
            onSubmit={(e) => {
                e.preventDefault()
                this.submitUserSignup(this.state)}}>
            <Form.Row>
                <Form.Group as={Col} controlId="formGridFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control 
                className='user-input'
                value={this.state.first_name}
                onChange={e => this.setFirstName(e.target.value)}
                type="text" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control 
                className='user-input'
                value={this.state.last_name}
                onChange={e => this.setLastName(e.target.value)}
                type="text"  />
            </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control 
                className='user-input'
                value={this.state.email}
                onChange={e => this.setEmail(e.target.value)}
                type="text" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                className='user-input'
                value={this.state.password}
                onChange={e => this.setPassword(e.target.value)}
                type="password" />
            </Form.Group>
            </Form.Row>
          
            <Form.Group controlId="formGridAddress2">
                <Form.Label>Location</Form.Label>
                <Form.Control 
                className='user-input'
                value={this.state.location}
                onChange={e => this.setLocation(e.target.value)}/>
            </Form.Group>
          
            <Form.Row>
          
            <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Are you creating a business or personal account?
                </Form.Label>
            <Form.Control 
                className='user-input'
                value={this.state.role}
                onChange={e => this.setRole(e.target.value)}
                as="select" defaultValue="Choose...">
                <option value='1'>Business</option>
                <option value='2'>Personal</option>
                </Form.Control>
            </Form.Group>
            </Form.Row>
            <Button variant="primary" type="submit">
            Submit
            </Button>
            
        </Form>
                </div>
            </Styles>
        )
    }
}


const mapDispatchToProps = dispatch => {
    return {
        createUser: (user) => dispatch({type: 'CREATE_USER', user: user})
    }

}
const mapStateToProps = state => {
    return {
        current_user: state.userReducer.current_user
    }
    
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUp))