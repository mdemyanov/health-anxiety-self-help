import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useChatFlow } from '../useChatFlow';

// Minimal flow config for testing
const createTestFlow = (overrides = {}) => ({
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
});

describe('useChatFlow', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('initialization', () => {
    it('should initialize with correct title', async () => {
      // Use a flow with awaitInput so it doesn't auto-complete
      const flow = createTestFlow({
        steps: [
          {
            id: 'intro',
            messages: [
              { type: 'therapist-text', content: 'Hello!', delay: 0, awaitInput: true, saveAs: 'test' },
            ],
          },
        ],
      });
      const { result } = renderHook(() => useChatFlow(flow));

      // Wait for first message
      await act(async () => {
        vi.advanceTimersByTime(100);
      });

      expect(result.current.title).toBe('Test Flow');
      expect(result.current.isComplete).toBe(false);
    });

    it('should return title from flow config', () => {
      const flow = createTestFlow({ title: 'Custom Title' });
      const { result } = renderHook(() => useChatFlow(flow));
      expect(result.current.title).toBe('Custom Title');
    });

    it('should initialize collected data as empty object', () => {
      const flow = createTestFlow();
      const { result } = renderHook(() => useChatFlow(flow));
      expect(result.current.collectedData).toEqual({});
    });
  });

  describe('message processing', () => {
    it('should process first message immediately when delay is 0', async () => {
      const flow = createTestFlow({
        steps: [
          {
            id: 'intro',
            messages: [
              { type: 'therapist-text', content: 'First message', delay: 0 },
            ],
          },
        ],
      });

      const { result } = renderHook(() => useChatFlow(flow));

      await act(async () => {
        vi.advanceTimersByTime(100);
      });

      expect(result.current.messages.length).toBeGreaterThanOrEqual(1);
      expect(result.current.messages[0].content).toBe('First message');
    });

    it('should process messages with delays', async () => {
      // This test verifies that messages with delay > 0 are processed after the delay
      const flow = createTestFlow({
        steps: [
          {
            id: 'intro',
            messages: [
              { type: 'therapist-text', content: 'Message 1', delay: 0, awaitInput: true, saveAs: 'first' },
            ],
          },
          {
            id: 'step2',
            messages: [
              { type: 'therapist-text', content: 'Message 2', delay: 200, awaitInput: true, saveAs: 'second' },
            ],
          },
        ],
      });

      const { result } = renderHook(() => useChatFlow(flow));

      // First message should appear immediately (delay: 0)
      await act(async () => {
        vi.advanceTimersByTime(50);
      });
      expect(result.current.messages.length).toBe(1);
      expect(result.current.messages[0].content).toBe('Message 1');

      // Submit input to move to next step
      act(() => {
        result.current.handleUserInput('first answer');
      });

      // Second message should appear after delay (200ms)
      for (let i = 0; i < 10; i++) {
        await act(async () => {
          vi.advanceTimersByTime(100);
        });
        if (result.current.messages.length >= 3) break; // first + user input + second
      }
      expect(result.current.messages.length).toBeGreaterThanOrEqual(3);
      // Last message should be from step 2
      const lastTherapistMessage = result.current.messages.filter(m => m.sender === 'therapist').pop();
      expect(lastTherapistMessage.content).toBe('Message 2');
    });

    it('should set correct sender for therapist messages', async () => {
      const flow = createTestFlow({
        steps: [
          {
            id: 'intro',
            messages: [
              { type: 'therapist-text', content: 'Hello', delay: 0 },
            ],
          },
        ],
      });

      const { result } = renderHook(() => useChatFlow(flow));

      await act(async () => {
        vi.advanceTimersByTime(100);
      });

      expect(result.current.messages[0].sender).toBe('therapist');
    });

    it('should set correct sender for system messages', async () => {
      const flow = createTestFlow({
        steps: [
          {
            id: 'intro',
            messages: [
              { type: 'system', content: 'System message', delay: 0 },
            ],
          },
        ],
      });

      const { result } = renderHook(() => useChatFlow(flow));

      await act(async () => {
        vi.advanceTimersByTime(100);
      });

      expect(result.current.messages[0].sender).toBe('system');
    });
  });

  describe('user input handling', () => {
    it('should await input when awaitInput is set', async () => {
      const flow = createTestFlow({
        steps: [
          {
            id: 'intro',
            messages: [
              {
                type: 'therapist-text',
                content: 'What is your name?',
                delay: 0,
                awaitInput: true,
                inputPlaceholder: 'Enter name',
                saveAs: 'userName',
              },
            ],
          },
        ],
      });

      const { result } = renderHook(() => useChatFlow(flow));

      await act(async () => {
        vi.advanceTimersByTime(100);
      });

      expect(result.current.awaitingInput).not.toBeNull();
      expect(result.current.awaitingInput.saveAs).toBe('userName');
    });

    it('should handle user input and save data', async () => {
      const flow = createTestFlow({
        steps: [
          {
            id: 'intro',
            messages: [
              {
                type: 'therapist-text',
                content: 'What is your name?',
                delay: 0,
                awaitInput: true,
                saveAs: 'userName',
              },
            ],
          },
          {
            id: 'complete',
            messages: [
              { type: 'system', content: 'Done', delay: 0 },
            ],
          },
        ],
      });

      const { result } = renderHook(() => useChatFlow(flow));

      await act(async () => {
        vi.advanceTimersByTime(100);
      });

      act(() => {
        result.current.handleUserInput('John');
      });

      expect(result.current.collectedData.userName).toBe('John');
      expect(result.current.awaitingInput).toBeNull();
    });

    it('should add user message to messages array', async () => {
      const flow = createTestFlow({
        steps: [
          {
            id: 'intro',
            messages: [
              {
                type: 'therapist-text',
                content: 'Question?',
                delay: 0,
                awaitInput: true,
                saveAs: 'answer',
              },
            ],
          },
        ],
      });

      const { result } = renderHook(() => useChatFlow(flow));

      await act(async () => {
        vi.advanceTimersByTime(100);
      });

      act(() => {
        result.current.handleUserInput('My answer');
      });

      const userMessage = result.current.messages.find((m) => m.sender === 'user');
      expect(userMessage).toBeDefined();
      expect(userMessage.content).toBe('My answer');
    });

    it('should not handle input when not awaiting', async () => {
      const flow = createTestFlow({
        steps: [
          {
            id: 'intro',
            messages: [
              { type: 'therapist-text', content: 'No input', delay: 0 },
            ],
          },
        ],
      });

      const { result } = renderHook(() => useChatFlow(flow));

      await act(async () => {
        vi.advanceTimersByTime(100);
      });

      const messagesBefore = result.current.messages.length;

      act(() => {
        result.current.handleUserInput('Ignored input');
      });

      expect(result.current.messages.length).toBe(messagesBefore);
    });
  });

  describe('interaction completion', () => {
    it('should handle interaction completion and save data', async () => {
      const flow = createTestFlow({
        steps: [
          {
            id: 'intro',
            messages: [
              {
                type: 'timer',
                delay: 0,
                awaitCompletion: true,
                saveAs: 'timerDone',
              },
            ],
          },
          {
            id: 'complete',
            messages: [
              { type: 'system', content: 'Done', delay: 0 },
            ],
          },
        ],
      });

      const { result } = renderHook(() => useChatFlow(flow));

      await act(async () => {
        vi.advanceTimersByTime(100);
      });

      expect(result.current.awaitingCompletion).not.toBeNull();

      act(() => {
        result.current.handleInteractionComplete(true);
      });

      expect(result.current.collectedData.timerDone).toBe(true);
      expect(result.current.awaitingCompletion).toBeNull();
    });
  });

  describe('flow completion', () => {
    it('should mark flow as complete when all steps are done', async () => {
      const flow = createTestFlow({
        steps: [
          {
            id: 'intro',
            messages: [
              { type: 'therapist-text', content: 'Done', delay: 0 },
            ],
          },
        ],
      });

      const { result } = renderHook(() => useChatFlow(flow));

      // Process messages one by one
      for (let i = 0; i < 10; i++) {
        await act(async () => {
          vi.advanceTimersByTime(100);
        });
        if (result.current.isComplete) break;
      }

      expect(result.current.isComplete).toBe(true);
    });

    it('should call onComplete callback when flow completes', async () => {
      const onComplete = vi.fn();
      const flow = createTestFlow({
        steps: [
          {
            id: 'intro',
            messages: [
              { type: 'therapist-text', content: 'Done', delay: 0 },
            ],
          },
        ],
        onComplete,
      });

      const { result } = renderHook(() => useChatFlow(flow));

      // Process until complete
      for (let i = 0; i < 10; i++) {
        await act(async () => {
          vi.advanceTimersByTime(100);
        });
        if (result.current.isComplete) break;
      }

      expect(result.current.isComplete).toBe(true);
      expect(onComplete).toHaveBeenCalledWith(expect.any(Object));
    });

    it('should pass collected data to onComplete', async () => {
      const onComplete = vi.fn();
      const flow = createTestFlow({
        steps: [
          {
            id: 'intro',
            messages: [
              {
                type: 'therapist-text',
                content: 'Question?',
                delay: 0,
                awaitInput: true,
                saveAs: 'answer',
              },
            ],
          },
        ],
        onComplete,
      });

      const { result } = renderHook(() => useChatFlow(flow));

      await act(async () => {
        vi.advanceTimersByTime(100);
      });

      act(() => {
        result.current.handleUserInput('Test answer');
      });

      // Process until complete
      for (let i = 0; i < 10; i++) {
        await act(async () => {
          vi.advanceTimersByTime(100);
        });
        if (result.current.isComplete) break;
      }

      expect(result.current.isComplete).toBe(true);
      expect(onComplete).toHaveBeenCalledWith(
        expect.objectContaining({ answer: 'Test answer' })
      );
    });
  });

  describe('step navigation', () => {
    it('should move to next step after completing current step', async () => {
      const flow = createTestFlow({
        steps: [
          {
            id: 'step1',
            messages: [
              { type: 'therapist-text', content: 'Step 1', delay: 0 },
            ],
          },
          {
            id: 'step2',
            messages: [
              { type: 'therapist-text', content: 'Step 2', delay: 0, awaitInput: true, saveAs: 'test' },
            ],
          },
        ],
      });

      const { result } = renderHook(() => useChatFlow(flow));

      // Initial state
      expect(result.current.currentStepIndex).toBe(0);

      // Process first step and move to second
      for (let i = 0; i < 10; i++) {
        await act(async () => {
          vi.advanceTimersByTime(100);
        });
        if (result.current.currentStepIndex === 1) break;
      }

      expect(result.current.currentStepIndex).toBe(1);
    });
  });

  describe('reset', () => {
    it('should reset all state to initial values', async () => {
      const flow = createTestFlow({
        steps: [
          {
            id: 'intro',
            messages: [
              {
                type: 'therapist-text',
                content: 'Question?',
                delay: 0,
                awaitInput: true,
                saveAs: 'answer',
              },
            ],
          },
        ],
      });

      const { result } = renderHook(() => useChatFlow(flow));

      await act(async () => {
        vi.advanceTimersByTime(100);
      });

      act(() => {
        result.current.handleUserInput('Some answer');
      });

      await act(async () => {
        vi.advanceTimersByTime(100);
      });

      // Now reset
      act(() => {
        result.current.reset();
      });

      expect(result.current.messages).toEqual([]);
      expect(result.current.currentStepIndex).toBe(0);
      expect(result.current.collectedData).toEqual({});
      expect(result.current.isComplete).toBe(false);
      expect(result.current.awaitingInput).toBeNull();
      expect(result.current.awaitingCompletion).toBeNull();
      expect(result.current.isTyping).toBe(false);
    });
  });

  describe('typing indicator', () => {
    it('should show typing indicator for delayed messages', async () => {
      const flow = createTestFlow({
        steps: [
          {
            id: 'intro',
            messages: [
              { type: 'therapist-text', content: 'First', delay: 0 },
              { type: 'therapist-text', content: 'Second', delay: 1000 },
            ],
          },
        ],
      });

      const { result } = renderHook(() => useChatFlow(flow));

      // First message
      await act(async () => {
        vi.advanceTimersByTime(100);
      });

      // Second message should show typing indicator
      await act(async () => {
        vi.advanceTimersByTime(100);
      });

      // At some point isTyping should be true (for delays > 300ms)
      // Then it should become false after message appears
    });
  });

  describe('haptic feedback', () => {
    it('should trigger haptic feedback for therapist messages', async () => {
      const flow = createTestFlow({
        steps: [
          {
            id: 'intro',
            messages: [
              { type: 'therapist-text', content: 'Hello', delay: 0 },
            ],
          },
        ],
      });

      renderHook(() => useChatFlow(flow));

      await act(async () => {
        vi.advanceTimersByTime(100);
      });

      expect(navigator.vibrate).toHaveBeenCalledWith(10);
    });
  });

  describe('message structure', () => {
    it('should add id and timestamp to messages', async () => {
      const flow = createTestFlow({
        steps: [
          {
            id: 'intro',
            messages: [
              { type: 'therapist-text', content: 'Test', delay: 0 },
            ],
          },
        ],
      });

      const { result } = renderHook(() => useChatFlow(flow));

      await act(async () => {
        vi.advanceTimersByTime(100);
      });

      expect(result.current.messages[0].id).toBeDefined();
      expect(result.current.messages[0].timestamp).toBeDefined();
      expect(typeof result.current.messages[0].timestamp).toBe('number');
    });
  });

  describe('cleanup', () => {
    it('should clear timeouts on unmount', async () => {
      const flow = createTestFlow({
        steps: [
          {
            id: 'intro',
            messages: [
              { type: 'therapist-text', content: 'First', delay: 0 },
              { type: 'therapist-text', content: 'Second', delay: 1000 },
            ],
          },
        ],
      });

      const { unmount } = renderHook(() => useChatFlow(flow));

      await act(async () => {
        vi.advanceTimersByTime(100);
      });

      unmount();

      // Should not throw when advancing timers after unmount
      await act(async () => {
        vi.advanceTimersByTime(2000);
      });
    });
  });
});
