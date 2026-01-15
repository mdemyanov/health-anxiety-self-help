import { useState, useEffect } from 'react';

export default function BreathingCircle({ duration = 4000 }) {
  const [phase, setPhase] = useState('inhale'); // 'inhale' | 'exhale'
  const [isActive] = useState(true);
  const [cycleCount, setCycleCount] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setPhase((prev) => {
        if (prev === 'inhale') {
          return 'exhale';
        } else {
          setCycleCount((c) => c + 1);
          return 'inhale';
        }
      });
    }, duration);

    return () => clearInterval(interval);
  }, [duration, isActive]);

  // Haptic feedback on phase change
  useEffect(() => {
    if (navigator.vibrate) {
      navigator.vibrate(20);
    }
  }, [phase]);

  const isInhale = phase === 'inhale';

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Circle container */}
      <div className="relative w-48 h-48 flex items-center justify-center">
        {/* Outer ring */}
        <div
          className="absolute w-full h-full rounded-full transition-all"
          style={{
            background: 'rgba(0, 122, 255, 0.1)',
            transform: isInhale ? 'scale(1)' : 'scale(0.7)',
            transitionDuration: `${duration}ms`,
            transitionTimingFunction: 'ease-in-out',
          }}
        />

        {/* Inner circle */}
        <div
          className="relative w-32 h-32 rounded-full flex items-center justify-center transition-all"
          style={{
            background: 'var(--apple-blue)',
            opacity: 0.8,
            transform: isInhale ? 'scale(1)' : 'scale(0.6)',
            transitionDuration: `${duration}ms`,
            transitionTimingFunction: 'ease-in-out',
          }}
        >
          <span className="text-white text-lg font-semibold">
            {isInhale ? 'Вдох' : 'Выдох'}
          </span>
        </div>
      </div>

      {/* Instructions */}
      <p className="subhead secondary-text text-center">
        {isInhale ? 'Медленно вдыхай...' : 'Медленно выдыхай...'}
      </p>

      {/* Cycle counter */}
      <p className="caption secondary-text">
        Цикл {cycleCount + 1}
      </p>
    </div>
  );
}
