import { motion } from 'framer-motion';

export default function ChatComparison({
  before,
  after,
  beforeValue,
  afterValue,
  type
}) {
  // Автоопределение типа: если оба значения числовые — numeric, иначе text
  const isNumeric = type === 'numeric' ||
    (type !== 'text' && typeof beforeValue === 'number' && typeof afterValue === 'number');

  // Числовое сравнение (проценты)
  if (isNumeric) {
    const diff = (beforeValue || 0) - (afterValue || 0);
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
                  {beforeValue ?? 0}%
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
                  {afterValue ?? 0}%
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

  // Текстовое сравнение (вертикальные карточки)
  return (
    <div className="mt-3">
      <div className="card p-4">
        <div className="relative z-10 flex flex-col gap-3">
          {/* Блок "До" */}
          <div
            className="p-3 rounded-xl"
            style={{ background: 'var(--glass-bg)' }}
          >
            <p className="text-xs mb-2 font-medium" style={{ color: 'var(--label-secondary)' }}>
              {before?.label || 'До'}
            </p>
            <p
              className="text-sm whitespace-pre-wrap break-words"
              style={{ color: 'var(--apple-purple)' }}
            >
              {beforeValue || '—'}
            </p>
          </div>

          {/* Стрелка вниз */}
          <motion.div
            className="text-xl text-center"
            style={{ color: 'var(--label-tertiary)' }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
          >
            ↓
          </motion.div>

          {/* Блок "После" */}
          <div
            className="p-3 rounded-xl"
            style={{ background: 'rgba(52, 199, 89, 0.1)' }}
          >
            <p className="text-xs mb-2 font-medium" style={{ color: 'var(--label-secondary)' }}>
              {after?.label || 'После'}
            </p>
            <p
              className="text-sm whitespace-pre-wrap break-words"
              style={{ color: 'var(--apple-green)' }}
            >
              {afterValue || '—'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
