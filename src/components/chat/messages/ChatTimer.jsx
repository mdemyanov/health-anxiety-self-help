import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Check, Play } from '../../icons';

export default function ChatTimer({
  duration = 10,
  autoStart = false,
  onComplete
}) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(autoStart);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          setIsComplete(true);
          navigator.vibrate?.([100, 50, 100]);
          onComplete?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, onComplete]);

  const handleStart = useCallback(() => {
    navigator.vibrate?.(30);
    setIsRunning(true);
  }, []);

  const progress = 1 - timeLeft / duration;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference * (1 - progress);

  if (isComplete) {
    return (
      <motion.div
        className="flex items-center gap-2 mt-3"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{ background: 'var(--apple-green)' }}
        >
          <Check size={16} color="white" strokeWidth={3} />
        </div>
        <span className="text-base" style={{ color: 'var(--apple-green)' }}>
          Готово!
        </span>
      </motion.div>
    );
  }

  if (!isRunning && timeLeft === duration) {
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
              <Play size={16} fill="white" color="white" />
            </div>
            <span className="text-base font-medium">
              Начать ({duration} сек)
            </span>
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className="mt-3 flex flex-col items-center gap-2">
      <div className="relative w-24 h-24">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="var(--glass-border)"
            strokeWidth="6"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="var(--apple-blue)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1, ease: 'linear' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="text-3xl font-bold"
            style={{ color: 'var(--apple-blue)' }}
          >
            {timeLeft}
          </span>
        </div>
      </div>
    </div>
  );
}
