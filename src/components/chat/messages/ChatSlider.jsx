import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ChatSlider({
  min = 0,
  max = 100,
  unit = '%',
  initialValue = 50,
  leftLabel,
  rightLabel,
  onSubmit
}) {
  const [value, setValue] = useState(initialValue);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    navigator.vibrate?.(30);
    setIsSubmitted(true);
    onSubmit?.(value);
  };

  if (isSubmitted) {
    return (
      <motion.div
        className="mt-3 flex items-center gap-2"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <span
          className="text-2xl font-bold"
          style={{ color: 'var(--apple-purple)' }}
        >
          {value}{unit}
        </span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--apple-green)"
          strokeWidth="3"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </motion.div>
    );
  }

  const progress = ((value - min) / (max - min)) * 100;

  return (
    <div className="mt-3">
      <div className="card p-4">
        <div className="relative z-10">
          <div
            className="text-5xl font-bold text-center mb-4"
            style={{ color: 'var(--apple-purple)' }}
          >
            {value}{unit}
          </div>

          <div className="relative mb-2">
            <input
              type="range"
              min={min}
              max={max}
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, var(--apple-purple) 0%, var(--apple-purple) ${progress}%, var(--glass-border) ${progress}%, var(--glass-border) 100%)`,
              }}
            />
          </div>

          <div className="flex justify-between mb-4">
            <span className="text-xs" style={{ color: 'var(--label-tertiary)' }}>
              {leftLabel ?? min}
            </span>
            <span className="text-xs" style={{ color: 'var(--label-tertiary)' }}>
              {rightLabel ?? max}
            </span>
          </div>

          <button
            className="w-full py-3 rounded-xl font-semibold text-white"
            style={{ background: 'var(--apple-purple)' }}
            onClick={handleSubmit}
          >
            Подтвердить
          </button>
        </div>
      </div>
    </div>
  );
}
