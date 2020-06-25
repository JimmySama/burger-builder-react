import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import ErrorHandler from "../../hoc/ErrorHandler/ErrorHandler";
class Orders extends Component {
    state = {
        orders: [],
        error: null,
        loading: true,
    };
    async componentDidMount() {
        try {
            const fetchedOrders = await axios.get("/orders.json");
            let orders = [];
            for (let key in fetchedOrders.data) {
                orders.push({
                    ...fetchedOrders.data[key],
                    id: key,
                });
            }
            this.setState({ orders, loading: false });
        } catch (err) {
            this.setState({ error: err, loading: false });
        }
    }
    render() {
        let orders = this.state.orders.map((order) => (
            <Order key={order.id} ingredients={order.ingredients} price={+order.price} />
        ));
        if (this.state.error) {
            orders = <p style={{ textAlign: "center", color: "red" }}>Something went wrong!</p>;
        }
        if (this.state.loading) {
            orders = <Spinner />;
        }

        return <div>{orders}</div>;
    }
}

export default ErrorHandler(Orders, axios);
