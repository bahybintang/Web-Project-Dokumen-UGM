import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './component/home';
import Login from './component/login';
import Admin from './component/admin';
import withAuth from './component/utils/withAuth';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Home} exact/>
          <Route path="/login" component={Login}/>
          <Route path="/admin" component={withAuth(Admin)}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;