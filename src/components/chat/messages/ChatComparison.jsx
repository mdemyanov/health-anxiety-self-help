import { motion } from 'framer-motion';

export default function ChatComparison({
  before,
  after,
  beforeValue,
  afterValue
}) {
  const diff = beforeValue - afterValue;
  const improved = diff > 0;

  return (
    <div className="mt-3">
      <div className="card p-4">
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-4">
            <div className="text-center">
              <p className="text-xs mb-1" style={{ color: 'var(--label-secondary)' }}>
                {before?.label || 'До'}
              </p>
              <p
                className="text-3xl font-bold"
                style={{ color: 'var(--apple-purple)' }}
              >
                {beforeValue}%
              </p>
            </div>

            <motion.div
              className="text-2xl"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
            >
              →
            </motion.div>

            <div className="text-center">
              <p className="text-xs mb-1" style={{ color: 'var(--label-secondary)' }}>
                {after?.label || 'После'}
              </p>
              <p
                className="text-3xl font-bold"
                style={{ color: 'var(--apple-purple)' }}
              >
                {afterValue}%
              </p>
            </div>
          </div>

          {diff !== 0 && (
            <motion.div
              className="text-center py-2 rounded-lg"
              style={{
                background: improved
                  ? 'rgba(52, 199, 89, 0.15)'
                  : 'rgba(255, 149, 0, 0.15)',
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <span
                className="font-medium"
                style={{
                  color: improved ? 'var(--apple-green)' : 'var(--apple-orange)',
                }}
              >
                {improved ? '↓' : '↑'} Тревога {improved ? 'снизилась' : 'выросла'} на {Math.abs(diff)}%
              </span>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
