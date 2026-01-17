import { useState } from 'react';
import { motion } from 'framer-motion';

const MOOD_OPTIONS = [
  { emoji: '😔', label: 'Плохо', value: 1 },
  { emoji: '😐', label: 'Так себе', value: 2 },
  { emoji: '🙂', label: 'Нормально', value: 3 },
  { emoji: '😊', label: 'Хорошо', value: 4 },
  { emoji: '😄', label: 'Отлично', value: 5 },
];

export default function ChatFeedback({ options = {}, onSubmit }) {
  const [mood, setMood] = useState(null);
  const [rating, setRating] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    moodLabel = 'Как ты себя чувствуешь?',
    ratingLabel = 'Насколько полезной была практика?',
    showMood = true,
    showRating = true,
  } = options;

  const handleSubmit = () => {
    navigator.vibrate?.(30);
    setIsSubmitted(true);
    onSubmit?.({ mood, rating });
  };

  const canSubmit = (!showMood || mood !== null) && (!showRating || rating !== null);

  if (isSubmitted) {
    return (
      <motion.div
        className="mt-3 flex items-center gap-2"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <span className="text-2xl">
          {mood !== null && MOOD_OPTIONS.find(m => m.value === mood)?.emoji}
        </span>
        {rating !== null && (
          <span
            className="font-bold"
            style={{ color: 'var(--apple-blue)' }}
          >
            {rating}/5
          </span>
        )}
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

  return (
    <div className="mt-3">
      <div className="card p-4 space-y-5">
        {/* Mood selection */}
        {showMood && (
          <div>
            <p className="text-sm secondary-text mb-3 text-center">{moodLabel}</p>
            <div className="flex justify-center gap-2">
              {MOOD_OPTIONS.map((option) => (
                <motion.button
                  key={option.value}
                  onClick={() => {
                    setMood(option.value);
                    navigator.vibrate?.(10);
                  }}
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-all ${
                    mood === option.value
                      ? 'bg-[var(--apple-blue)]/20 scale-110'
                      : 'bg-[var(--bg-secondary)] opacity-60 hover:opacity-100'
                  }`}
                  whileTap={{ scale: 0.9 }}
                  title={option.label}
                >
                  {option.emoji}
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {/* Rating selection */}
        {showRating && (
          <div>
            <p className="text-sm secondary-text mb-3 text-center">{ratingLabel}</p>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <motion.button
                  key={n}
                  onClick={() => {
                    setRating(n);
                    navigator.vibrate?.(10);
                  }}
                  className={`w-10 h-10 rounded-full font-semibold transition-all ${
                    rating === n
                      ? 'bg-[var(--apple-blue)] text-white'
                      : 'bg-[var(--bg-secondary)] body-text hover:bg-[var(--bg-tertiary)]'
                  }`}
                  whileTap={{ scale: 0.9 }}
                >
                  {n}
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className={`w-full py-3 rounded-xl font-semibold transition-all ${
            canSubmit
              ? 'bg-[var(--apple-blue)] text-white'
              : 'bg-[var(--bg-secondary)] secondary-text opacity-50'
          }`}
        >
          Продолжить
        </button>
      </div>
    </div>
  );
}
