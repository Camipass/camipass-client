import React from 'react';
import '../style/style.css';
import { Link } from "react-router-dom";
import { useAuth } from "../config/auth";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function NavBar() {
    const auth = useAuth();

    return (
        <nav className="navbar is-dark is-fixed-top" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a className="navbar-item" href="/">
                    <img src={"/icons/logo/logo_large.png"} alt="Camipass Logo"/>
                </a>
                <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false"
                   data-target="navbarBasicExample" href="javascript:void(0);">
                    <span aria-hidden="true"/>
                    <span aria-hidden="true"/>
                    <span aria-hidden="true"/>
                </a>
            </div>

            <div className="navbar-menu">
                <div className="navbar-start">
                    <Link className="navbar-item" to="/">Home</Link>
                    <Link className="navbar-item" to="/rooms">Room</Link>
                </div>
                { auth.user ? (
                    <div className="navbar-end">
                        <Link className="navbar-item" to="/account">
                            <FontAwesomeIcon icon={faUser} size="2x"/> ({auth.user.email})</Link>
                        <Link className="navbar-item nav-button is-light is-secondary" to="/signout">Disconnetti</Link>
                    </div>
                ) : (
                    <div className="navbar-end">
                        <Link className="navbar-item nav-button is-primary" to="/login">Login</Link>
                        <Link className="navbar-item nav-button is-light is-secondary" to="/signin">Sign In</Link>
                    </div>
                )
                }
            </div>
        </nav>

    );
}