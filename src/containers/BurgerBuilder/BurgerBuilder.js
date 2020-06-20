import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Aux from "../../hoc/Auxillary";
class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            meat: 0,
            cheese: 0,
            bacon: 0,
        },
        totPrice: 4,
        purchasesable: false,
    };
    ingredientsPrice = {
        salad: 0.3,
        meat: 1.2,
        cheese: 0.8,
        bacon: 0.9,
    };
    updatePurchaseBtn(ingredients) {
        const sum = Object.keys(ingredients)
            .map((key) => ingredients[key])
            .reduce((init, cur) => init + cur, 0);

        this.setState({
            purchasesable: sum > 0,
        });
    }
    addIngredientsHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const newCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients,
        };
        updatedIngredients[type] = newCount;

        const oldPrice = this.state.totPrice;
        const newPrice = oldPrice + this.ingredientsPrice[type];
        this.setState({
            ingredients: updatedIngredients,
            totPrice: newPrice,
        });

        this.updatePurchaseBtn(updatedIngredients);
    };

    removeIngredientsHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const newCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients,
        };
        updatedIngredients[type] = newCount;

        const oldPrice = this.state.totPrice;
        const newPrice = oldPrice - this.ingredientsPrice[type];
        this.setState({
            ingredients: updatedIngredients,
            totPrice: newPrice,
        });
        this.updatePurchaseBtn(updatedIngredients);
    };
    render() {
        const disableInfo = {
            ...this.state.ingredients,
        };

        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    addIngredients={this.addIngredientsHandler}
                    removeIngredients={this.removeIngredientsHandler}
                    disabled={disableInfo}
                    price={this.state.totPrice}
                    purchases={this.state.purchasesable}
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;
