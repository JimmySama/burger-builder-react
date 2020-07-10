import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import ErrorHandler from "../../hoc/ErrorHandler/ErrorHandler";
import * as actions from "../../store/actions/actions";
const Orders = (props) => {
    useEffect(() => {
        if (props.token) {
            props.onGetOrders(props.token, props.userId);
        }
    }, []);

    let orders = props.orders.map((order) => (
        <Order key={order.id} ingredients={order.ingredients} price={+order.price} />
    ));
    if (props.error) {
        orders = <p style={{ textAlign: "center", color: "red" }}>Something went wrong!</p>;
    }
    if (props.loading) {
        orders = <Spinner />;
    }
    if (!props.token) {
        orders = <Redirect to="/" />;
    }
    return <div>{orders}</div>;
};
const mapStateToProps = (state) => {
    return {
        orders: state.order.orders,
        loading: state.order.load,
        error: state.order.error,
        token: state.auth.token,
        userId: state.auth.userId,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onGetOrders: (token, userId) =>
            dispatch(actions.getOrder({ token: token, userId: userId })),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(Orders, axios));
