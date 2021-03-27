import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import ProvideAuth from "./auth";
import Home from "../components/home";
import Login from "../components/login";
import Signin from "../components/signin";
import Rooms from "../components/rooms";

export default function App() {
    return (
        <ProvideAuth>
            <Router>
                <div>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/rooms">Room</Link>
                            </li>
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                            <li>
                                <Link to="/signin">Sign In</Link>
                            </li>
                        </ul>
                    </nav>

                    {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
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