import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import { ProvideAuth } from "./auth";
import Home from "../pages/home";
import Login from "../pages/login";
import Signin from "../pages/signin";
import Rooms from "../pages/rooms";
import Account from "../pages/account";
import Signout from "../pages/signout";

import NavBar from "../components/navbar";

export default function App() {
    return (
        <ProvideAuth>
            <Router>
                <div>
                    <NavBar/>

                    <Switch>
                        <Route path="/rooms">
                            <Rooms />
                        </Route>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route path="/signin">
                            <Signin />
                        </Route>
                        <Route path="/">
                            <Home />
                        </Route>
                        <Route path="/account">
                            <Account />
                        </Route>
                        <Route path="/signout">
                            <Signout />
                        </Route>
                    </Switch>
                </div>
            </Router>
        </ProvideAuth>
    );
}