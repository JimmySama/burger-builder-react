import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Aux from "../../hoc/Auxillay/Auxillary";
import Modal from "../../components/UI/Modal/Modal";
import BurgerOrderSummary from "../../components/Burger/BurgerOrderSummary/BurgerOrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import errorHandler from "../../hoc/ErrorHandler/ErrorHandler";
class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totPrice: 2,
        purchasesable: false,
        shownModal: false,
        loading: false,
        error: false,
    };
    ingredientsPrice = {
        salad: 0.3,
        meat: 1.2,
        cheese: 0.8,
        bacon: 0.9,
    };
    async componentDidMount() {
        try {
            const ingredients = await axios.get(
                "https://burger-builder-670e1.firebaseio.com/ingredients.json"
            );
            this.setState({ ingredients: ingredients.data });
        } catch (err) {
            this.setState({ error: err });
        }
    }
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

    openModalHandler = () => {
        this.setState({
            shownModal: true,
        });
    };
    closeModalHandler = () => {
        this.setState({
            shownModal: false,
        });
    };
    successOrderHandler = () => {
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(
                encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingredients[i])
            );
        }
        queryParams.push(
            encodeURIComponent("price") + "=" + encodeURIComponent(this.state.totPrice)
        );
        const queryString = queryParams.join("&");
        this.props.history.push({
            pathname: "/checkout",
            search: "?" + queryString,
        });
    };
    render() {
        const disableInfo = {
            ...this.state.ingredients,
        };

        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }
        let orderSummary = null;
        let burger = this.state.error ? (
            <p style={{ textAlign: "center", color: "red" }}>Something went wrong!</p>
        ) : (
            <Spinner />
        );
        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        addIngredients={this.addIngredientsHandler}
                        removeIngredients={this.removeIngredientsHandler}
                        disabled={disableInfo}
                        price={this.state.totPrice}
                        purchases={this.state.purchasesable}
                        click={this.openModalHandler}
                    />
                </Aux>
            );
            orderSummary = (
                <BurgerOrderSummary
                    ingredients={this.state.ingredients}
                    closeModal={this.closeModalHandler}
                    successOrder={this.successOrderHandler}
                    price={this.state.totPrice}
                />
            );
        }
        if (this.state.loading) {
            orderSummary = <Spinner />;
        }
        return (
            <Aux>
                <Modal show={this.state.shownModal} closeModal={this.closeModalHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default errorHandler(BurgerBuilder, axios);
