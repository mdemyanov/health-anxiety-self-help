import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatContainer } from '../../components/chat';
import { useChatFlow } from '../../hooks/useChatFlow';
import { getFlowById } from '../../flows';

// Format time ago in Russian
function formatTimeAgo(timestamp) {
  const diff = Date.now() - timestamp;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);

  if (minutes < 60) {
    return `${minutes} мин. назад`;
  }
  return `${hours} ч. назад`;
}

export default function ChatTool({ flowId }) {
  const navigate = useNavigate();
  const flowConfig = getFlowById(flowId);
  const [showDraftDialog, setShowDraftDialog] = useState(false);
  const [draftInfo, setDraftInfo] = useState(null);
  const [inputPrefill, setInputPrefill] = useState('');

  // Handler for question prompt clicks (inserts text into input)
  const handleQuestionPromptClick = (question) => {
    setInputPrefill(question);
  };

  const {
    messages,
    awaitingInput,
    awaitingBreathing,
    awaitingTimer,
    isTyping,
    handleUserInput,
    handleInteractionComplete,
    handleBreathingStart,
    handleBreathingComplete,
    handleTimerComplete,
    breathingOverlay,
    collectedData,
    isComplete,
    title,
    currentStepIndex,
    totalSteps,
    goBack,
    canGoBack,
    getDraft,
    clearDraft,
  } = useChatFlow(flowConfig);

  // Check for draft on mount
  useEffect(() => {
    const draft = getDraft();
    if (draft && Object.keys(draft.collectedData || {}).length > 0) {
      setDraftInfo(draft);
      setShowDraftDialog(true);
    }
  }, [getDraft]);

  const handleContinueDraft = () => {
    // Draft data is already loaded via getDraft, we just close dialog
    // Flow will continue from saved state
    setShowDraftDialog(false);
  };

  const handleStartFresh = () => {
    clearDraft();
    setShowDraftDialog(false);
    // Page will re-render with fresh flow
    window.location.reload();
  };

  const handleBack = () => {
    // Determine where to navigate back based on flow type
    if (flowId === 'sos') {
      navigate('/');
    } else if (['morning', 'evening', 'view-from-above'].includes(flowId)) {
      navigate('/stoic');
    } else {
      navigate('/tools');
    }
  };

  if (!flowConfig) {
    navigate('/');
    return null;
  }

  return (
    <>
      <ChatContainer
        title={title}
        messages={messages}
        awaitingInput={awaitingInput}
        awaitingBreathing={awaitingBreathing}
        awaitingTimer={awaitingTimer}
        isTyping={isTyping}
        onUserInput={handleUserInput}
        onInteractionComplete={handleInteractionComplete}
        onTimerComplete={handleTimerComplete}
        onBack={handleBack}
        collectedData={collectedData}
        breathingOverlay={breathingOverlay}
        onBreathingStart={handleBreathingStart}
        onBreathingComplete={handleBreathingComplete}
        currentStepIndex={currentStepIndex}
        totalSteps={totalSteps}
        canGoBack={canGoBack}
        onGoBack={goBack}
        onQuestionPromptClick={handleQuestionPromptClick}
        inputPrefill={inputPrefill}
      />

      {/* Draft continuation dialog */}
      <AnimatePresence>
        {showDraftDialog && draftInfo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[var(--bg-primary)] rounded-2xl p-6 max-w-sm w-full shadow-xl"
            >
              <h3 className="headline text-lg mb-2">Продолжить?</h3>
              <p className="body-text mb-1">
                У тебя есть незавершённая сессия
              </p>
              <p className="secondary-text text-sm mb-6">
                {formatTimeAgo(draftInfo.timestamp)}
              </p>

              <div className="flex gap-3">
                <button
                  onClick={handleStartFresh}
                  className="flex-1 py-3 px-4 rounded-xl bg-[var(--bg-secondary)] body-text"
                >
                  Начать заново
                </button>
                <button
                  onClick={handleContinueDraft}
                  className="flex-1 py-3 px-4 rounded-xl bg-[var(--apple-blue)] text-white font-medium"
                >
                  Продолжить
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
