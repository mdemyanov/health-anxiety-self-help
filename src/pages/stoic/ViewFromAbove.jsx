import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui';

const STEPS = [
  {
    id: 'intro',
    title: 'Взгляд сверху',
    description: 'Эта медитация поможет увидеть свои проблемы в масштабе. Найди тихое место и закрой глаза.',
    icon: '🦅',
    duration: 0,
  },
  {
    id: 'room',
    title: 'Твоя комната',
    description: 'Представь себя в комнате, где ты сейчас находишься. Увидь себя сверху — маленькую фигурку.',
    icon: '🏠',
    duration: 15,
  },
  {
    id: 'building',
    title: 'Здание',
    description: 'Поднимись выше. Увидь всё здание — со всеми его комнатами и людьми внутри.',
    icon: '🏢',
    duration: 15,
  },
  {
    id: 'city',
    title: 'Город',
    description: 'Ещё выше. Твой город виден целиком — улицы, дома, парки. Тысячи людей со своими заботами.',
    icon: '🌆',
    duration: 20,
  },
  {
    id: 'country',
    title: 'Страна',
    description: 'Поднимись над страной. Города превращаются в точки. Миллионы жизней, миллионы историй.',
    icon: '🗺️',
    duration: 20,
  },
  {
    id: 'earth',
    title: 'Земля',
    description: 'Ты видишь Землю из космоса — голубой шар. 8 миллиардов людей. Твои проблемы — часть чего-то большего.',
    icon: '🌍',
    duration: 25,
  },
  {
    id: 'universe',
    title: 'Вселенная',
    description: 'Земля — песчинка среди миллиардов звёзд. Ты — часть этого бесконечного чуда.',
    icon: '✨',
    duration: 20,
  },
  {
    id: 'return',
    title: 'Возвращение',
    description: 'Медленно вернись обратно. В своё тело. В эту комнату. С новой перспективой.',
    icon: '🙏',
    duration: 15,
  },
  {
    id: 'complete',
    title: 'Отпусти',
    description: 'Твои тревоги реальны, но они — малая часть бесконечной вселенной. Это даёт свободу.',
    icon: '🕊️',
    duration: 0,
  },
];

export default function ViewFromAbove() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);

  const step = STEPS[currentStep];
  const progress = ((currentStep + 1) / STEPS.length) * 100;

  useEffect(() => {
    if (!isTimerActive || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsTimerActive(false);
          if (navigator.vibrate) {
            navigator.vibrate([50, 30, 50]);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimerActive, timeLeft]);

  const handleStartTimer = () => {
    if (navigator.vibrate) {
      navigator.vibrate(30);
    }
    setTimeLeft(step.duration);
    setIsTimerActive(true);
  };

  const handleNext = () => {
    if (navigator.vibrate) {
      navigator.vibrate(30);
    }
    setIsTimerActive(false);

    if (currentStep < STEPS.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      setTimeLeft(0);
    } else {
      navigate('/stoic');
    }
  };

  const handleBack = () => {
    setIsTimerActive(false);
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setTimeLeft(0);
    } else {
      navigate(-1);
    }
  };

  const showTimer = step.duration > 0;

  return (
    <div className="min-h-screen flex flex-col pb-24">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-800 z-50">
        <div
          className="h-full transition-all duration-300"
          style={{ width: `${progress}%`, background: 'var(--apple-blue)' }}
        />
      </div>

      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-40 px-4 py-4 flex items-center justify-between">
        <button
          className="p-2 rounded-full"
          style={{ background: 'var(--card-secondary)' }}
          onClick={handleBack}
        >
          <span className="text-lg">←</span>
        </button>
        <span className="headline">Взгляд сверху</span>
        <span className="footnote secondary-text">
          {currentStep + 1}/{STEPS.length}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-16">
        {/* Icon with animation */}
        <div
          className="w-28 h-28 rounded-full flex items-center justify-center mb-8 transition-transform duration-1000"
          style={{
            background: 'var(--card-secondary)',
            transform: isTimerActive ? 'scale(1.1)' : 'scale(1)',
          }}
        >
          <span className="text-6xl">{step.icon}</span>
        </div>

        {/* Title */}
        <h1 className="title-1 text-center mb-4">{step.title}</h1>

        {/* Description */}
        <p className="body-text secondary-text text-center max-w-sm mb-8">
          {step.description}
        </p>

        {/* Timer */}
        {showTimer && (
          <div className="text-center">
            {!isTimerActive && timeLeft === 0 && currentStep > 0 && (
              <p className="caption secondary-text mb-2">Визуализация завершена</p>
            )}
            {isTimerActive ? (
              <div className="flex flex-col items-center">
                <span className="title-large mb-2" style={{ color: 'var(--apple-blue)' }}>
                  {timeLeft}
                </span>
                <span className="caption secondary-text">секунд</span>
                <p className="subhead secondary-text mt-4">Закрой глаза и представь...</p>
              </div>
            ) : timeLeft === 0 && currentStep > 0 ? null : (
              <Button
                variant="tinted"
                onClick={handleStartTimer}
                style={{ background: 'rgba(0, 122, 255, 0.15)', color: 'var(--apple-blue)' }}
              >
                Начать визуализацию ({step.duration} сек)
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Next button */}
      <div className="fixed bottom-24 left-0 right-0 px-6">
        <Button
          variant="filled"
          className="w-full py-4"
          onClick={handleNext}
        >
          {step.id === 'complete' ? 'Завершить' : 'Далее'}
        </Button>
      </div>
    </div>
  );
}
