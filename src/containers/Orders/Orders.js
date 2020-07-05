import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import ErrorHandler from "../../hoc/ErrorHandler/ErrorHandler";
import * as actions from "../../store/actions/actions";
class Orders extends Component {
    state = {
        orders: [],
        error: null,
        loading: true,
    };
    componentDidMount() {
        if (this.props.token) {
            this.props.onGetOrders(this.props.token, this.props.userId);
        }
    }
    render() {
        let orders = this.props.orders.map((order) => (
            <Order key={order.id} ingredients={order.ingredients} price={+order.price} />
        ));
        if (this.props.error) {
            orders = <p style={{ textAlign: "center", color: "red" }}>Something went wrong!</p>;
        }
        if (this.props.loading) {
            orders = <Spinner />;
        }
        if (!this.props.token) {
            orders = <Redirect to="/" />;
        }
        return <div>{orders}</div>;
    }
}
const mapStateToProps = (state) => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
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
