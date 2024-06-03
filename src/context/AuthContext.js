import React, { createContext, useState, useContext, useEffect } from 'react';

// Create a context
export const AuthContext = createContext();

export const AuthContextProvider = ( {children } ) => {
  const [authentication, setAuthentication] = useState(null);
 
  return (
    <AuthContext.Provider value={{ authentication, setAuthentication }}>
      {children }
    </AuthContext.Provider>
  );
};

const _useAuth = (authContext) => {
  const {authentication, setAuthentication} = useContext(authContext)

  const setAuthenticationToLocalStorage = (token) => {
    localStorage.setItem('access_token', token.access_token);
    setAuthentication(token);
  }

  const authenticationFromLocalStorage = () => {
    let token = authentication();
    if (token === null) 
      token = localStorage.getItem('access_token');
    return token;
  }

  return {
    authentication: authenticationFromLocalStorage,
    setAuthentication: setAuthenticationToLocalStorage
  }
}

export const isAuthenticationValid = () => {
  return (typeof localStorage.getItem('access_token') === 'string' && localStorage.getItem('access_token') !== '');
}

export const useAuth = () => _useAuth(AuthContext);
