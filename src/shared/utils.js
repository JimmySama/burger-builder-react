export const checkInputValidation = (value, validationType) => {
    let isValid = true;
    if (validationType.required) {
        isValid = value.trim() !== "" && isValid;
    }
    if (validationType.minLength) {
        isValid = value.length >= validationType.minLength && isValid;
    }
    if (validationType.maxLength) {
        isValid = value.length <= validationType.maxLength && isValid;
    }
    return isValid;
};
