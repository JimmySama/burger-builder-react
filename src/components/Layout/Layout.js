import React from "react";
import Aux from "../../hoc/Auxillary";
import classes from "./Layout.css";
const layout = (props) => (
    <Aux>
        <div>Navigation</div>
        <main className={classes.content}>{props.children}</main>
    </Aux>
);

export default layout;
