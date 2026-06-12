import React, { createContext, useContext, useState, useEffect } from 'react';

const ColorModeContext = createContext();

export const useColorMode = () => useContext(ColorModeContext);

export const ColorModeProvider = ({ children }) => {
  const [isLightMode, setIsLightMode] = useState(() => {
    const saved = localStorage.getItem('app-theme');
    return saved === 'light';
  });

  useEffect(() => {
    localStorage.setItem('app-theme', isLightMode ? 'light' : 'dark');
    if (isLightMode) {
      document.body.style.backgroundColor = '#f8fafc';
    } else {
      document.body.style.backgroundColor = '#04060f';
    }
  }, [isLightMode]);

  const toggleMode = () => setIsLightMode(prev => !prev);

  return (
    <ColorModeContext.Provider value={{ isLightMode, toggleMode }}>
      {children}
    </ColorModeContext.Provider>
  );
};
