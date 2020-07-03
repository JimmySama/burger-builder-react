import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";
export const addIngredients = (payload) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        payload,
    };
};

export const removeIngredients = (payload) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        payload,
    };
};

export const setIngredients = (payload) => {
    return {
        type: actionTypes.INIT_INGREDIENTS,
        payload,
    };
};

export const failIngredients = () => {
    return {
        type: actionTypes.FAIL_INIT_INGREDIENTS,
    };
};
export const initIngredients = () => {
    return (dispatch) => {
        axios
            .get("/ingredients.json")
            .then((response) => {
                dispatch(setIngredients(response.data));
            })
            .catch((error) => {
                dispatch(failIngredients());
            });
    };
};
