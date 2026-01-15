import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTimer, formatTime } from '../useTimer';

describe('useTimer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('initialization', () => {
    it('should initialize with given time', () => {
      const { result } = renderHook(() => useTimer(60));
      expect(result.current.timeLeft).toBe(60);
      expect(result.current.isRunning).toBe(false);
    });

    it('should initialize with default time of 0', () => {
      const { result } = renderHook(() => useTimer());
      expect(result.current.timeLeft).toBe(0);
      expect(result.current.isRunning).toBe(false);
    });
  });

  describe('start', () => {
    it('should start countdown when start() is called', () => {
      const { result } = renderHook(() => useTimer(10));

      act(() => {
        result.current.start();
      });

      expect(result.current.isRunning).toBe(true);

      act(() => {
        vi.advanceTimersByTime(3000);
      });

      expect(result.current.timeLeft).toBe(7);
    });

    it('should start with a specific time when provided', () => {
      const { result } = renderHook(() => useTimer(10));

      act(() => {
        result.current.start(5);
      });

      expect(result.current.timeLeft).toBe(5);
      expect(result.current.isRunning).toBe(true);
    });
  });

  describe('countdown', () => {
    it('should decrement every second', () => {
      const { result } = renderHook(() => useTimer(5));

      act(() => {
        result.current.start();
      });

      act(() => {
        vi.advanceTimersByTime(1000);
      });
      expect(result.current.timeLeft).toBe(4);

      act(() => {
        vi.advanceTimersByTime(1000);
      });
      expect(result.current.timeLeft).toBe(3);

      act(() => {
        vi.advanceTimersByTime(1000);
      });
      expect(result.current.timeLeft).toBe(2);
    });

    it('should stop at 0', () => {
      const { result } = renderHook(() => useTimer(3));

      act(() => {
        result.current.start();
      });

      // Advance one second at a time to let the effect cleanup work properly
      for (let i = 0; i < 5; i++) {
        act(() => {
          vi.advanceTimersByTime(1000);
        });
      }

      expect(result.current.timeLeft).toBe(0);
      expect(result.current.isRunning).toBe(false);
    });
  });

  describe('onComplete callback', () => {
    it('should call onComplete when timer reaches 0', () => {
      const onComplete = vi.fn();
      const { result } = renderHook(() => useTimer(3, onComplete));

      act(() => {
        result.current.start();
      });

      act(() => {
        vi.advanceTimersByTime(3000);
      });

      expect(result.current.timeLeft).toBe(0);
      expect(result.current.isRunning).toBe(false);
      expect(onComplete).toHaveBeenCalledTimes(1);
    });

    it('should not call onComplete if timer is reset before finishing', () => {
      const onComplete = vi.fn();
      const { result } = renderHook(() => useTimer(5, onComplete));

      act(() => {
        result.current.start();
      });

      act(() => {
        vi.advanceTimersByTime(2000);
      });

      act(() => {
        result.current.reset();
      });

      act(() => {
        vi.advanceTimersByTime(5000);
      });

      expect(onComplete).not.toHaveBeenCalled();
    });
  });

  describe('pause and resume', () => {
    it('should pause correctly', () => {
      const { result } = renderHook(() => useTimer(10));

      act(() => {
        result.current.start();
      });

      act(() => {
        vi.advanceTimersByTime(2000);
      });
      expect(result.current.timeLeft).toBe(8);

      act(() => {
        result.current.pause();
      });
      expect(result.current.isRunning).toBe(false);

      act(() => {
        vi.advanceTimersByTime(5000);
      });
      expect(result.current.timeLeft).toBe(8); // Should not change
    });

    it('should resume correctly', () => {
      const { result } = renderHook(() => useTimer(10));

      act(() => {
        result.current.start();
      });

      act(() => {
        vi.advanceTimersByTime(2000);
      });

      act(() => {
        result.current.pause();
      });

      act(() => {
        vi.advanceTimersByTime(5000);
      });

      act(() => {
        result.current.resume();
      });

      act(() => {
        vi.advanceTimersByTime(3000);
      });

      expect(result.current.timeLeft).toBe(5);
      expect(result.current.isRunning).toBe(true);
    });

    it('should not resume if timeLeft is 0', () => {
      const { result } = renderHook(() => useTimer(0));

      act(() => {
        result.current.resume();
      });

      expect(result.current.isRunning).toBe(false);
    });
  });

  describe('reset', () => {
    it('should reset to initial time', () => {
      const { result } = renderHook(() => useTimer(10));

      act(() => {
        result.current.start();
        vi.advanceTimersByTime(5000);
      });

      act(() => {
        result.current.reset();
      });

      expect(result.current.timeLeft).toBe(10);
      expect(result.current.isRunning).toBe(false);
    });

    it('should reset to custom time when provided', () => {
      const { result } = renderHook(() => useTimer(10));

      act(() => {
        result.current.start();
        vi.advanceTimersByTime(5000);
      });

      act(() => {
        result.current.reset(20);
      });

      expect(result.current.timeLeft).toBe(20);
      expect(result.current.isRunning).toBe(false);
    });
  });

  describe('stop', () => {
    it('should stop timer and set time to 0', () => {
      const { result } = renderHook(() => useTimer(10));

      act(() => {
        result.current.start();
        vi.advanceTimersByTime(3000);
      });

      act(() => {
        result.current.stop();
      });

      expect(result.current.timeLeft).toBe(0);
      expect(result.current.isRunning).toBe(false);
    });
  });

  describe('cleanup', () => {
    it('should clean up interval on unmount', () => {
      const { result, unmount } = renderHook(() => useTimer(10));

      act(() => {
        result.current.start();
      });

      unmount();

      // Advancing timers should not cause errors
      act(() => {
        vi.advanceTimersByTime(5000);
      });
    });
  });
});

describe('formatTime', () => {
  it('should format 0 seconds correctly', () => {
    expect(formatTime(0)).toBe('0:00');
  });

  it('should format single digit seconds correctly', () => {
    expect(formatTime(5)).toBe('0:05');
    expect(formatTime(9)).toBe('0:09');
  });

  it('should format double digit seconds correctly', () => {
    expect(formatTime(30)).toBe('0:30');
    expect(formatTime(59)).toBe('0:59');
  });

  it('should format minutes correctly', () => {
    expect(formatTime(60)).toBe('1:00');
    expect(formatTime(90)).toBe('1:30');
    expect(formatTime(125)).toBe('2:05');
  });

  it('should format large values correctly', () => {
    expect(formatTime(3600)).toBe('60:00');
    expect(formatTime(3661)).toBe('61:01');
  });
});
