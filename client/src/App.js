import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './component/home';
import Login from './component/login';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Home} exact/>
          <Route path="/login" component={Login}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;