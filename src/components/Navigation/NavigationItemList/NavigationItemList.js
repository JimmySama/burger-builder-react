import React from "react";
import classes from "./NavigationItemList.css";
import NavigationItem from "./NavigationItem/NavigationItem";
const navigationItemList = (props) => (
    <ul className={classes.NavigationItemList}>
        <NavigationItem link={"/"}>BurgerBuilder</NavigationItem>
        <NavigationItem link="/orders">Orders</NavigationItem>
    </ul>
);

export default navigationItemList;
