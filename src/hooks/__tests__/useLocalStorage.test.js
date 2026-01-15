import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useLocalStorage, getStorageItem, setStorageItem } from '../useLocalStorage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  describe('initialization', () => {
    it('should return initial value when localStorage is empty', () => {
      const { result } = renderHook(() => useLocalStorage('testKey', 'initialValue'));
      expect(result.current[0]).toBe('initialValue');
    });

    it('should return stored value when exists in localStorage', () => {
      localStorage.setItem('testKey', JSON.stringify('storedValue'));
      const { result } = renderHook(() => useLocalStorage('testKey', 'initialValue'));
      expect(result.current[0]).toBe('storedValue');
    });

    it('should handle complex objects', () => {
      const complexObj = { name: 'test', items: [1, 2, 3] };
      localStorage.setItem('complexKey', JSON.stringify(complexObj));
      const { result } = renderHook(() => useLocalStorage('complexKey', {}));
      expect(result.current[0]).toEqual(complexObj);
    });

    it('should return initial value on JSON parse error', () => {
      // Manually set invalid JSON
      localStorage.__setStore({ invalidKey: 'not valid json' });
      localStorage.getItem.mockReturnValueOnce('not valid json');

      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const { result } = renderHook(() => useLocalStorage('invalidKey', 'default'));

      expect(result.current[0]).toBe('default');
      consoleSpy.mockRestore();
    });
  });

  describe('setValue', () => {
    it('should update value and localStorage', () => {
      const { result } = renderHook(() => useLocalStorage('testKey', 'initial'));

      act(() => {
        result.current[1]('newValue');
      });

      expect(result.current[0]).toBe('newValue');
      expect(localStorage.setItem).toHaveBeenCalledWith('testKey', JSON.stringify('newValue'));
    });

    it('should handle functional updates', () => {
      const { result } = renderHook(() => useLocalStorage('counterKey', 0));

      act(() => {
        result.current[1]((prev) => prev + 1);
      });

      expect(result.current[0]).toBe(1);

      act(() => {
        result.current[1]((prev) => prev + 5);
      });

      expect(result.current[0]).toBe(6);
    });

    it('should handle array updates', () => {
      const { result } = renderHook(() => useLocalStorage('arrayKey', []));

      act(() => {
        result.current[1](['item1']);
      });

      expect(result.current[0]).toEqual(['item1']);

      act(() => {
        result.current[1]((prev) => [...prev, 'item2']);
      });

      expect(result.current[0]).toEqual(['item1', 'item2']);
    });

    it('should handle object updates', () => {
      const { result } = renderHook(() => useLocalStorage('objKey', { count: 0 }));

      act(() => {
        result.current[1]({ count: 1, name: 'test' });
      });

      expect(result.current[0]).toEqual({ count: 1, name: 'test' });
    });

    it('should handle null values', () => {
      const { result } = renderHook(() => useLocalStorage('nullKey', 'initial'));

      act(() => {
        result.current[1](null);
      });

      expect(result.current[0]).toBeNull();
    });
  });

  describe('error handling', () => {
    it('should handle localStorage setItem errors gracefully', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      localStorage.setItem.mockImplementationOnce(() => {
        throw new Error('Storage full');
      });

      const { result } = renderHook(() => useLocalStorage('errorKey', 'initial'));

      act(() => {
        result.current[1]('newValue');
      });

      // Value should still update in state
      expect(result.current[0]).toBe('newValue');
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });
});

describe('getStorageItem', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('should return stored value when exists', () => {
    localStorage.setItem('key1', JSON.stringify('value1'));
    expect(getStorageItem('key1')).toBe('value1');
  });

  it('should return default value when key does not exist', () => {
    expect(getStorageItem('nonexistent', 'default')).toBe('default');
  });

  it('should return null as default when no default provided', () => {
    expect(getStorageItem('nonexistent')).toBeNull();
  });

  it('should handle complex objects', () => {
    const obj = { nested: { value: 42 } };
    localStorage.setItem('objKey', JSON.stringify(obj));
    expect(getStorageItem('objKey')).toEqual(obj);
  });

  it('should return default on parse error', () => {
    localStorage.__setStore({ badJson: '{invalid' });
    localStorage.getItem.mockReturnValueOnce('{invalid');
    expect(getStorageItem('badJson', 'fallback')).toBe('fallback');
  });
});

describe('setStorageItem', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('should store value and return true on success', () => {
    const result = setStorageItem('key1', 'value1');
    expect(result).toBe(true);
    expect(localStorage.setItem).toHaveBeenCalledWith('key1', JSON.stringify('value1'));
  });

  it('should store complex objects', () => {
    const obj = { items: [1, 2, 3], nested: { a: 'b' } };
    const result = setStorageItem('objKey', obj);
    expect(result).toBe(true);
    expect(localStorage.setItem).toHaveBeenCalledWith('objKey', JSON.stringify(obj));
  });

  it('should store arrays', () => {
    const arr = [1, 2, 3];
    const result = setStorageItem('arrKey', arr);
    expect(result).toBe(true);
    expect(localStorage.setItem).toHaveBeenCalledWith('arrKey', JSON.stringify(arr));
  });

  it('should return false on error', () => {
    localStorage.setItem.mockImplementationOnce(() => {
      throw new Error('Storage full');
    });

    const result = setStorageItem('errorKey', 'value');
    expect(result).toBe(false);
  });

  it('should store null values', () => {
    const result = setStorageItem('nullKey', null);
    expect(result).toBe(true);
    expect(localStorage.setItem).toHaveBeenCalledWith('nullKey', 'null');
  });

  it('should store boolean values', () => {
    const result = setStorageItem('boolKey', true);
    expect(result).toBe(true);
    expect(localStorage.setItem).toHaveBeenCalledWith('boolKey', 'true');
  });
});
