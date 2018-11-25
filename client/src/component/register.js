import React, { Component } from 'react';
import '../css/login.css';
import AuthService from './utils/AuthService';

class Register extends Component {

  constructor(props){
    super(props);
    this.state = {
      username : "",
      password : "",
      firstName: "",
      lastName: "",
      warning : null
    }
    this.Auth = new AuthService();
    this.handleChange.bind(this)
  }

  componentWillMount(){
    if(this.Auth.loggedIn()){
      if(this.Auth.getProfile().admin){
        this.props.history.replace("/admin");
      }
      else{
        this.props.history.replace('/user');
      }
    }
  }

  handleChange = async (e) => {
      await this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = async(e) => {
    e.preventDefault();

    var response = await this.Auth.register(this.state.username, this.state.password, this.state.firstName, this.state.lastName);

    if(response.message){
      await this.setState({warning: response.message});
    }
    else{
        await this.Auth.login(this.state.username, this.state.password)
        this.props.history.replace('/');
    }
  }

  render() {
    if(this.state.warning){
      return (
        <div style={{width:"40%", display:"block", margin:"auto"}}>
          <form className="form-signin" onSubmit={this.onSubmit}>
            <h2 className="form-signin-heading" style={{marginTop:"35%"}}>Register</h2>
            <label htmlFor="inputRegEmail" className="sr-only">Username</label>
            <input value={this.state.username} name="username" onChange={this.handleChange} type="username" id="inputRegEmail" className="form-control" placeholder="Username" required autoFocus/>
            <label htmlFor="inputRegPassword" className="sr-only">Password</label>
            <input value={this.state.password} name="password" onChange={this.handleChange} type="password" id="inputRegPassword" className="form-control" placeholder="Password" required/>
            <label htmlFor="inputFirstName" className="sr-only">First Name</label>
            <input value={this.state.firstName} name="firstName" onChange={this.handleChange} type="text" id="inputFirstName" className="form-control" placeholder="First Name" required/>
            <label htmlFor="inputLastName" className="sr-only">Last Name</label>
            <input value={this.state.lastName} name="lastName" onChange={this.handleChange} type="text" id="inputLastName" className="form-control" placeholder="Last Name" required/>
            <button className="btn btn-lg btn-primary btn-block" type="submit">Register</button>
          </form>
          <div style={{marginTop:"10px"}} className="alert alert-danger">{this.state.warning}</div>
        </div>
      );
    }
    else{
      return (
        <div style={{width:"40%", display:"block", margin:"auto"}}>
          <form className="form-signin" onSubmit={this.onSubmit}>
            <h2 className="form-signin-heading" style={{marginTop:"35%"}}>Register</h2>
            <label htmlFor="inputRegEmail" className="sr-only">Username</label>
            <input value={this.state.username} name="username" onChange={this.handleChange} type="username" id="inputRegEmail" className="form-control" placeholder="Username" required autoFocus/>
            <label htmlFor="inputRegPassword" className="sr-only">Password</label>
            <input value={this.state.password} name="password" onChange={this.handleChange} type="password" id="inputRegPassword" className="form-control" placeholder="Password" required/>
            <label htmlFor="inputFirstName" className="sr-only">First Name</label>
            <input value={this.state.firstName} name="firstName" onChange={this.handleChange} type="text" id="inputFirstName" className="form-control" placeholder="First Name" required/>
            <label htmlFor="inputLastName" className="sr-only">Last Name</label>
            <input value={this.state.lastName} name="lastName" onChange={this.handleChange} type="text" id="inputLastName" className="form-control" placeholder="Last Name" required/>
            <button className="btn btn-lg btn-primary btn-block" type="submit">Register</button>
          </form>
        </div>
      );
    }
  }
}

export default Register;