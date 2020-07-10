import React from "react";
import classes from "./Modal.css";
import Aux from "../../../hoc/Auxillay/Auxillary";
import Backdrop from "../Backdrop/Backdrop";
const Modal = (props) => {
    return (
        <Aux>
            <Backdrop show={props.show} click={props.closeModal} />
            <div
                className={classes.Modal}
                style={{
                    transform: props.show ? "translateY(0)" : "translateY(-100vh)",
                }}
            >
                {props.children}
            </div>
        </Aux>
    );
};
export default React.memo(
    Modal,
    (prevProps, nextProps) =>
        nextProps.show === prevProps.show && nextProps.children === prevProps.children
);
