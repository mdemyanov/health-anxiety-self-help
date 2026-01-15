import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ChatInput({
  onSubmit,
  placeholder = 'Напиши ответ...',
  disabled = false,
  multiline = false,
  autoFocus = true,
  statusHint = null
}) {
  const [value, setValue] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (autoFocus && inputRef.current && !disabled) {
      inputRef.current.focus();
    }
  }, [autoFocus, disabled]);

  const handleSubmit = () => {
    if (value.trim() && !disabled) {
      navigator.vibrate?.(30);
      onSubmit(value.trim());
      setValue('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      // Enter или Cmd/Ctrl+Enter отправляет сообщение
      // Shift+Enter — новая строка (только в multiline)
      if (e.metaKey || e.ctrlKey || !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      {statusHint && (
        <motion.div
          key={statusHint}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-sm mb-2"
          style={{ color: 'var(--label-secondary)' }}
        >
          {statusHint}
        </motion.div>
      )}
      <div className="chat-input-bar flex items-center gap-3 p-2 pl-4 rounded-[24px]">
        {multiline ? (
          <textarea
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
            className="relative z-10 flex-1 bg-transparent border-none outline-none text-base resize-none max-h-24"
            style={{ color: 'var(--label)' }}
          />
        ) : (
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            onKeyDown={handleKeyDown}
            className="relative z-10 flex-1 bg-transparent border-none outline-none text-base"
            style={{ color: 'var(--label)' }}
          />
        )}

        <button
          className="relative z-10 w-10 h-10 flex items-center justify-center rounded-full transition-all active:scale-90"
          disabled={!value.trim() || disabled}
          style={{
            opacity: !value.trim() || disabled ? 0.4 : 1,
            color: 'var(--apple-blue)',
            background: 'var(--glass-bg-button)'
          }}
          onClick={handleSubmit}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
}
