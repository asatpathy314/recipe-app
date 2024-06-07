import { createContext, useState, useEffect } from "react";

/*
How to use AuthProvider;

import { useContext } from 'react';
import AuthContext from '/path/to/AuthProvider
const { email, setEmail, userID, setUserID, accessToken, setAccessToken, isLoggedIn, setIsLoggedIn  } = useContext(AuthContext);

// Now the variables can be used in your component.
*/

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [email, setEmail] = useState(() => localStorage.getItem("email") || "");
  const [accessToken, setAccessToken] = useState(
    () => localStorage.getItem("accessToken") || ""
  );
  const [userID, setUserID] = useState(
    () => localStorage.getItem("userID") || ""
  );
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem("isLoggedIn") || ""
  );

  useEffect(() => {
    localStorage.setItem("email", email);
  }, [email]);

  useEffect(() => {
    localStorage.setItem("accessToken", accessToken);
  }, [accessToken]);

  useEffect(() => {
    localStorage.setItem("userID", userID);
  }, [userID]);

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider
      value={{
        email,
        setEmail,
        userID,
        setUserID,
        accessToken,
        setAccessToken,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
