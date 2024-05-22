import React, { createContext, useState, useContext, useEffect } from 'react';

// Create a context
export const CardContext = createContext();

export const CardContextProvider = ( {children } ) => {
  const [phase, setPhase] = useState(0);
  return (
    <CardContext.Provider value={{ phase, setPhase }}>
      {children }
    </CardContext.Provider>
  );
};

export const useCard = () => useContext(CardContext);
