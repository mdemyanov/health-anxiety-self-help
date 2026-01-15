import { useState, useCallback, useRef, useEffect } from 'react';

export function useChatFlow(flowConfig) {
  const [messages, setMessages] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [awaitingInput, setAwaitingInput] = useState(null);
  const [awaitingCompletion, setAwaitingCompletion] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [collectedData, setCollectedData] = useState({});
  const [isComplete, setIsComplete] = useState(false);

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

    // Save data
    if (awaitingInput.saveAs) {
      setCollectedData((prev) => ({
        ...prev,
        [awaitingInput.saveAs]: value,
      }));
    }

    setAwaitingInput(null);
    setCurrentMessageIndex((prev) => prev + 1);
  }, [awaitingInput, addMessage]);

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
    if (!awaitingInput && !awaitingCompletion) {
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
    setIsTyping(false);
    setCollectedData({});
    setIsComplete(false);
  }, []);

  return {
    messages,
    currentStep,
    currentStepIndex,
    awaitingInput,
    awaitingCompletion,
    isTyping,
    collectedData,
    isComplete,
    handleUserInput,
    handleInteractionComplete,
    reset,
    title: flowConfig?.title,
  };
}
