import React, { Component } from "react";
import { connect } from "react-redux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Aux from "../../hoc/Auxillay/Auxillary";
import Modal from "../../components/UI/Modal/Modal";
import BurgerOrderSummary from "../../components/Burger/BurgerOrderSummary/BurgerOrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import errorHandler from "../../hoc/ErrorHandler/ErrorHandler";
import * as actions from "../../store/actions";
class BurgerBuilder extends Component {
    state = {
        purchasesable: false,
        shownModal: false,
        loading: false,
        error: false,
    };

    async componentDidMount() {
        // try {
        //     const ingredients = await axios.get(
        //         "https://burger-builder-670e1.firebaseio.com/ingredients.json"
        //     );
        //     this.setState({ ingredients: ingredients.data });
        // } catch (err) {
        //     this.setState({ error: err });
        // }
        // console.log(this.props.ings);
    }
    updatePurchaseBtn(ingredients) {
        const sum = Object.keys(ingredients)
            .map((key) => ingredients[key])
            .reduce((init, cur) => init + cur, 0);

        return sum > 0;
    }
    addIngredientsHandler = (type) => {
        // const oldCount = this.state.ingredients[type];
        // const newCount = oldCount + 1;
        // const updatedIngredients = {
        //     ...this.state.ingredients,
        // };
        // updatedIngredients[type] = newCount;
        // const oldPrice = this.state.totPrice;
        // const newPrice = oldPrice + this.ingredientsPrice[type];
        // this.setState({
        //     ingredients: updatedIngredients,
        //     totPrice: newPrice,
        // });
        // this.updatePurchaseBtn(updatedIngredients);
    };

    removeIngredientsHandler = (type) => {
        // const oldCount = this.state.ingredients[type];
        // if (oldCount <= 0) {
        //     return;
        // }
        // const newCount = oldCount - 1;
        // const updatedIngredients = {
        //     ...this.state.ingredients,
        // };
        // updatedIngredients[type] = newCount;
        // const oldPrice = this.state.totPrice;
        // const newPrice = oldPrice - this.ingredientsPrice[type];
        // this.setState({
        //     ingredients: updatedIngredients,
        //     totPrice: newPrice,
        // });
        // this.updatePurchaseBtn(updatedIngredients);
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
        // const queryParams = [];
        // for (let i in this.state.ingredients) {
        //     queryParams.push(
        //         encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingredients[i])
        //     );
        // }
        // queryParams.push(
        //     encodeURIComponent("price") + "=" + encodeURIComponent(this.state.totPrice)
        // );
        // const queryString = queryParams.join("&");
        // this.props.history.push({
        //     pathname: "/checkout",
        //     search: "?" + queryString,
        // });
        this.props.history.push("/checkout");
    };
    render() {
        const disableInfo = {
            ...this.props.ings,
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
        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        addIngredients={this.props.onAddIngredient}
                        removeIngredients={this.props.onRemoveIngredient}
                        disabled={disableInfo}
                        price={this.props.price}
                        purchases={this.updatePurchaseBtn(this.props.ings)}
                        click={this.openModalHandler}
                    />
                </Aux>
            );
            orderSummary = (
                <BurgerOrderSummary
                    ingredients={this.props.ings}
                    closeModal={this.closeModalHandler}
                    successOrder={this.successOrderHandler}
                    price={this.props.price}
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

const mapStateToProps = (state) => {
    return {
        ings: state.ingredients,
        price: state.totPrice,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAddIngredient: (ingredient) =>
            dispatch({ type: actions.ADD_INGREDIENT, payload: { ingredient: ingredient } }),
        onRemoveIngredient: (ingredient) =>
            dispatch({ type: actions.REMOVE_INGREDIENT, payload: { ingredient: ingredient } }),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(errorHandler(BurgerBuilder, axios));
