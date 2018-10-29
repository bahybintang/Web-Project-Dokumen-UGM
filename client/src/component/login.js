import React, { Component } from 'react';
import '../css/login.css';
import AuthService from './utils/AuthService';

class Login extends Component {

  constructor(props){
    super(props);
    this.state = {
      username : "",
      password : "",
      warning : null
    }
    this.Auth = new AuthService();
  }

  componentWillMount(){
    if(this.Auth.loggedIn()) this.props.history.replace('/');
  }

  handleUsername = async (e) => {
    await this.setState({username: e.target.value});
  }

  handlePassword = async (e) => {
    await this.setState({password: e.target.value});
  }

  onSubmit = async(e) => {
    e.preventDefault();

    var response = await this.Auth.login(this.state.username, this.state.password);

    if(response.message){
      await this.setState({warning: response.message});
    }
    else{
      this.props.history.replace('/');
    }
  }

  render() {
    if(this.state.warning){
      return (
        <div style={{width:"40%", display:"block", margin:"auto"}}>
          <form className="form-signin" onSubmit={this.onSubmit}>
            <h2 className="form-signin-heading" style={{marginTop:"35%"}}>Sign In</h2>
            <label htmlFor="inputEmail" className="sr-only">Username</label>
            <input value={this.state.username} onChange={this.handleUsername} type="username" id="inputEmail" className="form-control" placeholder="Username" required autoFocus/>
            <label htmlFor="inputPassword" className="sr-only">Password</label>
            <input value={this.state.password} onChange={this.handlePassword} type="password" id="inputPassword" className="form-control" placeholder="Password" required/>
            <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
          </form>
          <div style={{marginTop:"10px"}} className="alert alert-danger">{this.state.warning}</div>
        </div>
      );
    }
    else{
      return (
        <div style={{width:"40%", display:"block", margin:"auto"}}>
          <form className="form-signin" onSubmit={this.onSubmit}>
            <h2 className="form-signin-heading" style={{marginTop:"35%"}}>Sign In</h2>
            <label htmlFor="inputEmail" className="sr-only">Username</label>
            <input value={this.state.username} onChange={this.handleUsername} type="username" id="inputEmail" className="form-control" placeholder="Username" required autoFocus/>
            <label htmlFor="inputPassword" className="sr-only">Password</label>
            <input value={this.state.password} onChange={this.handlePassword} type="password" id="inputPassword" className="form-control" placeholder="Password" required/>
            <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
          </form>
        </div>
      );
    }
  }
}

export default Login;