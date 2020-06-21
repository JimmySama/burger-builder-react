import React from "react";
import Logo from "../../../assets/imgs/logo.png";
import classes from "./Logo.css";
const logo = (props) => (
    <div className={classes.Logo}>
        <img src={Logo} alt="Logo"></img>
    </div>
);

export default logo;
