import React, { useState, useContext, createContext } from "react";
import {User} from "../services/user";
import swal from "sweetalert2";

const authContext = createContext();

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
    return useContext(authContext);
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
    const [user, setUser] = useState(null);

    // Wrap any Firebase methods we want to use making sure ...
    // ... to save the user to state.
    const signin = (email, password) => {
        let user = {
            email: email,
            password: password
        };
        return User.login(user).then(response => {
                setUser(response.user);
                return response.user;
            });
    };

    const signup = (username, email, password, color) => {
        let user = {
            username: username,
            email: email,
            password: password,
            color: color
        }
        return User.signin(user)
            .then(response => {
                swal.fire({
                    titleText: "Registrazione completata!",
                    text: "Benvenuto nel mondo Camipass!",
                    icon: "success",
                    background: "#393B41",
                    confirmButtonColor: '#F95F72'
                });
                setUser(response.user);
                window.location = "/"
                return response.user;
            })
            .catch(err => {
                if (err.response.status === 410)
                    swal.fire({
                        titleText: "Username già esistente",
                        text: "Qualcuno è arrivato prima di te :-/",
                        icon: "error",
                        background: "#393B41",
                        confirmButtonColor: '#F95F72'
                    });
                else if (err.response.status === 411)
                    swal.fire({
                        title: "Email già esistente",
                        text: "L'indirizzo email è stato già usato. Prova a entrare con quella email.",
                        icon: "error",
                        background: "#393B41",
                        confirmButtonColor: '#F95F72'
                    });
                else swal.fire({
                        titleText: "Qualcosa è andato storto :-/",
                        text: "Aggiorna la pagina e riprova.",
                        icon: "error",
                        background: "#393B41",
                        confirmButtonColor: '#F95F72'
                    });
            });
    };

    const signout = () => {
        // return firebase
        //     .auth()
        //     .signOut()
        //     .then(() => {
        //         setUser(false);
        //     });
    };

    const sendPasswordResetEmail = email => {
        // return firebase
        //     .auth()
        //     .sendPasswordResetEmail(email)
        //     .then(() => {
        //         return true;
        //     });
    };

    const confirmPasswordReset = (code, password) => {
        // return firebase
        //     .auth()
        //     .confirmPasswordReset(code, password)
        //     .then(() => {
        //         return true;
        //     });
    };

    // Return the user object and auth methods
    return {
        user,
        signin,
        signup,
        signout,
        sendPasswordResetEmail,
        confirmPasswordReset
    };
}