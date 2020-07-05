import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./ContactData.css";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import axios from "../../../axios-orders";
import Input from "../../../components/UI/Input/Input";
import ErrorHandler from "../../../hoc/ErrorHandler/ErrorHandler";
import * as actions from "../../../store/actions/actions";
import { checkInputValidation } from "../../../shared/utils";
class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Your Name",
                },
                value: "",
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            email: {
                elementType: "input",
                elementConfig: {
                    type: "email",
                    placeholder: "Your Email",
                },
                value: "",
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            street: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Street",
                },
                value: "",
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            zipcode: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "ZIP Code",
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                },
                valid: false,
                touched: false,
            },
            city: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Your City",
                },
                value: "",
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },

            deliveryMethod: {
                elementType: "select",
                elementConfig: {
                    options: [
                        { value: "fastest", displayValue: "Fastest" },
                        { value: "cheapest", displayValue: "cheapest" },
                    ],
                },
                value: "fastest",
                validation: {},
                valid: true,
            },
        },

        validForm: false,
        error: false,
    };
    orderHandler = async (event) => {
        event.preventDefault();

        const formData = {};
        for (let key in this.state.orderForm) {
            formData[key] = this.state.orderForm[key].value;
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            customerData: formData,
            userId: this.props.userId,
        };
        if (this.props.token) {
            this.props.onOrderBurger(order, this.props.token);
        }
    };

    inputChangeHandler = (event, inputelement) => {
        const updatedOrderForm = {
            ...this.state.orderForm,
        };
        const updatedFormElement = { ...updatedOrderForm[inputelement] };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkInputValidation(
            updatedFormElement.value,
            updatedFormElement.validation
        );
        updatedFormElement.touched = true;

        updatedOrderForm[inputelement] = updatedFormElement;
        let validForm = true;
        for (let key in updatedOrderForm) {
            validForm = updatedOrderForm[key].valid && validForm;
        }

        this.setState({
            orderForm: updatedOrderForm,
            validForm,
        });
    };

    render() {
        let formElements = [];
        for (let key in this.state.orderForm) {
            formElements.push({
                id: key,
                config: this.state.orderForm[key],
            });
        }
        let form = (
            <React.Fragment>
                <h4>Enter your contact data</h4>

                <form onSubmit={this.orderHandler}>
                    {formElements.map((formElement) => (
                        <Input
                            elementType={formElement.config.elementType}
                            key={formElement.id}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            change={(event) => this.inputChangeHandler(event, formElement.id)}
                            invalid={!formElement.config.valid}
                            touched={formElement.config.touched}
                            validation={formElement.config.validation}
                        />
                    ))}
                    <Button type="Success" disable={!this.state.validForm}>
                        Submit
                    </Button>
                </form>
            </React.Fragment>
        );
        if (this.props.load) {
            form = <Spinner />;
        }
        if (this.state.error) {
            form = <p style={{ textAlign: "center", color: "red" }}>Something went wrong!</p>;
        }
        return <div className={classes.ContactData}>{form}</div>;
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totPrice,
        load: state.order.load,
        token: state.auth.token,
        userId: state.auth.userId,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onOrderBurger: (orderdata, token) => dispatch(actions.storeOrder(orderdata, token)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(ContactData, axios));
