import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ChatMultiInput({
  count = 5,
  sense = 'вижу',
  placeholder,
  color = 'var(--apple-blue)',
  onSubmit
}) {
  const [values, setValues] = useState(Array(count).fill(''));
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (index, value) => {
    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);
  };

  const handleSubmit = () => {
    navigator.vibrate?.(30);
    setIsSubmitted(true);
    onSubmit?.(values.filter((v) => v.trim()));
  };

  const isComplete = values.every((v) => v.trim().length > 0);

  if (isSubmitted) {
    return (
      <motion.div
        className="mt-3"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <div className="space-y-1">
          {values.filter((v) => v.trim()).map((v, i) => (
            <p key={i} className="text-sm" style={{ color: 'var(--label-secondary)' }}>
              {i + 1}. {v}
            </p>
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <div className="mt-3">
      <div className="card p-4">
        <div className="relative z-10 space-y-3">
          {Array.from({ length: count }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <span
                className="w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium text-white"
                style={{ background: color }}
              >
                {i + 1}
              </span>
              <input
                type="text"
                value={values[i]}
                onChange={(e) => handleChange(i, e.target.value)}
                placeholder={placeholder || `Я ${sense}...`}
                className="flex-1 bg-transparent border-none outline-none text-base py-2"
                style={{
                  color: 'var(--label)',
                  borderBottom: '1px solid var(--glass-border)',
                }}
              />
            </div>
          ))}

          <button
            className="w-full py-3 rounded-xl font-semibold text-white mt-4 transition-opacity"
            style={{
              background: color,
              opacity: isComplete ? 1 : 0.5,
            }}
            onClick={handleSubmit}
            disabled={!isComplete}
          >
            Продолжить
          </button>
        </div>
      </div>
    </div>
  );
}
