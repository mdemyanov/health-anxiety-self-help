import { motion } from 'framer-motion';

export default function ChatQuestionPrompts({
  questions = [],
  title,
  onQuestionClick,
  color = 'var(--apple-blue)',
}) {
  const handleClick = (question) => {
    navigator.vibrate?.(15);
    onQuestionClick?.(question);
  };

  return (
    <div className="mt-3">
      <div className="card p-4">
        <div className="relative z-10">
          {title && (
            <p
              className="text-sm font-medium mb-3"
              style={{ color: 'var(--label-secondary)' }}
            >
              {title}
            </p>
          )}

          <div className="flex flex-wrap gap-2">
            {questions.map((question, i) => (
              <motion.button
                key={i}
                className="px-3 py-2 rounded-xl text-sm text-left transition-colors"
                style={{
                  background: 'var(--glass-bg)',
                  border: '1px solid var(--glass-border)',
                }}
                whileTap={{ scale: 0.95 }}
                whileHover={{
                  background: `${color}15`,
                  borderColor: color,
                }}
                onClick={() => handleClick(question)}
              >
                {question}
              </motion.button>
            ))}
          </div>

          <p
            className="text-xs mt-3"
            style={{ color: 'var(--label-tertiary)' }}
          >
            Нажми на вопрос, чтобы вставить его в ответ
          </p>
        </div>
      </div>
    </div>
  );
}
