import React from "react";
import Signup from "./signup";
import {useAuth} from "../../app/auth";

export default function AuthSignup() {
    const auth = useAuth();
    const component = auth.user ? (
        null
        // TODO: non puoi registrarti se hai già fatto il login
    ) : (
        <Signup auth={auth} />
    );
    return component;
}