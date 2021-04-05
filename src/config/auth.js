import React, { useState, useContext, createContext } from "react";

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
        // return firebase
        //     .auth()
        //     .signInWithEmailAndPassword(email, password)
        //     .then(response => {
        //         setUser(response.user);
        //         return response.user;
        //     });
    };

    const signup = (email, password) => {
        // return firebase
        //     .auth()
        //     .createUserWithEmailAndPassword(email, password)
        //     .then(response => {
        //         setUser(response.user);
        //         return response.user;
        //     });
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