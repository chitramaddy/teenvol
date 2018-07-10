import React, { Component } from 'react';

import Wrapper from "./Components/Wrapper";
import Header from "./Components/Header";
import Container from "./Components/Container";
import Buttons from "./Components/Buttons";
import SignUpForm from './Components/Forms/SignUpForm';
import LoginForm from './Components/Forms/LoginForm';
import API from './utils/API';
import TimeSheet from './Components/TimeSheet/Time';


class App extends Component {

  //The user log-in state is maintained in the App.js.
  state = {
    isLoggedIn: false,
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
  updateLogin = (loginStatus) => {
    this.setState({
      isLoggedIn: loginStatus
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

  // //function to render page depending on "isLoggedIn". 
  // renderPage = () => {
  //   if (!this.state.isLoggedIn) {
  //     return <LoginForm updateLogin={this.updateLogin} />
  //   } else {
  //     return "new page displays here"
  //   }
  // }

  render() {
    console.log('login status is: ' + this.state.isLoggedIn)
    return (
      <div className="App">
        <Wrapper>
          <Header />
          {/*write ternary operator to check status of isLoggedIn, if true render the time sheet, if false render this form below */}
          <div style={{ height: "500px" }}>
            {this.state.isLoggedIn ? <TimeSheet /> :
              <Container>
                <Buttons type="dark" id="signin" onClick={() => this.showForm("SignUpForm")}>Sign In </Buttons>
                <Buttons type="secondary" id="login" onClick={() => this.showForm("LoginForm")}>Log In </Buttons>
                {/*Function to renderpage depending on "isLoggedIn" state is called here*/}
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
