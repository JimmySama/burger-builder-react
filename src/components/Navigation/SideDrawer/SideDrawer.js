import React from "react";
import Logo from "../../UI/Logo/Logo";
import NavigationItemList from "../NavigationItemList/NavigationItemList";
import classes from "./SideDrawer.css";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Auxillay/Auxillary";
const sideDrawer = (props) => {
    let attachedClasses = props.shownSideDrawer
        ? [classes.SideDrawer, classes.Open]
        : [classes.SideDrawer, classes.Close];

    return (
        <Aux>
            <Backdrop show={props.shownSideDrawer} click={props.closeSideDrawer} />
            <div className={attachedClasses.join(" ")} onClick={props.closeSideDrawer}>
                <div className={classes.Logo}>
                    <Logo />
                </div>

                <nav>
                    <NavigationItemList auth={props.auth} />
                </nav>
            </div>
        </Aux>
    );
};
export default sideDrawer;
