import axios from "axios";


export let User = {
    signin: (data) => {
        return axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/users/make`, data);
    },
    login: (data) => {
        return axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/auth/login`, data);
    }
};