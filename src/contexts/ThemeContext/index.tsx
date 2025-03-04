import React, { createContext, useContext, useEffect } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { setTheme } from '../../store/theme/actions';
import { useLocation } from 'react-router-dom';

interface ThemeContextProps {
    toggleTheme: () => void;
}

const lightTheme = {
    colors: {
        primary: '#007bff',
        background: '#ffffff',
        text: '#333333',
        secondary: '#6c757d',
        border: '#dee2e6',
        headerBackground: '#f8f9fa',
        cardBackground: '#ffffff',
        buttonBackground: '#007bff',
        buttonText: '#ffffff',
        navBackground: '#ffffff',
        navText: '#333333',
        footerBackground: '#f8f9fa',
        footerText: '#6c757d',
        inputBackground: '#ffffff',
        inputText: '#333333',
        inputBorder: '#dee2e6'
    }
};

const darkTheme = {
    colors: {
        primary: '#0d6efd',
        background: '#121212',
        text: '#ffffff',
        secondary: '#adb5bd',
        border: '#343a40',
        headerBackground: '#1a1a1a',
        cardBackground: '#1e1e1e',
        buttonBackground: '#0d6efd',
        buttonText: '#ffffff',
        navBackground: '#1a1a1a',
        navText: '#ffffff',
        footerBackground: '#1a1a1a',
        footerText: '#adb5bd',
        inputBackground: '#1e1e1e',
        inputText: '#ffffff',
        inputBorder: '#343a40'
    }
};

const ThemeContext = createContext<ThemeContextProps>({
    toggleTheme: () => {
        console.log('Theme toggle not yet initialized');
    }
});

export const ThemeContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const dispatch = useDispatch();
    const themeMode = useSelector((state: any) => state.theme.mode);
    const location = useLocation();

    const currentTheme = themeMode === 'dark' ? darkTheme : lightTheme;

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            dispatch(setTheme(savedTheme as 'light' | 'dark'));
        }
    }, [dispatch]);

    // Set data-theme attribute on the root element
    useEffect(() => {
        const root = document.documentElement;
        root.setAttribute('data-theme', themeMode);
    }, [themeMode]);

    const toggleTheme = () => {
        const newTheme = themeMode === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
        dispatch(setTheme(newTheme));
    };

    return (
        <ThemeContext.Provider value={{ toggleTheme }}>
            <StyledThemeProvider theme={currentTheme}>
                {children}
            </StyledThemeProvider>
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);