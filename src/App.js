import React, { Component, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Spinner from "./components/UI/Spinner/Spinner";
const Checkout = React.lazy(() => import("./containers/Checkout/Checkout"));
const Orders = React.lazy(() => import("./containers/Orders/Orders"));
class App extends Component {
    render() {
        return (
            <div>
                <Layout>
                    <Switch>
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
                        <Route path="/" exact component={BurgerBuilder} />
                    </Switch>
                </Layout>
            </div>
        );
    }
}

export default App;
