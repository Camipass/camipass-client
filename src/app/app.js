import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import { ProvideAuth } from "./auth";
import PrivateRoute from "./privateRoute";
import Home from "../pages/home";
import AuthLogin from "../pages/login/authLogin";
import AuthSignup from "../pages/signup/authSignup";
import Rooms from "../pages/rooms";
import Account from "../pages/account";

import NavBar from "../components/navbar";

export default function App() {
    return (
        <ProvideAuth>
            <Router>
                <div>
                    <NavBar/>

                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/login" component={AuthLogin} />
                        <Route exact path="/signup" component={AuthSignup} />
                        <PrivateRoute exact path="/rooms">
                            <Rooms />
                        </PrivateRoute>
                        <PrivateRoute exact path="/account">
                            <Account />
                        </PrivateRoute>
                    </Switch>
                </div>
            </Router>
        </ProvideAuth>
    );
}