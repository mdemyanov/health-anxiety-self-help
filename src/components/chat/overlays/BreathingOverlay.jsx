import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BreathingOverlay({
  isOpen,
  pattern = '4-4',
  cycles = 3,
  onComplete
}) {
  const [phase, setPhase] = useState('idle'); // idle | inhale | exhale | complete
  const [currentCycle, setCurrentCycle] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const [inhaleTime, exhaleTime] = pattern.split('-').map(Number);
  const phaseDuration = (phase === 'inhale' ? inhaleTime : exhaleTime) * 1000;

  // Reset state when overlay opens
  useEffect(() => {
    if (isOpen) {
      setPhase('idle');
      setCurrentCycle(0);
      setIsActive(false);
    }
  }, [isOpen]);

  // Phase transition logic
  useEffect(() => {
    if (!isActive || phase === 'idle' || phase === 'complete') return;

    const timeout = setTimeout(() => {
      navigator.vibrate?.(20);

      if (phase === 'inhale') {
        setPhase('exhale');
      } else {
        if (currentCycle + 1 >= cycles) {
          setPhase('complete');
          navigator.vibrate?.([100, 50, 100]);
          // Auto-close after completion animation
          setTimeout(() => onComplete?.(), 800);
        } else {
          setCurrentCycle((c) => c + 1);
          setPhase('inhale');
        }
      }
    }, phaseDuration);

    return () => clearTimeout(timeout);
  }, [phase, isActive, currentCycle, cycles, phaseDuration, onComplete]);

  const handleStart = useCallback(() => {
    navigator.vibrate?.(30);
    setIsActive(true);
    setPhase('inhale');
  }, []);

  const isInhale = phase === 'inhale';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center"
          style={{ background: 'rgba(0, 0, 0, 0.4)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Glass container */}
          <motion.div
            className="liquid-glass-elevated p-8 rounded-3xl flex flex-col items-center gap-6 mx-4"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            {/* Title */}
            <h2 className="headline text-center">Дыхательная практика</h2>

            {phase === 'complete' ? (
              /* Completion state */
              <motion.div
                className="flex flex-col items-center gap-4"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center"
                  style={{ background: 'var(--apple-green)' }}
                >
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <span className="text-lg font-medium" style={{ color: 'var(--apple-green)' }}>
                  Отлично! Дыхание завершено
                </span>
              </motion.div>
            ) : !isActive ? (
              /* Idle state - start button */
              <div className="flex flex-col items-center gap-4">
                <p className="callout text-center secondary-text max-w-xs">
                  Следуй за кругом: вдох когда он увеличивается, выдох когда уменьшается
                </p>
                <button
                  className="btn btn-filled px-8 py-4"
                  onClick={handleStart}
                >
                  Начать дыхание ({cycles} цикла)
                </button>
              </div>
            ) : (
              /* Active breathing state */
              <div className="flex flex-col items-center gap-6">
                {/* Breathing circle - size w-48 h-48 (larger for overlay) */}
                <div className="relative w-48 h-48 flex items-center justify-center">
                  <motion.div
                    className="w-48 h-48 rounded-full flex items-center justify-center"
                    style={{
                      background: 'var(--apple-blue)',
                      boxShadow: '0 8px 32px rgba(0, 122, 255, 0.3)',
                    }}
                    animate={{
                      scale: isInhale ? 1 : 0.6,
                    }}
                    transition={{
                      duration: isInhale ? inhaleTime : exhaleTime,
                      ease: 'easeInOut',
                    }}
                  >
                    <span className="text-white text-2xl font-semibold">
                      {isInhale ? 'Вдох' : 'Выдох'}
                    </span>
                  </motion.div>
                </div>

                {/* Instructions */}
                <p className="text-base" style={{ color: 'var(--label-secondary)' }}>
                  {isInhale ? 'Медленно вдыхай...' : 'Медленно выдыхай...'}
                </p>

                {/* Cycle counter */}
                <p className="text-sm" style={{ color: 'var(--label-tertiary)' }}>
                  Цикл {currentCycle + 1} из {cycles}
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
