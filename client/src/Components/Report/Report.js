import React, { Component } from 'react';
import { render } from "react-dom";
import Buttons from '../Buttons';
// import LogTime from "./Log";
import API from "../../utils/API";

// Import React Table
import Reacttable from "react-table";
import "react-table/react-table.css";

const range = len => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

class Report extends Component {
  state = {
    reportData: [],
    isLoaded: false,
    errror: null
  }

    componentDidMount() {
    API.getReport()
      .then(res => {
        console.log(res.data);
        if (!res.data.isAdmin) {
          this.props.checkAdmin(false)
        } else {
          console.log(res.data.reportData);
          this.setState({
            reportData: res.data.reportData,
            isLoaded: true
          })          
        }
      })
  }

  render() {
    // const { data } = this.state.reportData;
    return (
      <div>
        <h1 style={{ color: "white" }}>Time Sheet Report</h1>
        {this.state.isLoaded === false 
          ? <div>..Loading</div>
          : <p style={{color: "white"}}>{this.state.reportData[13].firstname} </p>
        }
        <Buttons onClick={this.props.handleLogout}>Log Out</Buttons>

      </div>
    )
  }
}

export default Report;