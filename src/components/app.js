import React, { Component } from 'react';
import Dashboard from './dashboardComp'
import Home from './home'
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom'


export default class App extends Component {
  componentDidMount(){
  }
  render() {
    return(
      <div>
        <Router>
          <Switch>
            <Route path='/dashboard'>
              <Dashboard/>
            </Route>
            <Route path='/'>
              <Home/>
            </Route>
          </Switch>
        </Router>
      </div>
      )
  }
}
