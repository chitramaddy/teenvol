import React, { Component } from 'react';
import { render } from "react-dom";
import "./Report.css"
import Buttons from '../Buttons';
// import LogTime from "./Log";
import API from "../../utils/API";

// Import React Table
import ReactTable from "react-table";
import Columns from "./Columns"
import "react-table/react-table.css";
var moment = require('moment');


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
    return (
      <div id="table-container">
        <h1>Time Sheet Report</h1>


        {/*make the component wait to mount until the data makes it from server to client*/}
        {this.state.isLoaded === false
          ? <div>..Loading</div>
          : <div>

            <ReactTable
              data={this.state.reportData}
              columns={[
                {
                  Header: "First Name",
                  accessor: "firstname",
                  sortable: true
                },
                {
                  Header: "Last Name",
                  accessor: "lastname",
                  sortable: true
                },
                {
                  Header: "Grade",
                  accessor: "grade"
                },
                {
                  Header: "Graduation Date",
                  id: "graduation_year",
                  accessor: d => d.graduation_year
                },
                {
                  Header: "Library Card No",
                  id: "library_card_no",
                  accessor: d => d.library_card_no
                },
                {
                  Header: "Total Hours",
                  id: "totalhours",
                  accessor: d => d.totalhours,
                  sortable: true
                },
                {
                  Header: "Created",
                  id: "Created_at",
                  accessor: d => d.Created_at
                }
              ]}
              defaultPageSize={10}
              filterable
              className="-striped -highlight table"
              
            />
          </div>
        }
        
        <Buttons type="secondary" id="table-logout" onClick={this.props.handleLogout}>Log Out</Buttons>

      </div>
    )
  }
}

export default Report;