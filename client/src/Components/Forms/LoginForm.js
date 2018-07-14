import React, { Component } from 'react';
import API from "../../utils/API";
import "./SignUpForm.css";

class LoginForm extends Component {

  //Set the state for all the input components
  state = {
    email: "",
    password: ""
  };

  //Update the input change from react state
  handleInputChange = event => {
    let value = event.target.value;
    const name = event.target.name;

    if (name === this.state.password) {
      value = value.substring(0, 15);
    }

    this.setState({
      [name]: value
    });
  };

  handleLogin = event => {
    event.preventDefault();

    API.login({
      username: this.state.email,
      password: this.state.password
    }).then(res => {
      console.log(res.data);
      this.setState({
        email: "",
        password:""
      })
      this.props.updateLogin(true, res.data.isAdmin);

    }).catch(err => console.log(err));

     //empty out all of the input fields
     this.setState({
      email: "",
      password: ""
    });
    //updateLogin function gets passed on from App.js. 'isLoggedIn' is set to true since the user is now signed in.
    // this.props.updateLogin(true);
  } 

  //render the form to sign up, if the user has not signed up already. ie if 'isLoggedIn' from App.js is set to false.
  render() {

    return (
      
        <form className="form">
          
          <input
            value={this.state.email}
            name="email"
            onChange={this.handleInputChange}
            type="email"
            placeholder="email"
          />

          <input
            value={this.state.password}
            name="password"
            onChange={this.handleInputChange}
            type="password"
            placeholder="Password"
          />

          <button onClick={this.handleLogin}>Submit</button>

          <h6>Not registered yet? Click Sign In</h6> 

        </form>
  
    )
  }

}

export default LoginForm;