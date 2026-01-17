import { useState, useCallback, useRef, useEffect } from 'react';

// Russian pluralization helper
const pluralize = (count, one, few, many) => {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod100 >= 11 && mod100 <= 14) return many;
  if (mod10 === 1) return one;
  if (mod10 >= 2 && mod10 <= 4) return few;
  return many;
};

const formatStatusHint = (template, remaining) => {
  if (!template || remaining <= 0) return null;
  const word = pluralize(remaining, 'вещь', 'вещи', 'вещей');
  return template.replace('{remaining}', `${remaining} ${word}`);
};

export function useChatFlow(flowConfig) {
  const [messages, setMessages] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [awaitingInput, setAwaitingInput] = useState(null);
  const [awaitingCompletion, setAwaitingCompletion] = useState(null);
  const [repeatedInputState, setRepeatedInputState] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [collectedData, setCollectedData] = useState({});
  const [isComplete, setIsComplete] = useState(false);
  const [breathingOverlay, setBreathingOverlay] = useState(null);
  const [awaitingBreathing, setAwaitingBreathing] = useState(null);
  const [awaitingTimer, setAwaitingTimer] = useState(null);

  const timeoutRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const currentStep = flowConfig?.steps?.[currentStepIndex];

  // Generate unique message ID
  const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  // Add message to chat
  const addMessage = useCallback((message) => {
    const newMessage = {
      ...message,
      id: generateId(),
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, newMessage]);

    // Haptic feedback for therapist messages
    if (message.sender === 'therapist') {
      navigator.vibrate?.(10);
    }

    return newMessage;
  }, []);

  // Process next message in current step
  const processNextMessage = useCallback(() => {
    if (!currentStep || isComplete) return;

    const stepMessages = currentStep.messages || [];

    // Check if we've processed all messages in current step
    if (currentMessageIndex >= stepMessages.length) {
      // Execute step onComplete if exists
      if (currentStep.onComplete) {
        currentStep.onComplete(collectedData);
      }

      // Move to next step
      if (currentStepIndex < flowConfig.steps.length - 1) {
        setCurrentStepIndex((prev) => prev + 1);
        setCurrentMessageIndex(0);
      } else {
        // Flow complete
        setIsComplete(true);
        if (flowConfig.onComplete) {
          flowConfig.onComplete(collectedData);
        }
      }
      return;
    }

    const msgConfig = stepMessages[currentMessageIndex];
    const delay = msgConfig.delay ?? 0;

    // Show typing indicator only for therapist messages with delay
    const isTherapistMessage = msgConfig.type?.startsWith('therapist');
    if (isTherapistMessage && delay > 300) {
      setIsTyping(true);
      typingTimeoutRef.current = setTimeout(() => {
        setIsTyping(false);
      }, delay - 200);
    }

    // Add message after delay
    timeoutRef.current = setTimeout(() => {
      setIsTyping(false);

      // Handle breathing type - show button in input area, user initiates overlay
      if (msgConfig.type === 'breathing') {
        setAwaitingBreathing({
          pattern: msgConfig.options?.pattern || '4-4',
          cycles: msgConfig.options?.cycles || 3,
          saveAs: msgConfig.saveAs,
        });
        return;
      }

      // Handle timer type - show progress bar in input area
      if (msgConfig.type === 'timer') {
        setAwaitingTimer({
          duration: msgConfig.options?.duration || 10,
          saveAs: msgConfig.saveAs,
        });
        return;
      }

      const sender = msgConfig.type?.startsWith('therapist') ? 'therapist'
        : msgConfig.type === 'system' ? 'system'
        : 'interactive';

      addMessage({
        type: msgConfig.type,
        sender,
        content: msgConfig.content,
        options: msgConfig.options,
      });

      // Check if we need to wait for input or interaction
      if (msgConfig.awaitInput) {
        setAwaitingInput({
          placeholder: msgConfig.inputPlaceholder,
          saveAs: msgConfig.saveAs,
          multiline: msgConfig.multiline,
        });
      } else if (msgConfig.type === 'repeated-input') {
        // Initialize repeated input mode
        const { count, placeholder, statusHintTemplate } = msgConfig.options || {};
        setRepeatedInputState({
          count,
          current: 0,
          values: [],
          saveAs: msgConfig.saveAs,
          options: msgConfig.options,
        });
        setAwaitingInput({
          placeholder: placeholder || 'Напиши ответ...',
          statusHint: formatStatusHint(statusHintTemplate, count),
        });
        // Do NOT advance currentMessageIndex - wait for all inputs
      } else if (msgConfig.awaitCompletion) {
        setAwaitingCompletion({
          saveAs: msgConfig.saveAs,
        });
      } else {
        // Move to next message
        setCurrentMessageIndex((prev) => prev + 1);
      }
    }, delay);
  }, [currentStep, currentMessageIndex, currentStepIndex, flowConfig, collectedData, addMessage, isComplete]);

  // Handle user text input
  const handleUserInput = useCallback((value) => {
    if (!awaitingInput) return;

    // Add user message
    addMessage({
      type: 'user-text',
      sender: 'user',
      content: value,
    });

    // Handle repeated input mode
    if (repeatedInputState) {
      const newValues = [...repeatedInputState.values, value];
      const remaining = repeatedInputState.count - newValues.length;

      if (remaining > 0) {
        // More inputs needed
        setRepeatedInputState({
          ...repeatedInputState,
          current: newValues.length,
          values: newValues,
        });
        setAwaitingInput({
          ...awaitingInput,
          statusHint: formatStatusHint(repeatedInputState.options.statusHintTemplate, remaining),
        });
      } else {
        // All inputs collected
        if (repeatedInputState.saveAs) {
          setCollectedData((prev) => ({
            ...prev,
            [repeatedInputState.saveAs]: newValues,
          }));
        }
        setRepeatedInputState(null);
        setAwaitingInput(null);
        setCurrentMessageIndex((prev) => prev + 1);
      }
      return;
    }

    // Regular input: save data
    if (awaitingInput.saveAs) {
      setCollectedData((prev) => ({
        ...prev,
        [awaitingInput.saveAs]: value,
      }));
    }

    setAwaitingInput(null);
    setCurrentMessageIndex((prev) => prev + 1);
  }, [awaitingInput, repeatedInputState, addMessage]);

  // Handle interaction completion (timer, slider, etc.)
  const handleInteractionComplete = useCallback((value) => {
    // Save data if needed
    if (awaitingCompletion?.saveAs) {
      setCollectedData((prev) => ({
        ...prev,
        [awaitingCompletion.saveAs]: value,
      }));
    }

    setAwaitingCompletion(null);
    setCurrentMessageIndex((prev) => prev + 1);
  }, [awaitingCompletion]);

  // Handle breathing start (user clicks button to open overlay)
  const handleBreathingStart = useCallback(() => {
    if (!awaitingBreathing) return;
    navigator.vibrate?.(30);
    setBreathingOverlay({
      pattern: awaitingBreathing.pattern,
      cycles: awaitingBreathing.cycles,
    });
  }, [awaitingBreathing]);

  // Handle breathing overlay completion
  const handleBreathingComplete = useCallback(() => {
    setBreathingOverlay(null);
    setAwaitingBreathing(null);
    setCurrentMessageIndex((prev) => prev + 1);
  }, []);

  // Handle timer completion
  const handleTimerComplete = useCallback(() => {
    // Save data if needed
    if (awaitingTimer?.saveAs) {
      setCollectedData((prev) => ({
        ...prev,
        [awaitingTimer.saveAs]: true,
      }));
    }
    setAwaitingTimer(null);
    setCurrentMessageIndex((prev) => prev + 1);
  }, [awaitingTimer]);

  // Process messages when step/message index changes
  useEffect(() => {
    // Clear any pending timeouts
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Only process if not waiting for user
    if (!awaitingInput && !awaitingCompletion && !awaitingBreathing && !awaitingTimer) {
      processNextMessage();
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [currentMessageIndex, currentStepIndex, awaitingInput, awaitingCompletion, processNextMessage]);

  // Reset flow
  const reset = useCallback(() => {
    setMessages([]);
    setCurrentStepIndex(0);
    setCurrentMessageIndex(0);
    setAwaitingInput(null);
    setAwaitingCompletion(null);
    setRepeatedInputState(null);
    setIsTyping(false);
    setCollectedData({});
    setIsComplete(false);
    setBreathingOverlay(null);
    setAwaitingBreathing(null);
    setAwaitingTimer(null);
  }, []);

  return {
    messages,
    currentStep,
    currentStepIndex,
    awaitingInput,
    awaitingCompletion,
    awaitingBreathing,
    awaitingTimer,
    isTyping,
    collectedData,
    isComplete,
    handleUserInput,
    handleInteractionComplete,
    handleBreathingStart,
    handleBreathingComplete,
    handleTimerComplete,
    breathingOverlay,
    reset,
    title: flowConfig?.title,
  };
}
