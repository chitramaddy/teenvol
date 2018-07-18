import React, { Component } from 'react';

import "./SignUpForm.css";
import API from "../../utils/API";

class SignUpForm extends Component {

  //Set the state for all the input components
  state = {
    firstname: "",
    lastname: "",
    MI: "",
    grade:"",
    email: "",
    address: "",
    city: "",
    state: "NJ",
    password: "",
    libraryCardNo: "",
    graduationDate: ""
  };

  //Update the input change from react state
  handleInputChange = event => {
    let value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value
    });
  };

  handleSignUp = event => {
    event.preventDefault();

    //Check if the first name and last name is entered
    if (!this.state.firstname || !this.state.lastname) {
      alert("Fill out your first and last name please!");
      return false;
    }//Check if the password is atleast 6 characters long
    else if (this.state.password.length < 6) {
      alert("Password should be atleast 6 characters long!");
      return false;
    }//Check if the library card number is entered
    else if (!this.state.libraryCardNo) {
      alert("Enter your library card number please!");
      return false;
    }//Check for the graduation date
    else if (!this.state.graduationDate) {
      alert("Enter your graduation date please!")
      return false;
    }

    API
    .register({ 
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      MI: this.state.MI,
      grade: this.state.grade,
      address: this.state.address,
      city: this.state.city,
      state: this.state.state,
      phoneNo: this.state.phoneNo,
      email: this.state.email,
      username: this.state.email, 
      password: this.state.password,
      libraryCardNo: this.state.libraryCardNo,
      graduationDate: this.state.graduationDate
      })
    .then(res=> {
      console.log("is this "+res.data);
      this.setState({ success: res.data })
      this.props.showForm("LoginForm")
    })
    .catch(err => console.log(err));

    //empty out all of the input fields
    this.setState({
      firstname: "",
      lastname: "",
      MI: "",
      grade: "",
      address: "",
      city: "",
      state: "",
      phoneNo: "",
      email: "",
      password: "",
      libraryCardNo: "",
      graduationDate: ""

    });

    //updateLogin function gets passed on from App.js. 'isLoggedIn' is set to true since the user is now signed in.
    // this.props.updateLogin(true);
  };

  //render the form to sign up, if the user has not signed up already. ie if 'isLoggedIn' from App.js is set to false.
  render() {
    if (this.state.success){
      return<h1>Registered successfully!</h1>
    }

    return (
        <form className="form">
          <input
            value={this.state.firstname}
            name="firstname"
            onChange={this.handleInputChange}
            type="text"
            placeholder="First Name"
          />

          <input
            value={this.state.lastname}
            name="lastname"
            onChange={this.handleInputChange}
            type="text"
            placeholder="Last Name"
          />

          <input
            value={this.state.MI}
            name="MI"
            onChange={this.handleInputChange}
            type="text"
            placeholder="M.I"
          />

          <input
            value={this.state.grade}
            name="grade"
            onChange={this.handleInputChange}
            type="text"
            placeholder="Grade"
          />

          <input
            value={this.state.address}
            name="address"
            onChange={this.handleInputChange}
            type="text"
            placeholder="Address 1"
          />

          <input
            value={this.state.city}
            name="city"
            onChange={this.handleInputChange}
            type="text"
          />

          <input
            value={this.state.state}
            name="state"
            onChange={this.handleInputChange}
            type="text"
            placeholder="state"
          />

          <input
            value={this.state.phoneNo}
            name="phoneNo"
            onChange={this.handleInputChange}
            type="text"
            placeholder="phoneNo"
          />

          <input
            value={this.state.libraryCardNo}
            name="libraryCardNo"
            onChange={this.handleInputChange}
            type="text"
            placeholder="Library Card No"
          />

          {/*Write a function to check if the entered year is between 2015 and 2022 or give the selection option to select one of these options*/}
          <input
            value={this.state.graduationDate}
            name="graduationDate"
            onChange={this.handleInputChange}
            type="text"
            placeholder="When will you graduate?"
          />

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

          <button onClick={this.handleSignUp}>Submit</button>
          <br/>
        </form>
  
    )
  }
}

export default SignUpForm;