import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ChatChecklist({
  items = [],
  title,
  color = 'var(--apple-green)',
  secondaryItems,
  secondaryTitle,
  secondaryColor = 'var(--apple-red)',
  onComplete
}) {
  const [checked, setChecked] = useState({});

  const handleCheck = (key) => {
    navigator.vibrate?.(20);
    setChecked((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const renderList = (listItems, listTitle, listColor, prefix = '') => (
    <div className="mb-4 last:mb-0">
      {listTitle && (
        <h4
          className="font-semibold mb-2 flex items-center gap-2"
          style={{ color: listColor }}
        >
          {listColor === 'var(--apple-green)' ? '✓' : '✗'} {listTitle}
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
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
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
        </div>
      </div>
    </div>
  );
}
