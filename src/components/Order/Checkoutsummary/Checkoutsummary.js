import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from "./Checkoutsummary.css";
const checkOutSummary = (props) => {
    return (
        <div className={classes.Checkoutsummary}>
            <h1>We hope it tastes well</h1>
            <div style={{ width: "100%", margin: "auto" }}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button type="Danger" click={props.cancelCheckOut}>
                CANCAL
            </Button>
            <Button type="Success" click={props.continueCheckOut}>
                SUCCESS
            </Button>
        </div>
    );
};

export default checkOutSummary;
