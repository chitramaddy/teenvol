import React, { Component } from 'react';
// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

const Columns = props => {

  return (
    [
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
      },
      {
        Header:"Timecard",
        id: "timecards",
        accessor: d=> d.timecards
      }
    ]
  )
}

export default Columns;