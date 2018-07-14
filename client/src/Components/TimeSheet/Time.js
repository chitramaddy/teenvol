import React, { Component } from "react";
import Buttons from '../Buttons';
import LogTime from "./Log";
import Logout from "../Logout";
import API from "../../utils/API";
var moment = require('moment');


let Date;
Date = moment().format('L');
let fullname;

class Time extends Component {

  state = {
    fullname: "",
    startTime: "",
    endTime: ""
  }  

  componentDidMount() {
    API.getUserTimeSheet()
      .then(res => {
        fullname = res.data.fullname;
        console.log(fullname);


        const todaysCard = res.data.timecards.filter(timeCardItem => {
          return (timeCardItem.date === moment().format("ddd MMM D"))
        })

        console.log(todaysCard);

        this.setState({
          startTime: todaysCard[0].startTime,
          endTime: todaysCard[0].endTime,
          fullname: fullname
        })
      })
      .catch(err => console.log(err))
  }

  handleStart = () => {
    const time = moment().format("hh:mm:ss")
    API.setStartTime(time, moment().format("ddd MMM D"))
      .then(res => {
        console.log(res.data)
        this.setState({
          startTime: time       
        })
      })
      .catch(err => console.log(err));
  }

  handleEnd = () => {
    const time = moment().format("hh:mm:ss")
    API.setEndTime(time, moment().format("ddd MMM D"))
      .then(res => {
        console.log(res.data)
        this.setState({
          endTime: time
        })
      })
      .catch(err => console.log(err));
  } 

  render() {
    return (

      <div style={{ color: "white" }}>
      <Buttons onClick={this.props.handleLogout}>Log Out</Buttons>  
        <h3>Name: {this.state.fullname}</h3>
        <h3>Date: {Date}</h3>
     
              
        {(this.state.startTime !== "") ? <LogTime time={this.state.startTime}></LogTime> : "Start your timecard for today!"}
        {(this.state.endTime !== "") ? <LogTime time={this.state.endTime}></LogTime> : ""}

        <Buttons type="warning" id="start" disabled={this.state.startTime ? true : false}  onClick={this.handleStart}>Start Time</Buttons>
        
        <Buttons type="warning" id="end" disabled={this.state.endTime ? true : false} onClick={this.handleEnd}>End Time</Buttons>

      </div>
    )
  };
}

//Total time spent (end time-start time) calculated
//total time saved in state
//total time displayed at Total time spent

export default Time;