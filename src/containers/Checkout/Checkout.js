import React, { Component } from "react";
import { withRouter, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Checkoutsummary from "../../components/Order/Checkoutsummary/Checkoutsummary";
import ContactData from "./ContactData/ContactData";
class Checkout extends Component {
    // state = {
    //     ingredients: {
    //         salad: 0,
    //         bacon: 0,
    //         meat: 0,
    //         cheese: 0,
    //     },
    //     totPrice: 0,
    // };
    componentDidMount() {
        // const query = new URLSearchParams(this.props.location.search);
        // const ingredients = {};
        // let price = 0;
        // for (let i of query.entries()) {
        //     if (i[0] === "price") {
        //         price = i[1];
        //     } else {
        //         ingredients[i[0]] = +i[1];
        //     }
        // }
        // this.setState({ ingredients: ingredients, totPrice: price });
    }
    cancelCheckOut = () => {
        this.props.history.goBack();
    };
    continueCheckOut = () => {
        this.props.history.replace("/checkout/contact-data");
    };

    render() {
        let summary = <Redirect to="/" />;
        if (this.props.ings) {
            const redirect = this.props.purchaseSuccess ? <Redirect to="/" /> : null;
            summary = (
                <div>
                    {redirect}
                    <Checkoutsummary
                        ingredients={this.props.ings}
                        cancelCheckOut={this.cancelCheckOut}
                        continueCheckOut={this.continueCheckOut}
                    />
                    <Route path={this.props.match.url + "/contact-data"} component={ContactData} />
                </div>
            );
        }
        return summary;
    }
}
const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchaseSuccess: state.order.purchaseSuccess,
    };
};

export default connect(mapStateToProps)(withRouter(Checkout));
