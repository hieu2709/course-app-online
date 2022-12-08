import React from 'react';
import { useState, createContext } from 'react';
const ThemeContext = createContext();
function ThemeProvider({ children }) {
  const [isLight, setTheme] = useState(true);
  const light = {
    bg: 'white',
    text: 'black',
    bgInput: 'gray-light',
    bgItem: 'white',
  };
  const dark = {
    bg: 'black',
    text: 'white',
    bgInput: 'gray-dark',
    bgItem: 'black-light',
  };
  const theme = isLight ? light : dark;
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
export { ThemeContext, ThemeProvider };
