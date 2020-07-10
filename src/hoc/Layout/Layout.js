import React, { useState } from "react";
import { connect } from "react-redux";
import Aux from "../Auxillay/Auxillary";
import classes from "./Layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
const Layout = (props) => {
    const [shownSideDrawer, setShownSideDrawer] = useState(false);

    const closeSideDrawer = () => {
        setShownSideDrawer(false);
    };
    const openSideDrawer = () => {
        setShownSideDrawer(!shownSideDrawer);
    };

    return (
        <Aux>
            <Toolbar openSideDrawer={openSideDrawer} auth={props.auth} />
            <SideDrawer
                closeSideDrawer={closeSideDrawer}
                shownSideDrawer={shownSideDrawer}
                auth={props.auth}
            />
            <main className={classes.content}>{props.children}</main>
        </Aux>
    );
};
const mapStateToProps = (state) => {
    return {
        auth: state.auth.token !== null,
    };
};
export default connect(mapStateToProps)(Layout);
