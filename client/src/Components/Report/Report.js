import React, { Component } from 'react';
import Buttons from '../Buttons';
// import LogTime from "./Log";
import API from "../../utils/API";

class Report extends Component {
  state = {
    reportData: []
  }

  componentDidMount() {
    API.getReport()
      .then(res => {
        console.log(res.data);
        if (!res.data.isAdmin) {
          this.props.checkAdmin(false)
        } else {
          this.setState({
            reportData: res.data.reportData
          })
        }
      })
  }

  render() {
    return (
      <div>
      <h1 style={{ color: "white" }}>Time Sheet Report</h1>
      <Buttons onClick={this.props.handleLogout}>Log Out</Buttons>  

      </div>
    )
  }
}

export default Report;