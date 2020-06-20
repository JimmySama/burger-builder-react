import React from "react";
import classes from "./Burger.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
const burger = (props) => {
    let ingredientComponents = Object.keys(props.ingredients)
        .map((type) => {
            return [...Array(props.ingredients[type])].map((_, i) => {
                return <BurgerIngredient key={type + i} type={type} />;
            });
        })
        .reduce((prev, cur) => {
            return prev.concat(cur);
        }, []);

    if (ingredientComponents.length === 0) {
        ingredientComponents = <p>Please start adding ingredients!</p>;
    }
    // console.log(ingredientComponents);
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {ingredientComponents}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;
