import React, { Component } from 'react';
import API from '../../utils/API';
import Buttons from '../Buttons';

class Logout extends Component {
  handleLogout = () => {
    API.logout()
      .then(res => {
        console.log(res.data)
        this.props.updateLogin(false);
      })
      .catch(err => console.log(err));
  }
  render() {
    return (
      <Buttons onClick={this.handleLogout}>Logout</Buttons>
    )
  }
}

export default Logout;