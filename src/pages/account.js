import React from 'react';
import '../style/style.css';
import {useAuth} from "../app/auth";

export default function Account() {
    const auth = useAuth();
    return (
        <h2>Account</h2>
    );
}