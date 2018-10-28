import React, { Component } from 'react';
import './css/login.css';
import Redirect from 'react-router-dom/Redirect';

class Login extends Component {

  constructor(props){
    super(props);
    this.state = {
      username : "",
      password : "",
      warning : null,
      redirect : false
    }
  }

  // componentDidMount = async() => {
  //   if(localStorage.getItem("dokakademik")){
  //     await this.setState({redirect : true});
  //   }
  // }

  handleUsername = async (e) => {
    await this.setState({username: e.target.value});
  }

  handlePassword = async (e) => {
    await this.setState({password: e.target.value});
  }

  onSubmit = async(e) => {
    e.preventDefault();

    var details = {
      "username" : this.state.username,
      "password" : this.state.password
    }

    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    var response = await fetch('/users/authenticate', {
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formBody
    });

    var body = await response.json();
    
    if(body.message){
      await this.setState({warning: body.message});
    }
    else{
      localStorage.setItem("dok_akademik", body.token);
      await this.setState({redirect : true});
    }

  }

  render() {
    if(this.state.redirect){
      return (<Redirect to="/"/>);
    }
    else if(this.state.warning){
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