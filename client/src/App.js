import React, { Component } from 'react';

import Wrapper from "./Components/Wrapper";
import Header from "./Components/Header";
import Container from "./Components/Container";
import Buttons from "./Components/Buttons";
import SignUpForm from './Components/Forms/SignUpForm';
import LoginForm from './Components/Forms/LoginForm';
import API from './utils/API';
import TimeSheet from './Components/TimeSheet/Time';
import Report from "./Components/Report/Report";

class App extends Component {

  //The user log-in state is maintained in the App.js.
  state = {
    isLoggedIn: false,
    isAdmin: false,
    currentForm: "LoginForm"
  }


  // Check login status on load
  componentDidMount() {
    this.loginCheck();
  }

  // Check login status
  loginCheck = () => {
    API
      .loginCheck()
      .then(res => this.setState({

        isLoggedIn: res.data.isLoggedIn, username: res.data.fullname
      }))
      .catch(err => {
        console.log(err);
        this.setState({ isLoggedIn: false })
      })
  }
  //Set "isLoggedIn" state to current login status.
  updateLogin = (loginStatus, isAdmin) => {
    console.log(isAdmin);
    this.setState({
      isLoggedIn: loginStatus,
      isAdmin: isAdmin ? true : false
    })
  }

  handleLogout = () => {
    API.logout()
      .then(res => {
        console.log(res.data)
        this.updateLogin(false, false);
      })
      .catch(err => console.log(err));
  }

  checkAdmin = (trueOrFalse) => {
    this.setState({
      isAdmin: trueOrFalse
    })
  }

  //ShowForm function to determine whether to show register form or login form 
  showForm = (form) => {
    console.log(form);
    this.setState({
      currentForm: form
    });
  }


  renderForm = () => {
    console.log(this.state.currentForm);
    if (this.state.currentForm === "SignUpForm") {
      return <SignUpForm showForm={this.showForm} />
    } else if (this.state.currentForm === "LoginForm") {
      return <LoginForm updateLogin={this.updateLogin} />
    }
  }

  renderAdmin = () => {
    console.log(this.state.isAdmin);
    if (this.state.isAdmin) {
      return <Report checkAdmin={this.checkAdmin} handleLogout={this.handleLogout}/>
    } else {
      return <TimeSheet updateLogin={this.updateLogin} handleLogout={this.handleLogout}></TimeSheet> 
    }
  }

  render() {
    return (
      <div className="App">
        <Wrapper>
          <Header />
          <div style={{ height:1000}}>
            {this.state.isLoggedIn ? this.renderAdmin()     
              :
              <Container>
                <Buttons type="dark" id="signin" onClick={() => this.showForm("SignUpForm")}>Sign Up </Buttons>
                <Buttons type="secondary" id="login" onClick={() => this.showForm("LoginForm")}>Log In </Buttons>
                {/*Function to renderform depending on "isLoggedIn" state is called here*/}
                {this.renderForm()}
              </Container>
            }
          </div>

        </Wrapper>
      </div>
    );
  }
}

export default App;
