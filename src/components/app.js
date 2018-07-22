import React, { Component } from 'react';
// import Model from './model'
// import Submit from './submit_card'
// import Org_reg from './org_reg'
// import Org_login from './org_login'
import Dashboard from './dashboardComp'
import Home from './home'
import {HashRouter, Route, Switch } from 'react-router-dom'


export default class App extends Component {
  componentDidMount(){
  }
  render() {
    return(
      <div>
        <HashRouter>
          <Switch>
            <Route path='/dashboard'>
              <Dashboard/>
            </Route>
            <Route path='/'>
              <Home/>
            </Route>
          </Switch>
        </HashRouter>
      </div>
      )
  }
}
