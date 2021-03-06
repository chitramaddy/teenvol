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
          duration: todaysCard ? todaysCard.duration : "",
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

    API.setEndTime(time, moment().format("ddd MMM D"), duration)
      .then(res => {
        console.log(res.data)
        this.setState({
          endTime: time,
          duration: duration
        })
      })
      .catch(err => console.log(err));
  }

  toFixed_norounding(n, p) {
  var result = n.toFixed(p);
  return result <= n ? result : (result - Math.pow(0.1, p)).toFixed(p);
}

render() {
  return (

    <div id="time-wrap">
      <Buttons type="dark" id="time-logout" onClick={this.props.handleLogout}>Log Out</Buttons>

      <div className="clear timecard">

        <h3 className="timecard-item" id="name">Hi, {this.state.fullname}</h3>
        <h3 className="timecard-item date clear">Your time card for: {Date}</h3>

        <ul>

          <li className="list-group-item list-group-item-dark"> {(this.state.startTime !== "") ? <LogTime className="timecard-item" time={this.state.startTime}>Start time: </LogTime> : <h2 className="timecard-item">"Start your timecard for today!"</h2>}</li>

          <li className="list-group-item list-group-item-dark">{(this.state.endTime !== "") ? <LogTime className="timecard-item" time={this.state.endTime}>End time: </LogTime> : ""}</li>

          <li className="list-group-item list-group-item-dark">{(this.state.endTime !== "") ? <LogTime className="timecard-item" time={this.state.duration}>Duration: </LogTime> : ""}</li>

          <br />

          <li><Buttons type="danger" className="timecard-item" id="start" disabled={this.state.startTime ? true : false} onClick={this.handleStart}>Start Time</Buttons>

            <Buttons type="danger" className="timecard-item" id="end" disabled={this.state.endTime ? true : false} onClick={this.handleEnd}>End Time</Buttons> </li>

        </ul>

      </div>

    </div>
  )
};
}


export default Time;