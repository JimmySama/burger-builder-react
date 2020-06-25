import React from "react";
import classes from "./Input.css";
const input = (props) => {
    let element = null;
    switch (props.inputelement) {
        case "textarea":
            element = <textarea {...props} className={classes.InputElement} />;
            break;
        default:
            element = <input {...props} className={classes.InputElement} />;
            break;
    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {element}
        </div>
    );
};

export default input;
