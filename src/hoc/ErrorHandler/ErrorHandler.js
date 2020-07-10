import React from "react";
import Aux from "../Auxillay/Auxillary";
import Modal from "../../components/UI/Modal/Modal";
import useHttpErrorHandler from "../../hooks/httperrorhandler";
const ErrorHandler = (WrappedComponent, axios) => {
    return (props) => {
        const [error, clearError] = useHttpErrorHandler(axios);
        return (
            <Aux>
                <Modal show={error} closeModal={clearError}>
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </Aux>
        );
    };
};

export default ErrorHandler;
