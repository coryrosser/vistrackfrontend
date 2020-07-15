import React from 'react'
import { connect } from 'react-redux'
import { Form, Button, Card,Row, Col, InputGroup} from 'react-bootstrap'
import {FaLock, FaEnvelope, FaUser} from 'react-icons/fa'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'


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
            border: none;
        }
}    
    .form-card {
        box-shadow: 0px 0px 50px rgb(0,0,0,0.5);
        background: #ebf3f7;
        margin-top: 15vh;
        width: 50%;
        height: 75vh;
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
        fetch('https://vistrackbackend.herokuapp.com/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'},
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
                <Card className='form-card'>
                    
                <p className='form-header'>Sign Up</p>
                    <p className='form-header2'>Welcome to VisTrack</p>
                <Form
                className='login-form'
                onSubmit={(e) => {
                e.preventDefault()
                this.submitUserSignup(this.state)}}>
                <Form.Group className='email' controlId="formGridFirstName">
                
                <InputGroup>
                    <InputGroup.Prepend className='prepend'> 
                    <InputGroup.Text className='prepend-text'><FaUser className='icon'/></InputGroup.Text>
                    </InputGroup.Prepend>
                <Form.Control
                placeholder='First Name'
                className='user-input'
                value={this.state.first_name}
                onChange={e => this.setFirstName(e.target.value)}
                type="text" />
                </InputGroup>
                </Form.Group>

                <Form.Group className='email' controlId="formGridLastName">
                <Form.Label></Form.Label>
                <InputGroup>
                    <InputGroup.Prepend className='prepend'> 
                    <InputGroup.Text className='prepend-text'><FaUser className='icon'/></InputGroup.Text>
                    </InputGroup.Prepend>
                <Form.Control
                placeholder='Last Name'
                className='user-input'
                value={this.state.last_name}
                onChange={e => this.setLastName(e.target.value)}
                type="text"  />
                </InputGroup>
            </Form.Group>
                <Form.Group className='email' controlId="formGridEmail">
                <Form.Label></Form.Label>
                <InputGroup>
                    <InputGroup.Prepend className='prepend'> 
                    <InputGroup.Text className='prepend-text'><FaEnvelope className='icon'/></InputGroup.Text>
                    </InputGroup.Prepend>
                <Form.Control
                placeholder='Email'
                className='user-input'
                value={this.state.email}
                onChange={e => this.setEmail(e.target.value)}
                type="text" />
                </InputGroup>
                </Form.Group>

                <Form.Group className='email' controlId="formGridPassword">
                <Form.Label></Form.Label>
                <InputGroup>
                    <InputGroup.Prepend className='prepend'> 
                    <InputGroup.Text className='prepend-text'><FaLock className='icon'/></InputGroup.Text>
                    </InputGroup.Prepend>
                <Form.Control
                placeholder='Password'
                className='user-input'
                value={this.state.password}
                onChange={e => this.setPassword(e.target.value)}
                type="password" />
                </InputGroup>
            </Form.Group>
            <Button className='sub-btn' type="submit">
            Submit
            </Button>
            
        </Form>
                </Card>
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