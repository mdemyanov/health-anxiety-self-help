import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import ChatTypingIndicator from './ChatTypingIndicator';
import ChatTimer from './messages/ChatTimer';
import ChatSlider from './messages/ChatSlider';
import ChatChecklist from './messages/ChatChecklist';
import ChatQuote from './messages/ChatQuote';
import ChatMultiInput from './messages/ChatMultiInput';
import ChatComparison from './messages/ChatComparison';
import BreathingOverlay from './overlays/BreathingOverlay';

export default function ChatContainer({
  title,
  messages,
  awaitingInput,
  awaitingBreathing,
  isTyping,
  onUserInput,
  onInteractionComplete,
  onBack,
  collectedData,
  breathingOverlay,
  onBreathingStart,
  onBreathingComplete
}) {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  const renderMessageContent = (message) => {
    switch (message.type) {
      case 'timer':
        return (
          <ChatTimer
            duration={message.options?.duration || 10}
            autoStart={message.options?.autoStart}
            onComplete={() => onInteractionComplete?.(true)}
          />
        );

      case 'slider':
        return (
          <ChatSlider
            min={message.options?.min || 0}
            max={message.options?.max || 100}
            unit={message.options?.unit || '%'}
            initialValue={message.options?.initialValue}
            onSubmit={(value) => onInteractionComplete?.(value)}
          />
        );

      case 'checklist':
        return (
          <ChatChecklist
            items={message.options?.items || []}
            title={message.options?.title}
            color={message.options?.color}
            onComplete={() => onInteractionComplete?.(true)}
          />
        );

      case 'quote':
        return (
          <ChatQuote
            text={message.content}
            author={message.options?.author}
            items={message.options?.items}
          />
        );

      case 'multi-input':
        return (
          <ChatMultiInput
            count={message.options?.count || 5}
            sense={message.options?.sense}
            placeholder={message.options?.placeholder}
            onSubmit={(values) => onInteractionComplete?.(values)}
          />
        );

      case 'comparison':
        return (
          <ChatComparison
            before={message.options?.before}
            after={message.options?.after}
            beforeValue={collectedData?.[message.options?.before?.valueKey]}
            afterValue={collectedData?.[message.options?.after?.valueKey]}
            type={message.options?.type}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="chat-container flex flex-col min-h-screen" style={{ background: 'var(--background)' }}>
      {/* Header */}
      <div className="sticky top-0 z-50 px-3 pt-2 pb-1 safe-area-top">
        <div className="chat-header flex items-center gap-3 px-3 py-2.5 rounded-[20px]">
          <button
            onClick={handleBack}
            className="relative z-10 w-9 h-9 flex items-center justify-center rounded-full transition-transform active:scale-90"
            style={{ background: 'var(--glass-bg-button)' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <h1 className="relative z-10 headline flex-1">{title}</h1>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-4"
      >
        <div className="flex flex-col gap-3">
          <AnimatePresence mode="popLayout">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message}>
                {renderMessageContent(message)}
              </ChatMessage>
            ))}
          </AnimatePresence>

          {isTyping && <ChatTypingIndicator />}

          <div ref={messagesEndRef} className="h-4" />
        </div>
      </div>

      {/* Input */}
      {awaitingInput && (
        <div className="sticky bottom-0 z-40 px-4 py-3 safe-area-bottom" style={{ background: 'linear-gradient(to top, var(--background) 80%, transparent)' }}>
          <ChatInput
            onSubmit={onUserInput}
            placeholder={awaitingInput.placeholder || 'Напиши ответ...'}
            multiline={awaitingInput.multiline}
            statusHint={awaitingInput.statusHint}
          />
        </div>
      )}

      {/* Breathing Start Button - shown in input area */}
      {awaitingBreathing && !breathingOverlay && (
        <div className="sticky bottom-0 z-40 px-4 py-3 safe-area-bottom" style={{ background: 'linear-gradient(to top, var(--background) 80%, transparent)' }}>
          <button
            onClick={onBreathingStart}
            className="w-full card flex items-center justify-center gap-3 px-6 py-4 transition-transform active:scale-[0.98]"
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ background: 'var(--apple-blue)' }}
            >
              <span className="text-white text-2xl">🫁</span>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-base font-semibold">Начать дыхательную практику</span>
              <span className="text-sm" style={{ color: 'var(--label-secondary)' }}>
                {awaitingBreathing.cycles} цикла · {awaitingBreathing.pattern.replace('-', '/')} сек
              </span>
            </div>
          </button>
        </div>
      )}

      {/* Breathing Overlay */}
      <BreathingOverlay
        isOpen={!!breathingOverlay}
        pattern={breathingOverlay?.pattern}
        cycles={breathingOverlay?.cycles}
        onComplete={onBreathingComplete}
      />
    </div>
  );
}
