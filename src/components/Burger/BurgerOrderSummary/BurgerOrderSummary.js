import React from "react";
import Aux from "../../../hoc/Auxillay/Auxillary";
import Button from "../../UI/Button/Button";
const burgerOrderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients).map((key, id) => (
        <li key={id}>
            <span style={{ textTransform: "capitalize" }}>{key}</span>: {props.ingredients[key]}
        </li>
    ));

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious buger with the following ingredients:</p>
            <ul>{ingredientSummary}</ul>
            <p>
                <strong>Total Price: ${props.price.toFixed(2)}</strong>
            </p>
            <p>Continue to check out?</p>
            <Button type="Danger" click={props.closeModal}>
                CANCAL
            </Button>
            <Button type="Success" click={props.successOrder}>
                CONTINUE
            </Button>
        </Aux>
    );
};

export default burgerOrderSummary;
