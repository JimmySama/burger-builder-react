import React from "react";
import classes from "./Order.css";
const order = (props) => {
    const ingredients = [];
    for (let ingredient in props.ingredients) {
        ingredients.push({ name: ingredient, amount: props.ingredients[ingredient] });
    }
    return (
        <div className={classes.Order}>
            <p>
                Ingredients:{" "}
                {ingredients.map((ingredient) => (
                    <span key={ingredient.name}>
                        {ingredient.name} ({ingredient.amount})
                    </span>
                ))}
            </p>
            <p>
                Price <strong>$ {props.price.toFixed(2)}</strong>
            </p>
        </div>
    );
};

export default order;
