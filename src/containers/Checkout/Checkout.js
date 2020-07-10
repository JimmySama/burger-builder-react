import React from "react";
import { withRouter, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Checkoutsummary from "../../components/Order/Checkoutsummary/Checkoutsummary";
import ContactData from "./ContactData/ContactData";
const Checkout = (props) => {
    const cancelCheckOut = () => {
        props.history.goBack();
    };
    const continueCheckOut = () => {
        props.history.replace("/checkout/contact-data");
    };

    let summary = <Redirect to="/" />;
    if (props.ings) {
        const redirect = props.purchaseSuccess ? <Redirect to="/" /> : null;
        summary = (
            <div>
                {redirect}
                <Checkoutsummary
                    ingredients={props.ings}
                    cancelCheckOut={cancelCheckOut}
                    continueCheckOut={continueCheckOut}
                />
                <Route path={props.match.url + "/contact-data"} component={ContactData} />
            </div>
        );
    }
    return summary;
};
const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchaseSuccess: state.order.purchaseSuccess,
    };
};

export default connect(mapStateToProps)(withRouter(Checkout));
