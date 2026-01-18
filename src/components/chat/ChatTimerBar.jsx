import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Check, Play, Clock } from '../icons';

export default function ChatTimerBar({
  duration = 10,
  onComplete
}) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          setIsComplete(true);
          navigator.vibrate?.([100, 50, 100]);
          // Delay completion callback to show "Готово!" briefly
          setTimeout(() => onComplete?.(), 500);
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

  // Completed state - show success briefly
  if (isComplete) {
    return (
      <motion.div
        className="chat-input-bar flex items-center justify-center gap-3 p-3 rounded-[24px]"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{ background: 'var(--apple-green)' }}
        >
          <Check size={16} color="white" strokeWidth={3} />
        </div>
        <span className="text-base font-medium" style={{ color: 'var(--apple-green)' }}>
          Готово!
        </span>
      </motion.div>
    );
  }

  // Not started - show start button
  if (!isRunning && timeLeft === duration) {
    return (
      <motion.button
        className="chat-input-bar w-full flex items-center justify-center gap-3 p-3 rounded-[24px] transition-transform active:scale-[0.98]"
        onClick={handleStart}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: 'var(--apple-blue)' }}
        >
          <Play size={16} fill="white" color="white" />
        </div>
        <span className="text-base font-medium">
          Начать ({duration} сек)
        </span>
      </motion.button>
    );
  }

  // Running - show progress bar
  return (
    <motion.div
      className="chat-input-bar relative overflow-hidden p-3 rounded-[24px]"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Progress bar fill - left to right */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 rounded-[24px]"
        style={{
          background: 'var(--apple-blue)',
          opacity: 0.2
        }}
        initial={{ width: '0%' }}
        animate={{ width: `${progress * 100}%` }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-between px-2">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: 'var(--apple-blue)' }}
          >
            <Clock size={14} color="white" strokeWidth={2} />
          </div>
          <span className="text-base" style={{ color: 'var(--label-secondary)' }}>
            Подожди...
          </span>
        </div>
        <span
          className="text-xl font-bold tabular-nums"
          style={{ color: 'var(--apple-blue)' }}
        >
          {timeLeft}с
        </span>
      </div>
    </motion.div>
  );
}
