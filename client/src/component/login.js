import React, { Component } from 'react';
import '../css/login.css';
import AuthService from './utils/AuthService';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      warning: null,
      logginIn: false
    }
    this.Auth = new AuthService();
  }

  componentWillMount() {
    if (this.Auth.loggedIn()) {
      if (this.Auth.getProfile().admin) {
        this.props.history.replace("/admin");
      }
      else {
        this.props.history.replace('/user');
      }
    }
  }

  handleChange = async (e) => {
    await this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = async (e) => {
    e.preventDefault();

    await this.setState({ logginIn : true })
    var response = await this.Auth.login(this.state.username, this.state.password);      

    if (response.message) {
      await this.setState({ warning: response.message });
    }
    else {
      if (this.Auth.getProfile().admin) {
        this.props.history.replace("/admin");
      }
      else {
        this.props.history.replace('/');
      }
    }
    await this.setState({ logginIn : false })
  }

  render() {
    return (
      <div className="container" style={{ maxWidth: "500px" }}>
        <p className="h4 text-center text-white bg-primary" style={{borderRadius: "5px 5px 0px 0px", padding: "20px 20px 20px 20px", margin: "25% 0px 0px 0px"}}>Sign In</p>
        <form className="text-center border border-light p-5" onSubmit={this.onSubmit}>

          <input onChange={this.handleChange} name="username" type="username" id="defaultLoginFormEmail" className="form-control mb-4" placeholder="Username" />

          <input onChange={this.handleChange} name="password" type="password" id="defaultLoginFormPassword" className="form-control mb-4" placeholder="Password" />

          {this.state.logginIn ? <button className="btn btn-primary btn-block my-4" type="submit" disabled>Signing in...</button> : <button className="btn btn-primary btn-block my-4" type="submit">Sign in</button>}

          {this.state.warning ? <div style={{ marginTop: "10px" }} className="alert alert-danger">{this.state.warning}</div> : ''}

          <p>Not a member?
              <a href="/register"> Register</a>
          </p>
        </form>
      </div>
    )
  }
}

export default Login;