import React from 'react';
import Login from "./login";
import {useAuth} from "../../app/auth";

export default function AuthLogin() {
    let auth = useAuth();
    const component = auth.user ? (
            null
            // TODO: non puoi fare login se hai già fatto il login
        ) : (
            <Login auth={auth} />
        );
    return component;
}