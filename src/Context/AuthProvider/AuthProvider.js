import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import app from '../../firebase/firebase.config';

export const AuthContext = createContext();
const auth = getAuth(app)

const AuthProvider = ({ children }) => {
    const [currentUser, serCurrentUser] = useState(null);

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const logIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logOut = () => {
        return signOut(auth);
    };

    const updateUser = (userInfo) => {
        return updateProfile(currentUser, userInfo);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            serCurrentUser(user);
        });

        return () => unsubscribe();
    }, [])

    const authInfo = {
        createUser,
        logIn,
        logOut,
        currentUser,
        updateUser
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;