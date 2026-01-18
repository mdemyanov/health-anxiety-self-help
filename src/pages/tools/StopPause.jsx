import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui';
import { ChevronLeft, Check } from '../../components/icons';

const STEPS = [
  {
    letter: 'С',
    title: 'Стоп',
    description: 'Остановись. Прекрати то, что ты делаешь. Замри на мгновение.',
    instruction: 'Просто остановись и ничего не делай 10 секунд.',
    duration: 10,
  },
  {
    letter: 'Т',
    title: 'Тело',
    description: 'Обрати внимание на своё тело. Где ты чувствуешь напряжение?',
    instruction: 'Расслабь плечи, разожми челюсть, расслабь руки.',
    duration: 15,
  },
  {
    letter: 'О',
    title: 'Осознание',
    description: 'Осознай свои мысли. Что сейчас происходит в твоей голове?',
    instruction: 'Просто наблюдай за мыслями, не оценивая их.',
    duration: 15,
  },
  {
    letter: 'П',
    title: 'Продолжай',
    description: 'Теперь можешь продолжить свой день с новым осознанием.',
    instruction: 'Выбери одно маленькое действие, которое сделаешь прямо сейчас.',
    duration: 0,
  },
];

export default function StopPause() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [timeLeft, setTimeLeft] = useState(STEPS[0].duration);
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
            navigator.vibrate([100, 50, 100]);
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
    setIsTimerActive(true);
  };

  const handleNext = () => {
    if (navigator.vibrate) {
      navigator.vibrate(30);
    }
    if (currentStep < STEPS.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      setTimeLeft(STEPS[nextStep].duration);
      setIsTimerActive(false);
    } else {
      navigate('/tools');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      setTimeLeft(STEPS[prevStep].duration);
      setIsTimerActive(false);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col pb-24">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-800 z-50">
        <div
          className="h-full transition-all duration-300"
          style={{ width: `${progress}%`, background: 'var(--apple-orange)' }}
        />
      </div>

      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-40 px-4 py-4 flex items-center justify-between">
        <button
          className="p-2 rounded-full flex items-center justify-center"
          style={{ background: 'var(--card-secondary)' }}
          onClick={handleBack}
        >
          <ChevronLeft size={20} />
        </button>
        <span className="headline">СТОП-пауза</span>
        <span className="footnote secondary-text">
          {currentStep + 1}/{STEPS.length}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-16">
        {/* Letter */}
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center mb-6"
          style={{ background: 'var(--apple-orange)', opacity: 0.9 }}
        >
          <span className="text-5xl font-bold text-white">{step.letter}</span>
        </div>

        {/* Title */}
        <h1 className="title-1 text-center mb-4">{step.title}</h1>

        {/* Description */}
        <p className="body-text secondary-text text-center max-w-sm mb-6">
          {step.description}
        </p>

        {/* Instruction card */}
        <div className="card p-4 w-full max-w-sm mb-8">
          <p className="callout text-center">{step.instruction}</p>
        </div>

        {/* Timer */}
        {step.duration > 0 && (
          <div className="text-center mb-6">
            {!isTimerActive && timeLeft > 0 ? (
              <Button
                variant="tinted"
                onClick={handleStartTimer}
                style={{ background: 'rgba(255, 149, 0, 0.15)', color: 'var(--apple-orange)' }}
              >
                Начать таймер ({step.duration} сек)
              </Button>
            ) : isTimerActive ? (
              <div className="flex flex-col items-center gap-2">
                <span className="title-large" style={{ color: 'var(--apple-orange)' }}>
                  {timeLeft}
                </span>
                <span className="caption secondary-text">секунд осталось</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Check size={28} className="text-[var(--apple-green)]" />
                <span className="headline" style={{ color: 'var(--apple-green)' }}>
                  Готово!
                </span>
              </div>
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
          style={{ background: 'var(--apple-orange)' }}
        >
          {currentStep === STEPS.length - 1 ? 'Завершить' : 'Далее'}
        </Button>
      </div>
    </div>
  );
}
