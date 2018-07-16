import React, { Component } from 'react';
import { render } from "react-dom";
import Buttons from '../Buttons';
// import LogTime from "./Log";
import API from "../../utils/API";

// Import React Table
import ReactTable from "react-table";
import Columns from "./Columns"
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

    return (
      <div>
        <h1 style={{ color: "white" }}>Time Sheet Report</h1>


        {/*make the component wait to mount until the data makes it from server to client*/}
        {this.state.isLoaded === false
          ? <div>..Loading</div>
          : <div style={{ color: "white" }}>

            <ReactTable
              data={this.state.reportData}
              columns={[
                {
                  Header: "First Name",
                  accessor: "firstname"
                },
                {
                  Header: "Last Name",
                  accessor: "lastname"
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
                  Header: "library_card_no",
                  id: "library_card_no",
                  accessor: d => d.library_card_no
                },
                {
                  Header: "Created",
                  id: "Created_at",
                  accessor: d => d.Created_at
                }
              ]}
              defaultPageSize={10}
              filterable
              sortable
            />
          </div>
        }
        <Buttons onClick={this.props.handleLogout}>Log Out</Buttons>

      </div>
    )
  }
}

export default Report;