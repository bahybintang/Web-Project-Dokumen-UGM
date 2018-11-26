import React, { Component } from 'react';
import '../css/login.css';
import AuthService from './utils/AuthService';

class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      warning: null,
      signingUp: false
    }
    this.Auth = new AuthService();
    this.handleChange.bind(this)
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
    await this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = async (e) => {
    e.preventDefault();

    await this.setState({ signingUp: true })
    var response = await this.Auth.register(this.state.username, this.state.password, this.state.firstName, this.state.lastName);
    await this.setState({ signingUp: false })

    if (response.message) {
      await this.setState({ warning: response.message });
    }
    else {
      await this.Auth.login(this.state.username, this.state.password)
      this.props.history.replace('/');
    }
  }

  render() {
    return (
      <div className="container" style={{ maxWidth: "500px" }}>
        <p className="h4 text-center text-white bg-primary" style={{borderRadius: "5px 5px 0px 0px", padding: "20px 20px 20px 20px", margin: "25% 0px 0px 0px"}}>Sign Up</p>
        <form className="text-center border border-light p-5" onSubmit={this.onSubmit}>

          <div className="form-row mb-4">
            <div className="col">
              <input onChange={this.handleChange} name="firstName" type="text" id="defaultRegisterFormFirstName" className="form-control" placeholder="First name" />
            </div>
            <div className="col">
              <input onChange={this.handleChange} name="lastName" type="text" id="defaultRegisterFormLastName" className="form-control" placeholder="Last name" />
            </div>
          </div>

          <input onChange={this.handleChange} name="username" type="username" id="defaultRegisterFormEmail" className="form-control mb-4" placeholder="Username" />

          <input onChange={this.handleChange} name="password" type="password" id="defaultRegisterFormPassword" className="form-control" placeholder="Password" aria-describedby="defaultRegisterFormPasswordHelpBlock" />
          <small id="defaultRegisterFormPasswordHelpBlock" className="form-text text-muted mb-4">
            At least 8 characters and 1 digit
            </small>
          {this.state.warning ? <div style={{ marginTop: "10px" }} className="alert alert-danger">{this.state.warning}</div> : ''}
          
          {this.state.signingUp ? <button className="btn btn-primary my-4 btn-block" type="submit" disabled>Signing up..</button> : <button className="btn btn-primary my-4 btn-block" type="submit">Sign up</button>}
        </form>
      </div>
    )
  }
}

export default Register;