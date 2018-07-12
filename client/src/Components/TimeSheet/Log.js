import React from "react";
var moment = require('moment');


const LogTime = props => {
  
    return(
    <h3 style={{color:"white"}} disabled={props.disabled}><span>{props.children}</span>{props.time}</h3>
        )

}

export default LogTime;