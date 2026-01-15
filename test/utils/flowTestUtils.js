import { vi } from 'vitest';
import { act, waitFor } from '@testing-library/react';

/**
 * Advances timers and flushes pending state updates.
 * Call within act() to ensure React state is updated.
 * @param {number} ms - Milliseconds to advance
 */
export async function advanceTimersAndFlush(ms) {
  await act(async () => {
    vi.advanceTimersByTime(ms);
    // Allow promises and microtasks to resolve
    await Promise.resolve();
  });
}

/**
 * Run all pending timers to completion.
 */
export async function runAllTimersAndFlush() {
  await act(async () => {
    vi.runAllTimers();
    await Promise.resolve();
  });
}

/**
 * Helper to wait for a specific number of messages in chat flow.
 * @param {Object} result - renderHook result
 * @param {number} count - Expected message count
 */
export async function waitForMessages(result, count) {
  await waitFor(
    () => {
      expect(result.current.messages.length).toBeGreaterThanOrEqual(count);
    },
    { timeout: 5000 }
  );
}

/**
 * Setup for timer-based tests.
 * Returns cleanup function.
 */
export function setupTimerTests() {
  vi.useFakeTimers();
  return () => {
    vi.useRealTimers();
  };
}

/**
 * Create a minimal flow config for testing
 * @param {Object} overrides - Flow config overrides
 */
export function createTestFlow(overrides = {}) {
  return {
    id: 'test-flow',
    title: 'Test Flow',
    steps: [
      {
        id: 'intro',
        messages: [
          { type: 'therapist-text', content: 'Hello!', delay: 0 },
        ],
      },
    ],
    ...overrides,
  };
}

/**
 * Create a flow step with messages
 * @param {string} id - Step ID
 * @param {Array} messages - Messages array
 */
export function createTestStep(id, messages) {
  return { id, messages };
}

/**
 * Create a therapist message
 * @param {string} content - Message content
 * @param {Object} options - Additional options
 */
export function createTherapistMessage(content, options = {}) {
  return {
    type: 'therapist-text',
    content,
    delay: 0,
    ...options,
  };
}

/**
 * Create a message that awaits user input
 * @param {string} content - Message content
 * @param {string} saveAs - Key to save input as
 * @param {Object} options - Additional options
 */
export function createInputMessage(content, saveAs, options = {}) {
  return {
    type: 'therapist-text',
    content,
    delay: 0,
    awaitInput: {
      placeholder: 'Enter text...',
      saveAs,
      ...options.awaitInput,
    },
    ...options,
  };
}

/**
 * Create a timer message
 * @param {number} duration - Timer duration in seconds
 * @param {Object} options - Additional options
 */
export function createTimerMessage(duration, options = {}) {
  return {
    type: 'timer',
    delay: 0,
    options: {
      duration,
      autoStart: false,
      ...options.options,
    },
    ...options,
  };
}

/**
 * Wait for flow to complete
 * @param {Object} result - renderHook result
 */
export async function waitForFlowComplete(result) {
  await waitFor(
    () => {
      expect(result.current.isComplete).toBe(true);
    },
    { timeout: 10000 }
  );
}

/**
 * Simulate user input in flow
 * @param {Object} result - renderHook result
 * @param {string} text - Text to input
 */
export async function simulateUserInput(result, text) {
  await act(async () => {
    result.current.handleUserInput(text);
    await Promise.resolve();
  });
}

/**
 * Simulate interaction completion (timer, slider, etc.)
 * @param {Object} result - renderHook result
 * @param {string} messageId - Message ID
 * @param {*} data - Completion data
 */
export async function simulateInteractionComplete(result, messageId, data) {
  await act(async () => {
    result.current.handleInteractionComplete(messageId, data);
    await Promise.resolve();
  });
}
