import React from "react";
import Signin from "./signin";
import {useAuth} from "../../app/auth";

export default function AuthSignin() {
    const auth = useAuth();
    return (
        <Signin auth={auth} />
    );
}