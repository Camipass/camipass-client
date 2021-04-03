import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import ProvideAuth from "./auth";
import Home from "../pages/home";
import Login from "../pages/login";
import Signin from "../pages/signin";
import Rooms from "../pages/rooms";
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
                    </Switch>
                </div>
            </Router>
        </ProvideAuth>
    );
}