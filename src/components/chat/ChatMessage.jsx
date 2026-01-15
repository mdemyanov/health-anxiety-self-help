import { motion } from 'framer-motion';

export default function ChatMessage({ message, children }) {
  const isTherapist = message.sender === 'therapist';
  const isUser = message.sender === 'user';
  const isSystem = message.sender === 'system';

  if (isSystem) {
    return (
      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        <div
          className="px-4 py-2 rounded-full text-sm"
          style={{
            background: 'var(--glass-bg-button)',
            color: 'var(--label-secondary)'
          }}
        >
          {message.content}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      <div className={`max-w-[85%] ${isUser ? 'order-1' : ''}`}>
        <div
          className={`px-4 py-3 ${isUser ? 'chat-bubble-user' : 'chat-bubble-therapist'}`}
          style={isUser ? {
            background: 'var(--apple-blue)',
            color: 'white',
            boxShadow: '0 2px 8px rgba(0, 122, 255, 0.3)'
          } : {
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(var(--glass-blur))',
            WebkitBackdropFilter: 'blur(var(--glass-blur))',
            border: '0.5px solid var(--glass-border)',
            boxShadow: 'var(--glass-shadow)'
          }}
        >
          {message.content && (
            <p className="text-base leading-relaxed">{message.content}</p>
          )}
          {children}
        </div>
      </div>
    </motion.div>
  );
}
