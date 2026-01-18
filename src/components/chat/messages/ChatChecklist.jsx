import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X } from '../../icons';

export default function ChatChecklist({
  items = [],
  title,
  color = 'var(--apple-green)',
  secondaryItems,
  secondaryTitle,
  secondaryColor = 'var(--apple-red)',
  onComplete,
  showContinueButton = false,
}) {
  const [checked, setChecked] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);

  const handleCheck = (key) => {
    if (isCompleted) return;
    navigator.vibrate?.(20);
    setChecked((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleContinue = () => {
    if (isCompleted) return;
    setIsCompleted(true);
    navigator.vibrate?.(30);

    // Collect selected items from primary list
    const selectedItems = items.filter((_, i) => checked[i.toString()]);

    onComplete?.(selectedItems);
  };

  const renderList = (listItems, listTitle, listColor, prefix = '') => (
    <div className="mb-4 last:mb-0">
      {listTitle && (
        <h4
          className="font-semibold mb-2 flex items-center gap-2"
          style={{ color: listColor }}
        >
          {listColor === 'var(--apple-green)'
            ? <Check size={16} strokeWidth={3} />
            : <X size={16} strokeWidth={3} />
          } {listTitle}
        </h4>
      )}
      <div className="space-y-2">
        {listItems.map((item, i) => {
          const key = `${prefix}${i}`;
          return (
            <motion.label
              key={key}
              className="flex items-center gap-3 cursor-pointer"
              whileTap={{ scale: 0.98 }}
            >
              <div
                className="w-5 h-5 rounded border-2 flex items-center justify-center transition-colors"
                style={{
                  borderColor: checked[key] ? listColor : 'var(--glass-border)',
                  background: checked[key] ? listColor : 'transparent',
                }}
                onClick={() => handleCheck(key)}
              >
                {checked[key] && (
                  <Check size={12} color="white" strokeWidth={3} />
                )}
              </div>
              <span className="text-base">{item}</span>
            </motion.label>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="mt-3">
      <div className="card p-4">
        <div className="relative z-10">
          {renderList(items, title, color)}
          {secondaryItems && renderList(secondaryItems, secondaryTitle, secondaryColor, 'secondary-')}

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
