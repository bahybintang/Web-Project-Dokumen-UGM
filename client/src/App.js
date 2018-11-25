import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './component/home'
import Login from './component/login'
import Register from './component/register'
import Admin from './component/admin'
import User from "./component/user"
import Request from './component/request'
import TestHome from './component/testHome'

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Home} exact/>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
          <Route path="/admin" component={Admin}/>
          <Route path="/user" component={User}/>
          <Route path="/request" component={Request}/>
          <Route path="/test" component={TestHome}/>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App