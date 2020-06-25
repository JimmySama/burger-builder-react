import React, { Component } from "react";
import { withRouter, Route } from "react-router-dom";
import Checkoutsummary from "../../components/Order/Checkoutsummary/Checkoutsummary";
import ContactData from "./ContactData/ContactData";
class Checkout extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            meat: 0,
            cheese: 0,
        },
        totPrice: 0,
    };
    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for (let i of query.entries()) {
            if (i[0] === "price") {
                price = i[1];
            } else {
                ingredients[i[0]] = +i[1];
            }
        }
        this.setState({ ingredients: ingredients, totPrice: price });
    }
    cancelCheckOut = () => {
        this.props.history.goBack();
    };
    continueCheckOut = () => {
        this.props.history.replace("/checkout/contact-data");
    };
    render() {
        return (
            <div>
                <Checkoutsummary
                    ingredients={this.state.ingredients}
                    cancelCheckOut={this.cancelCheckOut}
                    continueCheckOut={this.continueCheckOut}
                />
                <Route
                    path={this.props.match.url + "/contact-data"}
                    render={() => (
                        <ContactData
                            ingredients={this.state.ingredients}
                            totPrice={this.state.totPrice}
                            {...this.props}
                        />
                    )}
                />
            </div>
        );
    }
}

export default withRouter(Checkout);
