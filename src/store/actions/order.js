import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const successOrder = (payload) => {
    return {
        type: actionTypes.SUCCESS_ORDER,
        payload,
    };
};

export const failOrder = (payload) => {
    return {
        type: actionTypes.FAIL_ORDER,
        payload,
    };
};

export const startOrder = () => {
    return {
        type: actionTypes.STORING_ORDER,
    };
};
export const redirect = () => {
    return {
        type: actionTypes.REDIRECT_ORDER,
    };
};
export const storeOrder = (payload) => {
    return (dispatch) => {
        dispatch(startOrder());
        axios
            .post("/orders.json", payload)
            .then((response) => {
                dispatch(successOrder(response.data));
            })
            .catch((error) => {
                dispatch(failOrder(error));
            });
    };
};

export const getOrderStart = () => {
    return {
        type: actionTypes.GET_ORDERS_START,
    };
};

export const getOrderSuccess = (payload) => {
    return {
        type: actionTypes.GET_ORDERS_SUCCESS,
        payload,
    };
};

export const getOrderFail = (payload) => {
    return {
        type: actionTypes.GET_ORDERS_FAIL,
        payload,
    };
};

export const getOrder = () => {
    return (dispatch) => {
        dispatch(getOrderStart());
        axios
            .get("/orders.json")
            .then((response) => {
                let orders = [];
                for (let key in response.data) {
                    orders.push({
                        ...response.data[key],
                        id: key,
                    });
                }
                dispatch(getOrderSuccess(orders));
            })
            .catch((error) => {
                dispatch(getOrderFail(error));
            });
    };
};
