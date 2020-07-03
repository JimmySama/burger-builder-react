import * as actionTypes from "../actions/actionTypes";
import updateObject from "../utility/utility";
const initialState = {
    orders: [],
    load: false,
    purchaseSuccess: false,
    error: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.REDIRECT_ORDER:
            return updateObject(state, { purchaseSuccess: false });

        case actionTypes.STORING_ORDER:
            return updateObject(state, { load: true });

        case actionTypes.SUCCESS_ORDER:
            return updateObject(state, {
                orders: state.orders.concat(action.payload),
                load: false,
                purchaseSuccess: true,
            });

        case actionTypes.FAIL_ORDER:
            return updateObject(state, { load: false });

        case actionTypes.GET_ORDERS_START:
            return updateObject(state, { load: true });

        case actionTypes.GET_ORDERS_SUCCESS:
            return updateObject(state, { orders: action.payload, load: false });

        case actionTypes.GET_ORDERS_FAIL:
            return updateObject(state, { load: false, error: action.payload });

        default:
            return state;
    }
};

export default reducer;
