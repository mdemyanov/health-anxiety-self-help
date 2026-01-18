/**
 * MoodEmoji - компонент для консистентного отображения emoji настроения
 *
 * Emoji лучше передают эмоции, чем иконки, поэтому мы оставляем их
 * для индикаторов настроения, но оборачиваем в компонент для
 * единообразного размера и центрирования.
 */

const MOOD_EMOJIS = {
  1: '\u{1F630}', // 😰 Very bad
  2: '\u{1F61F}', // 😟 Bad
  3: '\u{1F610}', // 😐 Normal
  4: '\u{1F642}', // 🙂 Good
  5: '\u{1F60A}', // 😊 Excellent
};

const MOOD_LABELS = {
  1: 'Очень плохо',
  2: 'Плохо',
  3: 'Нормально',
  4: 'Хорошо',
  5: 'Отлично',
};

// Size presets matching Tailwind text sizes
const SIZE_CLASSES = {
  sm: 'text-lg',      // 18px
  md: 'text-2xl',     // 24px
  lg: 'text-3xl',     // 30px
  xl: 'text-4xl',     // 36px
  '2xl': 'text-5xl',  // 48px
};

/**
 * MoodEmoji - отображает emoji настроения с консистентным размером
 *
 * @param {number} mood - уровень настроения от 1 до 5
 * @param {string} size - размер: 'sm', 'md', 'lg', 'xl', '2xl' (по умолчанию 'lg')
 * @param {string} className - дополнительные CSS классы
 * @param {boolean} showLabel - показывать ли текстовую метку
 */
export default function MoodEmoji({
  mood,
  size = 'lg',
  className = '',
  showLabel = false,
}) {
  const emoji = MOOD_EMOJIS[mood];
  const label = MOOD_LABELS[mood];
  const sizeClass = SIZE_CLASSES[size] || size;

  if (!emoji) {
    console.warn(`MoodEmoji: Invalid mood value "${mood}". Expected 1-5.`);
    return null;
  }

  return (
    <span
      className={`${sizeClass} leading-none inline-flex items-center justify-center ${className}`}
      role="img"
      aria-label={label}
      title={label}
    >
      {emoji}
      {showLabel && (
        <span className="sr-only">{label}</span>
      )}
    </span>
  );
}

// Export constants for external use
export { MOOD_EMOJIS, MOOD_LABELS };
