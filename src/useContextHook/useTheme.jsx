import React, { useContext, createContext, useState } from "react";

const ThemeContexts = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeContexts);

export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleTheme = () => {
        setIsDarkMode((prevMode) => !prevMode);
    };

    return (
        <ThemeContexts.Provider value={{ toggleTheme, isDarkMode }}>
            {children}
        </ThemeContexts.Provider>
    );
};
