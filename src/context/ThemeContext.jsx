import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // theme: 'auto' | 'light' | 'dark'
  const [theme, setThemeState] = useState(() => {
    return localStorage.getItem('theme') || 'auto';
  });

  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') return true;
    if (saved === 'light') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Слушаем изменения системной темы
  useEffect(() => {
    if (theme !== 'auto') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => setIsDark(e.matches);

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  // Применяем тему
  useEffect(() => {
    let dark;
    if (theme === 'dark') {
      dark = true;
    } else if (theme === 'light') {
      dark = false;
    } else {
      dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    setIsDark(dark);
    document.documentElement.classList.toggle('dark', dark);
  }, [theme]);

  // Сохраняем тему
  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const setTheme = useCallback((newTheme) => {
    setThemeState(newTheme);
    navigator.vibrate?.(10);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      if (prev === 'auto' || prev === 'light') return 'dark';
      return 'light';
    });
    navigator.vibrate?.(10);
  }, []);

  return (
    <ThemeContext.Provider value={{ isDark, theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
