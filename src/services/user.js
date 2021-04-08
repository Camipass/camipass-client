import axios from "axios";

const { REACT_APP_SERVER_ADDRESS } = process.env;
export let User = {
    signup: (data) => {
        return axios.post(`${REACT_APP_SERVER_ADDRESS}/users/make`, data);
    },
    login: (data) => {
        return axios.post(`${REACT_APP_SERVER_ADDRESS}/auth/login`, data);
    }
};
