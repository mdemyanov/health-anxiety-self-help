import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '../../src/context/ThemeContext';

/**
 * Render with all app providers (ThemeProvider, Router)
 * @param {React.ReactElement} ui - Component to render
 * @param {Object} options - Render options
 * @param {string} options.route - Initial route (default: '/')
 * @param {string[]} options.initialEntries - For MemoryRouter
 * @param {boolean} options.useMemoryRouter - Use MemoryRouter instead of BrowserRouter
 */
export function renderWithProviders(ui, options = {}) {
  const {
    route = '/',
    initialEntries,
    useMemoryRouter = false,
    ...renderOptions
  } = options;

  if (!useMemoryRouter) {
    window.history.pushState({}, 'Test page', route);
  }

  const Router = useMemoryRouter ? MemoryRouter : BrowserRouter;
  const routerProps = useMemoryRouter && initialEntries ? { initialEntries } : {};

  function Wrapper({ children }) {
    return (
      <ThemeProvider>
        <Router {...routerProps}>{children}</Router>
      </ThemeProvider>
    );
  }

  return {
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}

/**
 * Render with only Router (no ThemeProvider)
 */
export function renderWithRouter(ui, options = {}) {
  const { route = '/', ...renderOptions } = options;
  window.history.pushState({}, 'Test page', route);

  function Wrapper({ children }) {
    return <BrowserRouter>{children}</BrowserRouter>;
  }

  return {
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}

/**
 * Render with only ThemeProvider (no Router)
 */
export function renderWithTheme(ui, options = {}) {
  function Wrapper({ children }) {
    return <ThemeProvider>{children}</ThemeProvider>;
  }

  return {
    ...render(ui, { wrapper: Wrapper, ...options }),
  };
}

// Re-export everything from testing-library
export * from '@testing-library/react';
