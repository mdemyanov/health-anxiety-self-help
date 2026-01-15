import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, useTheme } from '../ThemeContext';

// Test component that uses the theme context
function TestComponent() {
  const { isDark, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme-status">{isDark ? 'dark' : 'light'}</span>
      <button onClick={toggleTheme}>Toggle</button>
    </div>
  );
}

describe('ThemeContext', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
    // Reset document class
    document.documentElement.classList.remove('dark');
  });

  describe('ThemeProvider', () => {
    it('should provide theme context to children', () => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      expect(screen.getByTestId('theme-status')).toBeInTheDocument();
    });

    it('should default to light mode when no saved preference', () => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      expect(screen.getByTestId('theme-status')).toHaveTextContent('light');
    });

    it('should use saved dark preference from localStorage', () => {
      localStorage.setItem('theme', 'dark');

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      expect(screen.getByTestId('theme-status')).toHaveTextContent('dark');
    });

    it('should use saved light preference from localStorage', () => {
      localStorage.setItem('theme', 'light');

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      expect(screen.getByTestId('theme-status')).toHaveTextContent('light');
    });
  });

  describe('toggleTheme', () => {
    it('should toggle from light to dark', () => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      expect(screen.getByTestId('theme-status')).toHaveTextContent('light');

      fireEvent.click(screen.getByText('Toggle'));

      expect(screen.getByTestId('theme-status')).toHaveTextContent('dark');
    });

    it('should toggle from dark to light', () => {
      localStorage.setItem('theme', 'dark');

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      expect(screen.getByTestId('theme-status')).toHaveTextContent('dark');

      fireEvent.click(screen.getByText('Toggle'));

      expect(screen.getByTestId('theme-status')).toHaveTextContent('light');
    });

    it('should save theme to localStorage on toggle', () => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      fireEvent.click(screen.getByText('Toggle'));

      expect(localStorage.getItem('theme')).toBe('dark');

      fireEvent.click(screen.getByText('Toggle'));

      expect(localStorage.getItem('theme')).toBe('light');
    });

    it('should trigger haptic feedback on toggle', () => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      fireEvent.click(screen.getByText('Toggle'));

      expect(navigator.vibrate).toHaveBeenCalledWith(10);
    });

    it('should update document class on toggle', () => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      expect(document.documentElement.classList.contains('dark')).toBe(false);

      fireEvent.click(screen.getByText('Toggle'));

      expect(document.documentElement.classList.contains('dark')).toBe(true);

      fireEvent.click(screen.getByText('Toggle'));

      expect(document.documentElement.classList.contains('dark')).toBe(false);
    });
  });

  describe('useTheme hook', () => {
    it('should throw error when used outside ThemeProvider', () => {
      // Suppress console.error for this test
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        render(<TestComponent />);
      }).toThrow('useTheme must be used within ThemeProvider');

      consoleSpy.mockRestore();
    });

    it('should return isDark and toggleTheme', () => {
      let contextValue;

      function ContextCapture() {
        contextValue = useTheme();
        return null;
      }

      render(
        <ThemeProvider>
          <ContextCapture />
        </ThemeProvider>
      );

      expect(contextValue).toHaveProperty('isDark');
      expect(contextValue).toHaveProperty('toggleTheme');
      expect(typeof contextValue.isDark).toBe('boolean');
      expect(typeof contextValue.toggleTheme).toBe('function');
    });
  });

  describe('system preference detection', () => {
    it('should use system preference when no localStorage value', () => {
      // matchMedia is mocked to return false for dark mode by default in setup.js
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      expect(screen.getByTestId('theme-status')).toHaveTextContent('light');
    });
  });
});
