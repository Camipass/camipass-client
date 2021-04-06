import React from 'react';
import '../style/style.css';
import { Link } from "react-router-dom";
import { useAuth } from "../app/auth";
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
                <span role="button" className="navbar-burger" aria-label="menu" aria-expanded="false"
                   data-target="navbarBasicExample" >
                    <span aria-hidden="true"/>
                    <span aria-hidden="true"/>
                    <span aria-hidden="true"/>
                </span>
            </div>

            <div className="navbar-menu">
                <div className="navbar-start">
                    <Link className="navbar-item" to="/">Home</Link>
                    <Link className="navbar-item" to="/rooms">Room</Link>
                </div>
                { auth.user ? (
                    <div className="navbar-end">
                        <Link className="navbar-item" to="/account">
                            <FontAwesomeIcon icon={faUser} size="1x" style={{color: auth.user.color}}/>&nbsp; {auth.user.username} &nbsp;</Link>
                        <span className="navbar-item nav-button is-success" onClick={() => auth.signout()}>Disconnetti</span>
                    </div>
                ) : (
                    <div className="navbar-end">
                        <Link className="navbar-item nav-button is-primary" to="/login">Log In</Link>
                        <Link className="navbar-item nav-button is-success" to="/signup">Sign Up</Link>
                    </div>
                )
                }
            </div>
        </nav>

    );
}