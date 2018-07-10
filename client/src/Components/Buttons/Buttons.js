import React from "react";
import "./Buttons.css";

const Buttons =props => (
    <button className={`btn btn-${props.type}`} id={props.id} onClick={props.onClick}>{props.children}</button>
)

export default Buttons;

