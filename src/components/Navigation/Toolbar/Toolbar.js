import React from "react";
import classes from "./Toolbar.css";
import Logo from "../../UI/Logo/Logo";
import Navigation from "../NavigationItemList/NavigationItemList";
import Menu from "../Menu/Menu";
const toolBar = (props) => (
    <header className={classes.Toolbar}>
        <Menu click={props.openSideDrawer} />

        <Logo />

        <nav className={classes.DesktopOnly}>
            <Navigation />
        </nav>
    </header>
);

export default toolBar;
