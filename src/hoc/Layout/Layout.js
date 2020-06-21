import React, { Component } from "react";
import Aux from "../Auxillay/Auxillary";
import classes from "./Layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
class Layout extends Component {
    state = {
        shownSideDrawer: false,
    };
    closeSideDrawer = () => {
        this.setState({ shownSideDrawer: false });
    };
    openSideDrawer = () => {
        this.setState((prevState) => {
            return { shownSideDrawer: !prevState.shownSideDrawer };
        });
    };
    render() {
        return (
            <Aux>
                <Toolbar openSideDrawer={this.openSideDrawer} />
                <SideDrawer
                    closeSideDrawer={this.closeSideDrawer}
                    shownSideDrawer={this.state.shownSideDrawer}
                />
                <main className={classes.content}>{this.props.children}</main>
            </Aux>
        );
    }
}

export default Layout;
