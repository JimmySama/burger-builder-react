import React, { Component, Suspense, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Logout from "./containers/Auth/Logout/Logout";
import Spinner from "./components/UI/Spinner/Spinner";
import * as actionCreators from "./store/actions/actions";
const Checkout = React.lazy(() => import("./containers/Checkout/Checkout"));
const Orders = React.lazy(() => import("./containers/Orders/Orders"));
const Auth = React.lazy(() => import("./containers/Auth/Auth"));
const App = (props) => {
    useEffect(() => {
        props.onInitAuth();
    }, []);

    let routes = (
        <Switch>
            <Route
                path="/auth"
                render={() => {
                    return (
                        <Suspense fallback={<Spinner />}>
                            <Auth />
                        </Suspense>
                    );
                }}
            />

            <Route path="/" exact component={BurgerBuilder} />
            <Redirect to="/" />
        </Switch>
    );

    if (props.auth) {
        routes = (
            <Switch>
                <Route
                    path="/auth"
                    render={() => {
                        return (
                            <Suspense fallback={<Spinner />}>
                                <Auth />
                            </Suspense>
                        );
                    }}
                />
                <Route
                    path="/checkout"
                    render={() => {
                        return (
                            <Suspense fallback={<Spinner />}>
                                <Checkout />
                            </Suspense>
                        );
                    }}
                />
                <Route
                    path="/orders"
                    render={() => {
                        return (
                            <Suspense fallback={<Spinner />}>
                                <Orders />
                            </Suspense>
                        );
                    }}
                />

                <Route path="/logout" exact component={Logout} />
                <Route path="/" exact component={BurgerBuilder} />
                <Redirect to="/" />
            </Switch>
        );
    }
    return (
        <div>
            <Layout>{routes}</Layout>
        </div>
    );
};
const mapStateToProps = (state) => {
    return {
        auth: state.auth.token,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        onInitAuth: () => dispatch(actionCreators.initAuth()),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
