import { useNavigate } from 'react-router-dom';
import { ChatContainer } from '../../components/chat';
import { useChatFlow } from '../../hooks/useChatFlow';
import { getFlowById } from '../../flows';

export default function ChatTool({ flowId }) {
  const navigate = useNavigate();
  const flowConfig = getFlowById(flowId);

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
  } = useChatFlow(flowConfig);

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
    />
  );
}
