import axios from "axios";

const instance = axios.create({
    baseURL: "https://burger-builder-670e1.firebaseio.com/",
});

export default instance;
