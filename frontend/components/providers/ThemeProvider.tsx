// Component Type: Manual
// Theme provider for dark mode support - Fixed to default to light theme

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Theme, ThemeContextType, getSystemTheme, applyTheme } from '../../lib/theme';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>('light');
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Always default to light theme
    const savedTheme = localStorage.getItem('admybrand-theme') as Theme;
    if (savedTheme && savedTheme === 'dark') {
      // Override any saved dark theme to light
      setTheme('light');
      localStorage.setItem('admybrand-theme', 'light');
    } else {
      setTheme('light');
    }
  }, []);

  useEffect(() => {
    // Always apply light theme
    setIsDark(false);
    applyTheme('light');
    
    // Save to localStorage
    localStorage.setItem('admybrand-theme', 'light');
  }, [theme]);

  const value: ThemeContextType = {
    theme: 'light',
    setTheme: () => {}, // Disable theme switching
    isDark: false
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}
