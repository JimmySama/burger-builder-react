import React, { Component } from "react";
import { connect } from "react-redux";
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
                <Toolbar openSideDrawer={this.openSideDrawer} auth={this.props.auth} />
                <SideDrawer
                    closeSideDrawer={this.closeSideDrawer}
                    shownSideDrawer={this.state.shownSideDrawer}
                    auth={this.props.auth}
                />
                <main className={classes.content}>{this.props.children}</main>
            </Aux>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        auth: state.auth.token !== null,
    };
};
export default connect(mapStateToProps)(Layout);
