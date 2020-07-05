import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.css";
import * as actionCreators from "../../store/actions/auth";
import Spinner from "../../components/UI/Spinner/Spinner";
import { checkInputValidation } from "../../shared/utils";
class Auth extends Component {
    state = {
        authForm: {
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
            password: {
                elementType: "input",
                elementConfig: {
                    type: "password",
                    placeholder: "Your Password",
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 6,
                },
                valid: false,
                touched: false,
            },
        },
        isSignup: true,
    };

    inputChangeHandler = (event, inputelement) => {
        const updatedauthForm = {
            ...this.state.authForm,
        };
        const updatedFormElement = { ...updatedauthForm[inputelement] };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkInputValidation(
            updatedFormElement.value,
            updatedFormElement.validation
        );
        updatedFormElement.touched = true;

        updatedauthForm[inputelement] = updatedFormElement;

        this.setState({
            authForm: updatedauthForm,
        });
    };
    authHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let key in this.state.authForm) {
            formData[key] = this.state.authForm[key].value;
        }
        this.props.onAuth(formData, this.state.isSignup);
    };
    switchAuthModeHandler = () => {
        this.setState((prevState) => {
            return {
                isSignup: !prevState.isSignup,
            };
        });
    };
    render() {
        let formElements = [];
        for (let key in this.state.authForm) {
            formElements.push({
                id: key,
                config: this.state.authForm[key],
            });
        }
        let error = null;
        if (this.props.error) {
            error = <p style={{ textAlign: "center", color: "red" }}>{this.props.error}</p>;
        }
        let redirect = null;
        if (this.props.auth) {
            if (this.props.buildingBurger) {
                redirect = <Redirect to="/checkout" />;
            } else {
                redirect = <Redirect to="/" />;
            }
        }

        let form = (
            <React.Fragment>
                {redirect}
                <h4>Sign {this.state.isSignup ? "Up" : "In"} Here</h4>
                {error}
                <form onSubmit={this.authHandler}>
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
                    <Button type="Success"> {this.state.isSignup ? "SIGN UP" : "LOGIN"}</Button>
                </form>
                <Button type="Danger" click={this.switchAuthModeHandler}>
                    {this.state.isSignup ? "SWITCH TO SIGNIN" : "SWITCH TO SIGNUP"}
                </Button>
            </React.Fragment>
        );
        if (this.props.loading) {
            form = <Spinner />;
        }
        return <div className={classes.Auth}>{form}</div>;
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        auth: state.auth.token,
        buildingBurger: state.burgerBuilder.buildingBurger,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (payload, isSignup) => dispatch(actionCreators.auth(payload, isSignup)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
