import React from "react";
import classes from "./Input.css";
const input = (props) => {
    let inputClasses = [classes.InputElement];
    if (props.invalid && props.validation && props.touched) {
        inputClasses.push(classes.Invalid);
    }
    let element = null;
    switch (props.elementType) {
        case "textarea":
            element = (
                <textarea
                    {...props.elementConfig}
                    className={inputClasses.join(" ")}
                    value={props.value}
                    onChange={props.change}
                />
            );
            break;
        case "select":
            element = (
                <select className={inputClasses.join(" ")} onChange={props.change}>
                    {props.elementConfig.options.map((option) => (
                        <option value={option.value} key={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            element = (
                <input
                    {...props.elementConfig}
                    className={inputClasses.join(" ")}
                    value={props.value}
                    onChange={props.change}
                />
            );
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
