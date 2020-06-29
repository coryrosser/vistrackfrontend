import React from 'react';
import './App.css';
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {Row, Col} from 'react-bootstrap'
import SideNav from './components/SideNav'
import Home from './components/Home'
import Explore from './components/Explore'
import SignUp from './components/SignUp'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import NewTracker from './components/NewTracker'
import styled from 'styled-components'

const Styles = styled.div`
`
class App extends React.Component {
  componentWillMount() {
    localStorage.getItem('user') ?

      this.props.setLoggedIn()
        :
      console.log('log in to continue')
  }
  componentDidMount() {
    this.getUsers()
    this.getDataSets()
  }

  getUsers = () => {
    fetch('http://localhost:3000/users')
    .then(res => res.json())
    .then(userData => {
      this.props.fetchUsers(userData)
      console.log(this.props.users)
    })
  }
  getDataSets = () => {
    fetch('http://localhost:3000/datasets')
    .then(res => res.json())
    .then(data => {
        this.props.fetchDatasets(data)
    })
  }
  
  render() {
    return (
      <Styles>
        <Row style={{ marginLeft: 0, marginRight: 0 }}>
          <Col xs={2} style={{
            paddingRight: 0, 
            paddingLeft: 0,
            marginLeft: 0,
            }}>
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
                    <Route exact path='/explore'>
                        <Explore/>
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
      </Styles>

    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: (users) => dispatch({ type: 'FETCH_USERS', users: users }),
    setLoggedIn: () => dispatch({type: 'SET_LOGIN'}),
    fetchDatasets: (datasets) => dispatch({type: 'FETCH_DATASETS', datasets: datasets})
  }
}
const mapStateToProps = (state) => {
  return {
    users: state.userReducer.users,
    isLoggedIn: state.userReducer.isLoggedIn,
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
