import React from 'react';
import './App.css';
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {Row, Col} from 'react-bootstrap'
import SideNav from './components/SideNav'
import Home from './components/Home'
import SignUp from './components/SignUp'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import NewTracker from './components/NewTracker'


class App extends React.Component {
  // state = {
  //   data:[],
  //   isLoggedIn: false,
  // }
  // setLoggedIn = () => {
  //   this.setState({isLoggedIn: true},
  //     console.log("logged in"))
  // }

  componentDidMount() {
    fetch('http://localhost:3000/users')
    .then(res => res.json())
    .then(userData => {
      console.log(userData)
      this.props.fetchUsers(userData)
      console.log(this.props.users)
    })
  }
  
  render() {
    return (
        <Row>
          <Col xs={2} style={{paddingRight: 0, paddingLeft: 0}}>
          <SideNav />
          </Col>
          <Col xs={10} style={{paddingRight: 0, paddingLeft: 0}}>
          <Router>
                <Switch>
                    <Route exact path='/'>
                        <Home />
                    </Route>
                    <Route exact path='/signup'>
                        <SignUp/>
                    </Route>
                    <Route exact path='/login'>
                        <Login/>
                    </Route>
                    <Route exact path='/dashboard'>
                        <Dashboard />
                    </Route>
                    <Route path='/newtracker'>
                      <NewTracker/>
                    </Route>
                </Switch>
            </Router>
          </Col>
      </Row>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: (users) => dispatch({ type: 'FETCH_USERS', users: users })
  }
}
const mapStateToProps = (state) => {
  return {
    users: state.userReducer.users
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
