import { useState, useRef, useEffect, useCallback } from 'react';
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

  // Auto-focus on mount
  useEffect(() => {
    if (autoFocus && inputRef.current && !disabled) {
      inputRef.current.focus();
    }
  }, [autoFocus, disabled]);

  // Auto-expand textarea based on content (Telegram-style)
  const adjustTextareaHeight = useCallback(() => {
    const textarea = inputRef.current;
    if (!textarea || !multiline) return;

    // Reset height to auto to get accurate scrollHeight
    textarea.style.height = 'auto';
    // Set new height, max 144px (~6 lines)
    const newHeight = Math.min(textarea.scrollHeight, 144);
    textarea.style.height = `${newHeight}px`;
  }, [multiline]);

  useEffect(() => {
    adjustTextareaHeight();
  }, [value, adjustTextareaHeight]);

  const handleSubmit = () => {
    if (value.trim() && !disabled) {
      navigator.vibrate?.(30);
      onSubmit(value.trim());
      setValue('');
      // Reset textarea height after submit
      if (inputRef.current && multiline) {
        inputRef.current.style.height = 'auto';
      }
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
            className="relative z-10 flex-1 bg-transparent border-none outline-none text-base resize-none overflow-hidden"
            style={{
              color: 'var(--label)',
              minHeight: '24px',
              maxHeight: '144px',
              transition: 'height 0.1s ease-out'
            }}
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
          className="relative z-10 w-11 h-11 flex items-center justify-center rounded-full transition-all active:scale-90 focus-visible:ring-2 focus-visible:ring-offset-1"
          disabled={!value.trim() || disabled}
          style={{
            opacity: !value.trim() || disabled ? 0.4 : 1,
            color: 'var(--apple-blue)',
            background: 'var(--glass-bg-button)',
            '--tw-ring-color': 'var(--apple-blue)'
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
