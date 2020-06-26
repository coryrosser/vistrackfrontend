import React from 'react';
import './App.css';
import UserChart from './components/UserChart'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Row, Col} from 'react-bootstrap'
import SideNav from './components/SideNav'
import Home from './components/Home'
import SignUp from './components/SignUp'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import NewTracker from './components/NewTracker'

class App extends React.Component {
  state = {
    data:[],
    isLoggedIn: false,
  }
  setLoggedIn = () => {
    this.setState({isLoggedIn: true},
      console.log("logged in"))
  }
  render() {
    return (
      <Row>
          <Col xs={2} style={{paddingRight: 0, paddingLeft: 0}}>
          <SideNav isLoggedIn={this.state.isLoggedIn}/>
          </Col>
          <Col xs={10} style={{paddingRight: 0, paddingLeft: 0}}>
          <Router>
                <Switch>
                    <Route exact path='/'>
                        <Home />
                    </Route>
                    <Route exact path='/signup'>
                        <SignUp setLoggedIn={this.setLoggedIn}/>
                    </Route>
                    <Route exact path='/login'>
                        <Login setLoggedIn={this.setLoggedIn}/>
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

export default App;
