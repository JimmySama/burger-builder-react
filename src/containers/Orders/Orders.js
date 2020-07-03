import React, { Component } from "react";
import { connect } from "react-redux";
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
        this.props.onGetOrders();
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

        return <div>{orders}</div>;
    }
}
const mapStateToProps = (state) => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        error: state.order.error,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onGetOrders: () => dispatch(actions.getOrder()),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(Orders, axios));
