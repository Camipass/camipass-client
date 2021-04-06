import React from 'react';
import '../style/style.css';
import {useAuth} from "../app/auth";

export default function Home() {
    const {user} = useAuth();
    console.log(user);
    return (
        <h2>HOME</h2>
    );
}