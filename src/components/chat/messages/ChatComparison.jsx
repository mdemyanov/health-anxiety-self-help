import { motion, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

// Компонент анимированного числа
function AnimatedNumber({ value, delay = 0, color }) {
  const [isVisible, setIsVisible] = useState(false);
  const spring = useSpring(0, { stiffness: 50, damping: 15 });
  const display = useTransform(spring, (v) => Math.round(v));

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      spring.set(value);
    }, delay);
    return () => clearTimeout(timer);
  }, [value, delay, spring]);

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
      transition={{ duration: 0.3 }}
      className="text-3xl font-bold"
      style={{ color }}
    >
      <motion.span>{display}</motion.span>%
    </motion.span>
  );
}

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

    // Цвет "после": зелёный если снизилось, красный если выросло, фиолетовый если без изменений
    const afterColor = diff > 0
      ? 'var(--apple-green)'
      : diff < 0
        ? 'var(--apple-red)'
        : 'var(--apple-purple)';

    return (
      <div className="mt-3">
        <div className="card p-4">
          <div className="relative z-10">
            <div className="flex justify-between items-center mb-4">
              <div className="text-center">
                <p className="text-xs mb-1" style={{ color: 'var(--label-secondary)' }}>
                  {before?.label || 'До'}
                </p>
                <AnimatedNumber
                  value={beforeValue ?? 0}
                  delay={0}
                  color="var(--apple-purple)"
                />
              </div>

              <motion.div
                className="text-2xl"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
              >
                →
              </motion.div>

              <div className="text-center">
                <p className="text-xs mb-1" style={{ color: 'var(--label-secondary)' }}>
                  {after?.label || 'После'}
                </p>
                <AnimatedNumber
                  value={afterValue ?? 0}
                  delay={600}
                  color={afterColor}
                />
              </div>
            </div>

            {diff !== 0 && (
              <motion.div
                className="text-center py-2 rounded-lg"
                style={{
                  background: improved
                    ? 'rgba(52, 199, 89, 0.15)'
                    : 'rgba(255, 59, 48, 0.15)',
                }}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.4 }}
              >
                <span
                  className="font-medium"
                  style={{
                    color: improved ? 'var(--apple-green)' : 'var(--apple-red)',
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
