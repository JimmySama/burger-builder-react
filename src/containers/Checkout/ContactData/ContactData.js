import React, { Component } from "react";
import classes from "./ContactData.css";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import axios from "../../../axios-orders";
import Input from "../../../components/UI/Input/Input";
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
            },

            street: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Street",
                },
                value: "",
            },
            zipcode: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "ZIP Code",
                },
                value: "",
            },
            country: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Your Country",
                },
                value: "",
            },

            email: {
                elementType: "input",
                elementConfig: {
                    type: "email",
                    placeholder: "Your Email",
                },
                value: "",
            },

            deliveryMethod: {
                elementType: "select",
                elementConfig: {
                    options: [
                        { value: "fastest", displayValue: "Fastest" },
                        { value: "cheapest", displayValue: "cheapest" },
                    ],
                },
            },
        },
        loading: false,
    };
    orderHandler = async (event) => {
        event.preventDefault();
        try {
            this.setState({
                loading: true,
            });
            const order = {
                ingredients: this.props.ingredients,
                price: this.props.totPrice,
            };

            await axios.post("/orders.json", order);
            this.setState({
                loading: false,
            });

            this.props.history.push("/");
        } catch (err) {
            this.setState({
                loading: false,
            });
            console.log(err);
        }
    };
    render() {
        let form = (
            <React.Fragment>
                <h4>Enter your contact data</h4>
                <form>
                    <Input inputelement="input" type="text" placeholder="Your Name" name="name" />
                    <Input
                        inputelement="input"
                        type="email"
                        placeholder="Your Email"
                        name="email"
                    />
                    <Input inputelement="input" type="text" placeholder="Street" name="street" />
                    <Input
                        inputelement="input"
                        type="text"
                        placeholder="Postal Code"
                        name="postalCode"
                    />
                    <Button type="Success" click={this.orderHandler}>
                        Submit
                    </Button>
                </form>
            </React.Fragment>
        );
        if (this.state.loading) {
            form = <Spinner />;
        }
        return <div className={classes.ContactData}>{form}</div>;
    }
}

export default ContactData;
