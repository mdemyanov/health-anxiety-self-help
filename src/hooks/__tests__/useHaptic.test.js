import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import {
  useHaptic,
  hapticLight,
  hapticMedium,
  hapticHeavy,
  hapticSuccess,
} from '../useHaptic';

describe('useHaptic', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('vibrate', () => {
    it('should call navigator.vibrate with pattern', () => {
      const { result } = renderHook(() => useHaptic());

      act(() => {
        result.current.vibrate(100);
      });

      expect(navigator.vibrate).toHaveBeenCalledWith(100);
    });

    it('should return true when vibration is supported', () => {
      const { result } = renderHook(() => useHaptic());

      let returnValue;
      act(() => {
        returnValue = result.current.vibrate(50);
      });

      expect(returnValue).toBe(true);
    });

    it('should handle array patterns', () => {
      const { result } = renderHook(() => useHaptic());

      act(() => {
        result.current.vibrate([100, 50, 100]);
      });

      expect(navigator.vibrate).toHaveBeenCalledWith([100, 50, 100]);
    });
  });

  describe('light', () => {
    it('should vibrate with 10ms pattern', () => {
      const { result } = renderHook(() => useHaptic());

      act(() => {
        result.current.light();
      });

      expect(navigator.vibrate).toHaveBeenCalledWith(10);
    });
  });

  describe('medium', () => {
    it('should vibrate with 30ms pattern', () => {
      const { result } = renderHook(() => useHaptic());

      act(() => {
        result.current.medium();
      });

      expect(navigator.vibrate).toHaveBeenCalledWith(30);
    });
  });

  describe('heavy', () => {
    it('should vibrate with 50ms pattern', () => {
      const { result } = renderHook(() => useHaptic());

      act(() => {
        result.current.heavy();
      });

      expect(navigator.vibrate).toHaveBeenCalledWith(50);
    });
  });

  describe('success', () => {
    it('should vibrate with success pattern [30, 20, 30]', () => {
      const { result } = renderHook(() => useHaptic());

      act(() => {
        result.current.success();
      });

      expect(navigator.vibrate).toHaveBeenCalledWith([30, 20, 30]);
    });
  });

  describe('warning', () => {
    it('should vibrate with warning pattern [50, 30, 50]', () => {
      const { result } = renderHook(() => useHaptic());

      act(() => {
        result.current.warning();
      });

      expect(navigator.vibrate).toHaveBeenCalledWith([50, 30, 50]);
    });
  });

  describe('error', () => {
    it('should vibrate with error pattern [100, 50, 100]', () => {
      const { result } = renderHook(() => useHaptic());

      act(() => {
        result.current.error();
      });

      expect(navigator.vibrate).toHaveBeenCalledWith([100, 50, 100]);
    });
  });

  describe('selection', () => {
    it('should vibrate with 15ms pattern', () => {
      const { result } = renderHook(() => useHaptic());

      act(() => {
        result.current.selection();
      });

      expect(navigator.vibrate).toHaveBeenCalledWith(15);
    });
  });

  describe('when vibration is not supported', () => {
    beforeEach(() => {
      navigator.vibrate = undefined;
    });

    afterEach(() => {
      navigator.vibrate = vi.fn(() => true);
    });

    it('should return false when vibration is not supported', () => {
      const { result } = renderHook(() => useHaptic());

      let returnValue;
      act(() => {
        returnValue = result.current.vibrate(100);
      });

      expect(returnValue).toBe(false);
    });
  });
});

describe('standalone haptic functions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('hapticLight', () => {
    it('should call navigator.vibrate with 10', () => {
      hapticLight();
      expect(navigator.vibrate).toHaveBeenCalledWith(10);
    });
  });

  describe('hapticMedium', () => {
    it('should call navigator.vibrate with 30', () => {
      hapticMedium();
      expect(navigator.vibrate).toHaveBeenCalledWith(30);
    });
  });

  describe('hapticHeavy', () => {
    it('should call navigator.vibrate with 50', () => {
      hapticHeavy();
      expect(navigator.vibrate).toHaveBeenCalledWith(50);
    });
  });

  describe('hapticSuccess', () => {
    it('should call navigator.vibrate with [30, 20, 30]', () => {
      hapticSuccess();
      expect(navigator.vibrate).toHaveBeenCalledWith([30, 20, 30]);
    });
  });

  describe('when vibration is not supported', () => {
    beforeEach(() => {
      navigator.vibrate = undefined;
    });

    afterEach(() => {
      navigator.vibrate = vi.fn(() => true);
    });

    it('hapticLight should not throw', () => {
      expect(() => hapticLight()).not.toThrow();
    });

    it('hapticMedium should not throw', () => {
      expect(() => hapticMedium()).not.toThrow();
    });

    it('hapticHeavy should not throw', () => {
      expect(() => hapticHeavy()).not.toThrow();
    });

    it('hapticSuccess should not throw', () => {
      expect(() => hapticSuccess()).not.toThrow();
    });
  });
});
