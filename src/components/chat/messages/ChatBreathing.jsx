import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

export default function ChatBreathing({
  pattern = '4-4',
  cycles = 3,
  onComplete
}) {
  const [phase, setPhase] = useState('idle'); // idle | inhale | exhale | complete
  const [currentCycle, setCurrentCycle] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const [inhaleTime, exhaleTime] = pattern.split('-').map(Number);
  const phaseDuration = (phase === 'inhale' ? inhaleTime : exhaleTime) * 1000;

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
          onComplete?.();
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

  if (phase === 'complete') {
    return (
      <motion.div
        className="flex flex-col items-center gap-3 mt-3 py-4"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{ background: 'var(--apple-green)' }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <span className="text-base" style={{ color: 'var(--apple-green)' }}>
          Отлично! Дыхание завершено
        </span>
      </motion.div>
    );
  }

  if (!isActive) {
    return (
      <div className="mt-3">
        <button
          className="card flex items-center gap-3 px-4 py-3 w-full"
          onClick={handleStart}
        >
          <div className="relative z-10 flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: 'var(--apple-blue)' }}
            >
              <span className="text-white text-lg">🫁</span>
            </div>
            <span className="text-base font-medium">
              Начать дыхание ({cycles} цикла)
            </span>
          </div>
        </button>
      </div>
    );
  }

  const isInhale = phase === 'inhale';

  return (
    <div className="mt-3 flex flex-col items-center gap-4 py-4">
      <motion.div
        className="w-28 h-28 rounded-full flex items-center justify-center"
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
        <span className="text-white text-lg font-semibold">
          {isInhale ? 'Вдох' : 'Выдох'}
        </span>
      </motion.div>

      <p className="text-sm" style={{ color: 'var(--label-secondary)' }}>
        {isInhale ? 'Медленно вдыхай...' : 'Медленно выдыхай...'}
      </p>

      <p className="text-xs" style={{ color: 'var(--label-tertiary)' }}>
        Цикл {currentCycle + 1} из {cycles}
      </p>
    </div>
  );
}
