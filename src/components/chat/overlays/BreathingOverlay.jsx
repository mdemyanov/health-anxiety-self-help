import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from '../../icons';

export default function BreathingOverlay({
  isOpen,
  pattern = '4-4',
  cycles = 3,
  onComplete
}) {
  const [phase, setPhase] = useState('inhale'); // inhale | exhale | complete
  const [currentCycle, setCurrentCycle] = useState(0);

  const [inhaleTime, exhaleTime] = pattern.split('-').map(Number);
  const phaseDuration = (phase === 'inhale' ? inhaleTime : exhaleTime) * 1000;

  // Reset and auto-start when overlay opens
  useEffect(() => {
    if (isOpen) {
      setPhase('inhale');
      setCurrentCycle(0);
    }
  }, [isOpen]);

  // Phase transition logic
  useEffect(() => {
    if (!isOpen || phase === 'complete') return;

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
  }, [phase, isOpen, currentCycle, cycles, phaseDuration, onComplete]);

  const isInhale = phase === 'inhale';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center"
          style={{
            background: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)'
          }}
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
                  <Check size={40} color="white" strokeWidth={3} />
                </div>
                <span className="text-lg font-medium" style={{ color: 'var(--apple-green)' }}>
                  Отлично! Дыхание завершено
                </span>
              </motion.div>
            ) : (
              /* Active breathing state */
              <div className="flex flex-col items-center gap-6">
                {/* Breathing circle with gradient */}
                <div className="relative w-48 h-48 flex items-center justify-center">
                  <motion.div
                    className="w-48 h-48 rounded-full"
                    style={{
                      background: 'linear-gradient(135deg, var(--apple-blue), var(--apple-green))',
                      boxShadow: isInhale
                        ? '0 8px 32px rgba(0, 122, 255, 0.4)'
                        : '0 8px 32px rgba(52, 199, 89, 0.4)',
                    }}
                    initial={{ scale: 0.6 }}
                    animate={{
                      scale: isInhale ? 1 : 0.6,
                      rotate: isInhale ? 0 : 180,
                    }}
                    transition={{
                      duration: isInhale ? inhaleTime : exhaleTime,
                      ease: 'easeInOut',
                    }}
                  />
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
