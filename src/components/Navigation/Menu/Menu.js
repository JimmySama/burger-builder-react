import React from "react";
import classes from "./Meun.css";
const menu = (props) => (
    <div onClick={props.click} className={classes.Menu}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default menu;
