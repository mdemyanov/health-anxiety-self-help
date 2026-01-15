import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';
import React from 'react';

// ====== localStorage Mock ======
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: vi.fn((key) => store[key] ?? null),
    setItem: vi.fn((key, value) => {
      store[key] = String(value);
    }),
    removeItem: vi.fn((key) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
    get length() {
      return Object.keys(store).length;
    },
    key: vi.fn((index) => Object.keys(store)[index] ?? null),
    // Helper for tests
    __getStore: () => store,
    __setStore: (newStore) => {
      store = newStore;
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// ====== navigator.vibrate Mock ======
Object.defineProperty(navigator, 'vibrate', {
  value: vi.fn(() => true),
  writable: true,
});

// ====== matchMedia Mock (for theme detection) ======
// Use a function that always returns the same structure to avoid issues with vi.clearAllMocks()
window.matchMedia = (query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
});

// ====== scrollIntoView Mock (used in ChatContainer) ======
Element.prototype.scrollIntoView = vi.fn();

// ====== requestAnimationFrame Mock ======
global.requestAnimationFrame = vi.fn((cb) => setTimeout(cb, 0));
global.cancelAnimationFrame = vi.fn((id) => clearTimeout(id));

// ====== IntersectionObserver Mock ======
class IntersectionObserverMock {
  constructor(callback) {
    this.callback = callback;
  }
  observe() {}
  unobserve() {}
  disconnect() {}
}
global.IntersectionObserver = IntersectionObserverMock;

// ====== ResizeObserver Mock ======
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}
global.ResizeObserver = ResizeObserverMock;

// ====== Framer Motion Mock ======
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion');
  return {
    ...actual,
    motion: {
      div: React.forwardRef(({ children, initial, animate, exit, transition, whileHover, whileTap, variants, ...rest }, ref) => (
        React.createElement('div', { ref, 'data-testid': 'motion-div', ...rest }, children)
      )),
      span: React.forwardRef(({ children, initial, animate, exit, transition, ...rest }, ref) => (
        React.createElement('span', { ref, 'data-testid': 'motion-span', ...rest }, children)
      )),
      button: React.forwardRef(({ children, initial, animate, exit, transition, whileHover, whileTap, ...rest }, ref) => (
        React.createElement('button', { ref, 'data-testid': 'motion-button', ...rest }, children)
      )),
      p: React.forwardRef(({ children, initial, animate, exit, transition, ...rest }, ref) => (
        React.createElement('p', { ref, 'data-testid': 'motion-p', ...rest }, children)
      )),
      svg: React.forwardRef(({ children, initial, animate, exit, transition, ...rest }, ref) => (
        React.createElement('svg', { ref, 'data-testid': 'motion-svg', ...rest }, children)
      )),
      circle: React.forwardRef(({ children, initial, animate, exit, transition, ...rest }, ref) => (
        React.createElement('circle', { ref, 'data-testid': 'motion-circle', ...rest }, children)
      )),
    },
    AnimatePresence: ({ children }) => React.createElement(React.Fragment, null, children),
    useAnimation: () => ({
      start: vi.fn(),
      stop: vi.fn(),
      set: vi.fn(),
    }),
    useMotionValue: (initial) => ({
      get: () => initial,
      set: vi.fn(),
      onChange: vi.fn(),
    }),
    useTransform: () => ({
      get: () => 0,
    }),
  };
});

// ====== Reset before each test ======
beforeEach(() => {
  localStorageMock.clear();
  localStorageMock.__setStore({});
  vi.clearAllMocks();
});

// ====== Cleanup after each test ======
afterEach(() => {
  vi.clearAllTimers();
});
