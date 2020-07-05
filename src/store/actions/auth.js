import axios from "axios";
import * as actionTypes from "./actionTypes";

export const startAuth = () => {
    return {
        type: actionTypes.AUTH_START,
    };
};

export const successAuth = (payload) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        payload,
    };
};

export const failAuth = (payload) => {
    return {
        type: actionTypes.AUTH_FAIL,
        payload,
    };
};
export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    localStorage.removeItem("info");
    return {
        type: actionTypes.AUTH_LOGOUT,
    };
};
export const logoutAuth = (payload) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(logout());
        }, payload * 1000);
    };
};
export const auth = (payload, isSignup) => {
    return (dispatch) => {
        dispatch(startAuth());
        const authData = {
            ...payload,
            returnSecureToken: true,
        };

        let url =
            "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDyumWYUmwVcWZ5Htx-MzgXmZTc-CoQtAg";
        if (!isSignup) {
            url =
                "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDyumWYUmwVcWZ5Htx-MzgXmZTc-CoQtAg";
        }
        axios
            .post(url, authData)
            .then((response) => {
                console.log(response.data);
                const expirationTime = new Date(
                    new Date().getTime() + response.data.expiresIn * 1000
                );

                localStorage.setItem("token", response.data.idToken);
                localStorage.setItem("expirationTime", expirationTime);
                localStorage.setItem("info", response.data.localId);
                dispatch(successAuth(response.data));
                dispatch(logoutAuth(response.data.expiresIn));
            })
            .catch((err) => {
                dispatch(failAuth(err.response.data));
            });
    };
};

const deleteAuthData = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    localStorage.removeItem("info");
};
export const initAuth = () => {
    return (dispatch) => {
        const token = localStorage.getItem("token");
        if (!token) {
            deleteAuthData();
            console.log("Ok");
        } else {
            const expirationTime = new Date(localStorage.getItem("expirationTime"));
            if (expirationTime < new Date()) {
                deleteAuthData();
            } else {
                const userId = localStorage.getItem("info");
                dispatch(successAuth({ idToken: token, localId: userId }));
                const expiresIn = (expirationTime - new Date()) / 1000;
                dispatch(logoutAuth(expiresIn));
            }
        }
    };
};
