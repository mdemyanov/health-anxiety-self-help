import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from '../../icons';

// Данные когнитивных искажений с подсказками
const distortionHints = {
  'Чёрно-белое мышление — "всё или ничего"': {
    hint: 'Видишь только крайности, без середины',
    example: '«Либо идеально, либо провал»',
  },
  'Сверхобобщение — "всегда", "никогда"': {
    hint: 'Один случай = всегда так',
    example: '«У меня никогда ничего не получается»',
  },
  'Негативный фильтр — фокус только на плохом': {
    hint: 'Замечаешь только плохое',
    example: '«Весь день был ужасным» (хотя было и хорошее)',
  },
  'Обесценивание позитивного — "это не считается"': {
    hint: 'Хорошее не считается',
    example: '«Это просто повезло»',
  },
  'Чтение мыслей — "он думает, что я..."': {
    hint: 'Уверен, что знаешь чужие мысли',
    example: '«Он точно думает, что я некомпетентен»',
  },
  'Предсказание будущего — "точно будет плохо"': {
    hint: 'Уверен в негативном исходе',
    example: '«Это точно провалится»',
  },
  'Катастрофизация — "это конец всему"': {
    hint: 'Раздуваешь последствия',
    example: '«Если ошибусь — всё рухнет»',
  },
  'Эмоциональное обоснование — "чувствую = правда"': {
    hint: 'Чувство = факт',
    example: '«Я чувствую себя неудачником, значит так и есть»',
  },
  'Долженствования — "я должен", "они должны"': {
    hint: 'Жёсткие требования к себе/другим',
    example: '«Я должен всё контролировать»',
  },
  'Навешивание ярлыков — "я неудачник"': {
    hint: 'Глобальная оценка вместо конкретики',
    example: '«Я неудачник» вместо «Я ошибся в этом»',
  },
};

export default function ChatChecklistWithHints({
  items = [],
  title,
  color = 'var(--apple-orange)',
  onComplete,
  showContinueButton = false,
}) {
  const [checked, setChecked] = useState({});
  const [expanded, setExpanded] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);

  const handleCheck = (index) => {
    if (isCompleted) return;
    navigator.vibrate?.(20);
    setChecked((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const toggleExpand = (index, e) => {
    e.stopPropagation();
    navigator.vibrate?.(10);
    setExpanded((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleContinue = () => {
    if (isCompleted) return;
    setIsCompleted(true);
    navigator.vibrate?.(30);
    const selectedItems = items.filter((_, i) => checked[i]);
    onComplete?.(selectedItems);
  };

  return (
    <div className="mt-3">
      <div className="card p-4">
        <div className="relative z-10">
          {title && (
            <h4
              className="font-semibold mb-3 flex items-center gap-2"
              style={{ color }}
            >
              {title}
            </h4>
          )}

          <div className="space-y-2">
            {items.map((item, i) => {
              const hintData = distortionHints[item];
              const isExpanded = expanded[i];

              return (
                <div key={i}>
                  <motion.div
                    className="flex items-start gap-3 cursor-pointer p-2 rounded-lg transition-colors"
                    style={{
                      background: checked[i] ? `${color}15` : 'transparent',
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleCheck(i)}
                  >
                    {/* Checkbox */}
                    <div
                      className="w-5 h-5 rounded border-2 flex items-center justify-center transition-colors flex-shrink-0 mt-0.5"
                      style={{
                        borderColor: checked[i] ? color : 'var(--glass-border)',
                        background: checked[i] ? color : 'transparent',
                      }}
                    >
                      {checked[i] && (
                        <Check size={12} color="white" strokeWidth={3} />
                      )}
                    </div>

                    {/* Label + hint button */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-base">{item}</span>
                        {hintData && (
                          <button
                            onClick={(e) => toggleExpand(i, e)}
                            className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-colors"
                            style={{
                              background: isExpanded ? color : 'var(--glass-bg)',
                              color: isExpanded ? 'white' : 'var(--label-secondary)',
                            }}
                          >
                            <span className="text-xs font-medium">?</span>
                          </button>
                        )}
                      </div>

                      {/* Hint text (always visible if available) */}
                      {hintData && (
                        <p
                          className="text-xs mt-1"
                          style={{ color: 'var(--label-secondary)' }}
                        >
                          {hintData.hint}
                        </p>
                      )}
                    </div>
                  </motion.div>

                  {/* Expanded example */}
                  <AnimatePresence>
                    {hintData && isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="ml-10 overflow-hidden"
                      >
                        <div
                          className="p-3 rounded-lg mt-1 mb-2"
                          style={{ background: 'var(--glass-bg)' }}
                        >
                          <p className="text-sm font-medium" style={{ color }}>
                            Пример:
                          </p>
                          <p className="text-sm italic mt-1">
                            {hintData.example}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {showContinueButton && !isCompleted && (
            <motion.button
              className="mt-4 w-full py-3 rounded-xl font-medium transition-colors"
              style={{
                background: 'var(--apple-blue)',
                color: 'white',
              }}
              whileTap={{ scale: 0.98 }}
              onClick={handleContinue}
            >
              Продолжить
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
}
