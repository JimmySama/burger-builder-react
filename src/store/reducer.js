import * as actions from "./actions";

const initialState = {
    ingredients: {
        salad: 0,
        meat: 0,
        bacon: 0,
        cheese: 0,
    },
    totPrice: 2,
};

const ingredientsPrice = {
    salad: 0.3,
    meat: 1.2,
    cheese: 0.8,
    bacon: 0.9,
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.payload.ingredient]: state.ingredients[action.payload.ingredient] + 1,
                },
                totPrice: state.totPrice + ingredientsPrice[action.payload.ingredient],
            };

        case actions.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.payload.ingredient]: state.ingredients[action.payload.ingredient] - 1,
                },
                totPrice: state.totPrice - ingredientsPrice[action.payload.ingredient],
            };

        default:
            return state;
    }
};

export default reducer;
