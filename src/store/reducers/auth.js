import * as actionTypes from "../actions/actionTypes";
import updateObject from "../utility/utility";
const initialState = {
    token: null,
    loading: false,
    userId: null,
    error: null,
};

const successAuth = (state, action) => {
    return updateObject(state, {
        token: action.payload.idToken,
        userId: action.payload.localId,
        error: null,
        loading: false,
    });
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return updateObject(state, { error: null, loading: true });
        case actionTypes.AUTH_SUCCESS:
            return successAuth(state, action);

        case actionTypes.AUTH_FAIL:
            return updateObject(state, { error: action.payload.error.message, loading: false });
        case actionTypes.AUTH_LOGOUT:
            return updateObject(state, { token: null, userId: null });
        default:
            return state;
    }
};

export default reducer;
