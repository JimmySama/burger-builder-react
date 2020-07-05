import React from "react";
import classes from "./NavigationItemList.css";
import NavigationItem from "./NavigationItem/NavigationItem";
const navigationItemList = (props) => (
    <ul className={classes.NavigationItemList}>
        <NavigationItem link={"/"}>BurgerBuilder</NavigationItem>
        {!props.auth ? (
            <NavigationItem link="/auth">Your Account</NavigationItem>
        ) : (
            <React.Fragment>
                <NavigationItem link="/orders">Orders</NavigationItem>
                <NavigationItem link="/logout">Logout</NavigationItem>
            </React.Fragment>
        )}
    </ul>
);

export default navigationItemList;
