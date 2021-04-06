import React from "react";
import Signup from "./signup";
import {useAuth} from "../../app/auth";

export default function AuthSignup() {
    const auth = useAuth();
    return (
        <Signup auth={auth} />
    );
}