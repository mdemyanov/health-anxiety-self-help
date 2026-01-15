import { useCallback } from 'react';

export function useHaptic() {
  const vibrate = useCallback((pattern) => {
    if (navigator.vibrate) {
      navigator.vibrate(pattern);
      return true;
    }
    return false;
  }, []);

  const light = useCallback(() => {
    return vibrate(10);
  }, [vibrate]);

  const medium = useCallback(() => {
    return vibrate(30);
  }, [vibrate]);

  const heavy = useCallback(() => {
    return vibrate(50);
  }, [vibrate]);

  const success = useCallback(() => {
    return vibrate([30, 20, 30]);
  }, [vibrate]);

  const warning = useCallback(() => {
    return vibrate([50, 30, 50]);
  }, [vibrate]);

  const error = useCallback(() => {
    return vibrate([100, 50, 100]);
  }, [vibrate]);

  const selection = useCallback(() => {
    return vibrate(15);
  }, [vibrate]);

  return {
    vibrate,
    light,
    medium,
    heavy,
    success,
    warning,
    error,
    selection,
  };
}

// Standalone functions for use outside React components
export function hapticLight() {
  if (navigator.vibrate) {
    navigator.vibrate(10);
  }
}

export function hapticMedium() {
  if (navigator.vibrate) {
    navigator.vibrate(30);
  }
}

export function hapticHeavy() {
  if (navigator.vibrate) {
    navigator.vibrate(50);
  }
}

export function hapticSuccess() {
  if (navigator.vibrate) {
    navigator.vibrate([30, 20, 30]);
  }
}
