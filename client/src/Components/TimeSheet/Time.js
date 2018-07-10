import React, { Component } from "react";
import Buttons from '../Buttons';
import LogTime from "./Log";
import API from "../../utils/API";
var moment = require('moment');


// let start;
// let end;
// let totalTime;
let Date;


// start = moment().format('hh:mm:ss');
// console.log("the time is" + start);


// end = moment();
// totalTime = end - start;
Date = moment().format('L');

class Time extends Component {

  state = {
    showStart: false,
    showEnd: false
  }

  componentDidMount() {
    API.getUserTimeSheet()
      .then(res => {
        console.log(res.data);

        const todaysCard = res.data.timecards.filter(timeCardItem => {
          return (timeCardItem.date === moment().format("ddd MMM D"))
        })

        console.log(todaysCard);

        this.setState({
          startTime: todaysCard[0].startTime
        })
      })
      .catch(err => console.log(err))
  }

  // handleTime = (startOrEnd) => {
  //   API.setTime(moment().format("hh:mm:ss"), startOrEnd)
  //   .then(res => {
  //     this.setState({
  //       startTime: res.data
  //     })
  //   }).catch(err=> console.log(err));
  // }

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


  renderLog = () => {
    if(this.state.showStart && this.state.showEnd){
      return (<div><LogTime/></div>)

    }
  } 

  render() {
    return (
      <div style={{ color: "white" }}>
        <h3>Name: abc</h3>
        <h3>Date: {Date}</h3>
        
        <Buttons type="warning" disabled={this.state.startTime} onClick={this.handleStart}>Start Time</Buttons>
        
        <Buttons type="warning" onClick={this.handleEnd}>End Time</Buttons>
        
        {(this.state.startTime !== "") ? <LogTime time={this.state.startTime} /> : "Start your timecard for today!"}
        {this.state.endTime ? <LogTime time={this.state.endTime} /> : ""}
  
   
        

      </div>
    )
  };
}


//Logout button displayed

//today's date displayed

// Full name displayed

// option to select (shelving, task 2, task 3)

//Start button clicked 
//time now() is captured
//time now() stored in state.start
//time now() is displayed at Start Time (text area)

//end button clicked
//time now captured
//time now stored at state.end
//time now() displayed in End time

//Total time spent (end time-start time) calculated
//total time saved in state
//total time displayed at Total time spent

export default Time;