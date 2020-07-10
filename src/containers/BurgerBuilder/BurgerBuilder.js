import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Aux from "../../hoc/Auxillay/Auxillary";
import Modal from "../../components/UI/Modal/Modal";
import BurgerOrderSummary from "../../components/Burger/BurgerOrderSummary/BurgerOrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import errorHandler from "../../hoc/ErrorHandler/ErrorHandler";
import * as actionCreators from "../../store/actions/actions";
const BurgerBuilder = (props) => {
    const [shownModal, setShownModal] = useState(false);

    const ings = useSelector((state) => state.burgerBuilder.ingredients);
    const price = useSelector((state) => state.burgerBuilder.totPrice);
    const error = useSelector((state) => state.burgerBuilder.error);
    const auth = useSelector((state) => state.auth.token);

    const dispatch = useDispatch();
    const onAddIngredient = (ingredient) =>
        dispatch(actionCreators.addIngredients({ ingredient: ingredient }));
    const onRemoveIngredient = (ingredient) =>
        dispatch(actionCreators.removeIngredients({ ingredient: ingredient }));
    const onInitIngredients = () => dispatch(actionCreators.initIngredients());
    const onPurchaseSuccess = () => dispatch(actionCreators.redirect());
    useEffect(() => {
        onInitIngredients();
    }, []);
    const updatePurchaseBtn = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map((key) => ingredients[key])
            .reduce((init, cur) => init + cur, 0);

        return sum > 0;
    };

    const openModalHandler = () => {
        if (auth) {
            setShownModal(true);
        } else {
            props.history.push("/auth");
        }
    };
    const closeModalHandler = () => {
        setShownModal(false);
    };
    const successOrderHandler = () => {
        onPurchaseSuccess();
        props.history.push("/checkout");
    };

    const disableInfo = {
        ...ings,
    };

    for (let key in disableInfo) {
        disableInfo[key] = disableInfo[key] <= 0;
    }
    let orderSummary = null;
    let burger = error ? (
        <p style={{ textAlign: "center", color: "red" }}>Something went wrong!</p>
    ) : (
        <Spinner />
    );
    if (ings) {
        burger = (
            <Aux>
                <Burger ingredients={ings} />
                <BuildControls
                    addIngredients={onAddIngredient}
                    removeIngredients={onRemoveIngredient}
                    disabled={disableInfo}
                    price={price}
                    purchases={updatePurchaseBtn(ings)}
                    click={openModalHandler}
                    auth={auth}
                />
            </Aux>
        );
        orderSummary = (
            <BurgerOrderSummary
                ingredients={ings}
                closeModal={closeModalHandler}
                successOrder={successOrderHandler}
                price={price}
            />
        );
    }

    return (
        <Aux>
            <Modal show={shownModal} closeModal={closeModalHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </Aux>
    );
};

export default errorHandler(BurgerBuilder, axios);
