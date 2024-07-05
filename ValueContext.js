import React, { useState, createContext, useContext } from 'react';

export const ValueContext = createContext(null);

export const ValueProvider = ({ value, children }) => {
  const [currentValue, setCurrentValue] = useState(value);
  const [budget, setBudget] = useState(value); // Assuming 'value' is passed correctly

  return (
    <ValueContext.Provider value={{ currentValue, setCurrentValue, budget, setBudget }}>
      {children}
    </ValueContext.Provider>
  );
};

export const useValue = () => useContext(ValueContext);

