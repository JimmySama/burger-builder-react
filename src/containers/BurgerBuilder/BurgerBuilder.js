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
import * as actionCreators from "../../store/actions/actions";
class BurgerBuilder extends Component {
    state = {
        purchasesable: false,
        shownModal: false,
    };

    async componentDidMount() {
        this.props.onInitIngredients();
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
        if (this.props.auth) {
            this.setState({
                shownModal: true,
            });
        } else {
            this.props.history.push("/auth");
        }
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
        this.props.onPurchaseSuccess();
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
        let burger = this.props.error ? (
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
                        auth={this.props.auth}
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
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totPrice,
        error: state.burgerBuilder.error,
        auth: state.auth.token,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAddIngredient: (ingredient) =>
            dispatch(actionCreators.addIngredients({ ingredient: ingredient })),
        onRemoveIngredient: (ingredient) =>
            dispatch(actionCreators.removeIngredients({ ingredient: ingredient })),
        onInitIngredients: () => dispatch(actionCreators.initIngredients()),
        onPurchaseSuccess: () => dispatch(actionCreators.redirect()),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(errorHandler(BurgerBuilder, axios));
