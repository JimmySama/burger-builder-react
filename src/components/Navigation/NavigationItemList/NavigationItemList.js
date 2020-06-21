import React from "react";
import classes from "./NavigationItemList.css";
import NavigationItem from "./NavigationItem/NavigationItem";
const navigationItemList = (props) => (
    <ul className={classes.NavigationItemList}>
        <NavigationItem link={"/"} active={true}>
            BurgerBuilder
        </NavigationItem>
        <NavigationItem link="/">Checkout</NavigationItem>
    </ul>
);

export default navigationItemList;
