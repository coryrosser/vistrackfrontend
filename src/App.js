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

class App extends React.Component {
  state = {
    data:[],
    isLoggedIn: false,
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
                    <Route exact path='/home'>
                        <Home />
                    </Route>
                    <Route exact path='/signup'>
                        <SignUp />
                    </Route>
                    <Route exact path='/login'>
                        <Login />
                    </Route>
                    <Route exact path='/dashboard'>
                        <Dashboard />
                    </Route>
                </Switch>
            </Router>
          </Col>
      </Row>
    )
  }
}

export default App;
