import React from 'react';

import "./Container.css";

//This is the container that accepts the forms and buttons as children;
const Container = (props) => (
    <div className="Container align-items-center">
    {props.children}
    </div>
);

export default Container;