import React, { createContext, useState, useContext, useEffect } from 'react';

// Create a context
export const AuthContext = createContext();

export const AuthContextProvider = ( {children } ) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Mock function to check authentication status
  const checkAuth = () => {
    // Replace this with real authentication check
    //const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(false);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children }
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
