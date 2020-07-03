const updateObject = (state, value) => {
    return {
        ...state,
        ...value,
    };
};

export default updateObject;
