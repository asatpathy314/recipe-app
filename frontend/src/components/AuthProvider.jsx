import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [email, setEmail] = useState(() => localStorage.getItem('token') || '');
    const [userID, setUserID] = useState(() => localStorage.getItem('email') || '');

    useEffect(() => {
        localStorage.setItem('email', email);
    }, [email]);

    useEffect(() => {
        localStorage.setItem('userID', userID);
    }, [userID]);

    const logout = () => {
        setEmail('');
        setUserID('');
        localStorage.clear();
        window.location.href='/';
    };

    return (
        <AuthContext.Provider value={{ email, setEmail, userID, setUserID, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;