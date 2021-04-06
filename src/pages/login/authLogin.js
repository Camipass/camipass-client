import React from 'react';
import Login from "./login";
import {useAuth} from "../../app/auth";

export default function AuthLogin() {
    const auth = useAuth();
    return (
        <Login auth={auth} />
    );
}