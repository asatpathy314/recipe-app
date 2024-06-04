import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
/*
How to use AuthProvider;

import { useContext } from 'react';
import AuthContext from '/path/to/AuthProvider
const { email, setEmail, userID, setUserID, accessToken, setAccessToken, isLoggedIn, setIsLoggedIn  } = useContext(AuthContext);

// Now the variables can be used in your component.
*/


export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [email, setEmail] = useState(() => localStorage.getItem('token') || '');
    const [accessToken, setAccessToken] = useState(() => localStorage.getItem('accessToken') || '');
    const [userID, setUserID] = useState(() => localStorage.getItem('email') || '');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        localStorage.setItem('email', email);
    }, [email]);

    useEffect(() => {
        localStorage.setItem('accessToken', accessToken);
    }, [accessToken]);

    useEffect(() => {
        localStorage.setItem('userID', userID);
    }, [userID]);

    const logout = () => {
        setEmail('');
        setUserID('');
        setAccessToken('');
        setIsLoggedIn(false);
        localStorage.clear();
        window.location.href=('/')
    };

    return (
        <AuthContext.Provider value={{ email, setEmail, userID, setUserID, accessToken, setAccessToken, isLoggedIn, setIsLoggedIn, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;