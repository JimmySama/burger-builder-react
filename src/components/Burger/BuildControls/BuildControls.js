import React from "react";
import BuildControl from "./BuildControl/BuildControl";
import classes from "./BuildControls.css";
const controls = [
    { label: "Salad", type: "salad" },
    { label: "Bacon", type: "bacon" },
    { label: "Meat", type: "meat" },
    { label: "Cheese", type: "cheese" },
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>
            Current price: <strong>${props.price.toFixed(2)}</strong>
        </p>
        {controls.map((control) => (
            <BuildControl
                key={control.label}
                ingredient={control.label}
                add={() => props.addIngredients(control.type)}
                remove={() => props.removeIngredients(control.type)}
                disable={props.disabled[control.type]}
            />
        ))}
        <button className={classes.OrderButton} disabled={!props.purchases} onClick={props.click}>
            ORDER NOW
        </button>
    </div>
);

export default buildControls;
