import * as actions from "../actions/actionTypes";

const initialState = {
    ingredients: null,
    totPrice: 2,

    error: false,
};

const ingredientsPrice = {
    salad: 0.3,
    meat: 1.2,
    cheese: 0.8,
    bacon: 0.9,
};

const addIngredient = (state, action) => {
    return {
        ...state,
        ingredients: {
            ...state.ingredients,
            [action.payload.ingredient]: state.ingredients[action.payload.ingredient] + 1,
        },
        totPrice: state.totPrice + ingredientsPrice[action.payload.ingredient],
    };
};

const removeIngredient = (state, action) => {
    return {
        ...state,
        ingredients: {
            ...state.ingredients,
            [action.payload.ingredient]: state.ingredients[action.payload.ingredient] - 1,
        },
        totPrice: state.totPrice - ingredientsPrice[action.payload.ingredient],
    };
};

const initIngredients = (state, action) => {
    return {
        ...state,
        ingredients: action.payload,
        error: false,
        totPrice: 2,
    };
};

const failInitIngredients = (state, action) => {
    return {
        ...state,
        error: true,
    };
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.ADD_INGREDIENT:
            return addIngredient(state, action);
        case actions.REMOVE_INGREDIENT:
            return removeIngredient(state, action);
        case actions.INIT_INGREDIENTS:
            return initIngredients(state, action);
        case actions.FAIL_INIT_INGREDIENTS:
            return failInitIngredients(state, action);
        default:
            return state;
    }
};

export default reducer;
