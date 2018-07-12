import React from "react";
import "./Buttons.css";

const Buttons =props => (
    <button className={`btn btn-${props.type}`} id={props.id} onClick={props.onClick} disabled={props.disabled ? true : false}>{props.children}</button>
)

export default Buttons;

