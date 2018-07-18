import React, { Component } from "react";
import "./Time.css"
import Buttons from '../Buttons';
import LogTime from "./Log";
import API from "../../utils/API";
var moment = require('moment');


let Date;
Date = moment().format('L');
let fullname;

class Time extends Component {

  state = {
    fullname: "",
    startTime: "",
    endTime: "",
    isLoaded: false,
    duration: ""
  }

  componentDidMount() {
    API.getUserTimeSheet()
      .then(res => {
        console.log(res.data);
        fullname = res.data.fullname;
        console.log(fullname);
        
        const todaysCard = res.data.timecards.find(timeCardItem => {
          return (timeCardItem.date === moment().format("ddd MMM D"))
        })

        this.setState({
          startTime: todaysCard ? todaysCard.startTime : "",
          endTime: todaysCard ? todaysCard.endTime : "",
          fullname: fullname
        })

      })
      .catch(err => console.log(err))
  }

  handleStart = () => {
    const time = moment().format("hh:mm:ss a")
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
    const time = moment().format("hh:mm:ss a")
    const duration = moment.duration(moment().diff(moment(this.state.startTime, "hh:mm:ss a"))).asHours();
    // let totalHoursFormatted = moment.duration(this.totalhours).asHours();
    // totalHoursFormatted = moment.duration(totalHoursFormatted+duration).asHours();
    // console.log(totalHoursFormatted);

    API.setEndTime(time, moment().format("ddd MMM D"), duration)
      .then(res => {
        console.log(res.data)
        this.setState({
          endTime: time,
          duration: duration,
          // totalhours: totalHoursFormatted
        })
      })
      .catch(err => console.log(err));
  }

  render() {
    return (

      <div id="time-wrap">
        <Buttons type="dark" id="time-logout" onClick={this.props.handleLogout}>Log Out</Buttons>

        <div className="clear timecard">

        <h3 className="timecard-item" id="name">Hi, {this.state.fullname}</h3>
        <h3 className="timecard-item date">Your time card for: {Date}</h3>


        {(this.state.startTime !== "") ? <LogTime className="timecard-item" time={this.state.startTime}>Start time: </LogTime> : <h2 className="timecard-item">"Start your timecard for today!"</h2>}
        {(this.state.endTime !== "") ? <LogTime className="timecard-item" time={this.state.endTime}>End time: </LogTime> : ""}


        <Buttons type="danger"  className="timecard-item" id="start" disabled={this.state.startTime ? true : false} onClick={this.handleStart}>Start Time</Buttons>

        <Buttons type="danger"  className="timecard-item" id="end" disabled={this.state.endTime ? true : false} onClick={this.handleEnd}>End Time</Buttons>

        </div>

      </div>
    )
  };
}

//Total time spent (end time-start time) calculated
//total time saved in state
//total time displayed at Total time spent

export default Time;