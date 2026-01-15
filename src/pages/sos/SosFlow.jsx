import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui';
import BreathingCircle from '../../components/breathing/BreathingCircle';

const STEPS = [
  {
    id: 'welcome',
    title: 'Начнём с дыхания',
    description: 'Глубокое дыхание активирует парасимпатическую нервную систему и помогает телу успокоиться.',
    icon: '🌬️',
  },
  {
    id: 'breathing',
    title: 'Дыши со мной',
    description: 'Следуй за кругом: вдох когда он увеличивается, выдох когда уменьшается.',
    icon: '🫁',
    isBreathing: true,
  },
  {
    id: 'grounding-intro',
    title: 'Техника 5-4-3-2-1',
    description: 'Теперь давай заземлимся. Эта техника поможет вернуться в настоящий момент.',
    icon: '🧊',
  },
  {
    id: 'grounding-5',
    title: '5 вещей',
    description: 'Назови 5 вещей, которые ты ВИДИШЬ вокруг себя прямо сейчас.',
    icon: '👀',
    isGrounding: true,
    count: 5,
    sense: 'вижу',
  },
  {
    id: 'grounding-4',
    title: '4 вещи',
    description: 'Назови 4 вещи, которые ты можешь ПОТРОГАТЬ.',
    icon: '✋',
    isGrounding: true,
    count: 4,
    sense: 'трогаю',
  },
  {
    id: 'grounding-3',
    title: '3 звука',
    description: 'Назови 3 звука, которые ты СЛЫШИШЬ.',
    icon: '👂',
    isGrounding: true,
    count: 3,
    sense: 'слышу',
  },
  {
    id: 'grounding-2',
    title: '2 запаха',
    description: 'Назови 2 запаха, которые ты ЧУВСТВУЕШЬ.',
    icon: '👃',
    isGrounding: true,
    count: 2,
    sense: 'чувствую',
  },
  {
    id: 'grounding-1',
    title: '1 вкус',
    description: 'Назови 1 вкус, который ты ощущаешь или можешь представить.',
    icon: '👅',
    isGrounding: true,
    count: 1,
    sense: 'ощущаю',
  },
  {
    id: 'thoughts',
    title: 'Работа с мыслями',
    description: 'Теперь давай посмотрим на тревожные мысли. Помни: мысль — это не факт.',
    icon: '💭',
  },
  {
    id: 'dichotomy',
    title: 'Что я могу контролировать?',
    description: 'Раздели свои беспокойства на то, что ты можешь контролировать, и то, что нет.',
    icon: '⚖️',
    isDichotomy: true,
  },
  {
    id: 'complete',
    title: 'Отлично!',
    description: 'Ты прошёл через это. Помни: тревога временна, и у тебя есть инструменты, чтобы с ней справиться.',
    icon: '🌟',
    isComplete: true,
  },
];

export default function SosFlow() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [groundingInputs, setGroundingInputs] = useState({});
  const [dichotomy, setDichotomy] = useState({ canControl: [], cannotControl: [] });

  const step = STEPS[currentStep];
  const progress = ((currentStep + 1) / STEPS.length) * 100;

  const handleNext = () => {
    if (navigator.vibrate) {
      navigator.vibrate(30);
    }
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate('/');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate(-1);
    }
  };

  const handleGroundingInput = (index, value) => {
    setGroundingInputs({
      ...groundingInputs,
      [`${step.id}-${index}`]: value,
    });
  };

  const isGroundingComplete = () => {
    if (!step.isGrounding) return true;
    for (let i = 0; i < step.count; i++) {
      if (!groundingInputs[`${step.id}-${i}`]) return false;
    }
    return true;
  };

  return (
    <div className="min-h-screen flex flex-col pb-24">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-800 z-50">
        <div
          className="h-full transition-all duration-300"
          style={{
            width: `${progress}%`,
            background: 'var(--apple-blue)',
          }}
        />
      </div>

      {/* Back button */}
      <button
        className="fixed top-4 left-4 z-50 p-2 rounded-full"
        style={{ background: 'var(--card-secondary)' }}
        onClick={handleBack}
      >
        <span className="text-lg">←</span>
      </button>

      {/* Step counter */}
      <div className="fixed top-4 right-4 z-50">
        <span className="footnote secondary-text">
          {currentStep + 1} / {STEPS.length}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-16">
        {/* Icon */}
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
          style={{ background: 'var(--card-secondary)' }}
        >
          <span className="text-4xl">{step.icon}</span>
        </div>

        {/* Title */}
        <h1 className="title-2 text-center mb-4">{step.title}</h1>

        {/* Description */}
        <p className="body-text secondary-text text-center max-w-sm mb-8">
          {step.description}
        </p>

        {/* Breathing circle */}
        {step.isBreathing && (
          <div className="mb-8">
            <BreathingCircle duration={4000} />
          </div>
        )}

        {/* Grounding inputs */}
        {step.isGrounding && (
          <div className="w-full max-w-sm space-y-3 mb-8">
            {Array.from({ length: step.count }).map((_, i) => (
              <input
                key={i}
                type="text"
                className="form-input"
                placeholder={`${i + 1}. Я ${step.sense}...`}
                value={groundingInputs[`${step.id}-${i}`] || ''}
                onChange={(e) => handleGroundingInput(i, e.target.value)}
              />
            ))}
          </div>
        )}

        {/* Dichotomy section */}
        {step.isDichotomy && (
          <div className="w-full max-w-sm space-y-4 mb-8">
            <div className="card p-4">
              <h3 className="headline mb-3" style={{ color: 'var(--apple-green)' }}>
                Могу контролировать
              </h3>
              <div className="space-y-2">
                {['Мои действия', 'Мои мысли', 'Мой выбор', 'Как я реагирую'].map((item, i) => (
                  <label key={i} className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      className="w-5 h-5 rounded"
                      checked={dichotomy.canControl.includes(item)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setDichotomy({
                            ...dichotomy,
                            canControl: [...dichotomy.canControl, item],
                          });
                        } else {
                          setDichotomy({
                            ...dichotomy,
                            canControl: dichotomy.canControl.filter((x) => x !== item),
                          });
                        }
                      }}
                    />
                    <span className="subhead">{item}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="card p-4">
              <h3 className="headline mb-3" style={{ color: 'var(--apple-red)' }}>
                Не могу контролировать
              </h3>
              <div className="space-y-2">
                {['Мнение других', 'Прошлое', 'Будущее', 'Результаты анализов'].map((item, i) => (
                  <label key={i} className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      className="w-5 h-5 rounded"
                      checked={dichotomy.cannotControl.includes(item)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setDichotomy({
                            ...dichotomy,
                            cannotControl: [...dichotomy.cannotControl, item],
                          });
                        } else {
                          setDichotomy({
                            ...dichotomy,
                            cannotControl: dichotomy.cannotControl.filter((x) => x !== item),
                          });
                        }
                      }}
                    />
                    <span className="subhead">{item}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Complete message */}
        {step.isComplete && (
          <div className="text-center mb-8">
            <p className="callout secondary-text">
              Сохрани это в памяти: ты справился с тревогой.
              <br />
              Каждый раз, когда ты это делаешь, становишься сильнее.
            </p>
          </div>
        )}
      </div>

      {/* Next button */}
      <div className="fixed bottom-24 left-0 right-0 px-6">
        <Button
          variant="filled"
          className="w-full py-4"
          onClick={handleNext}
          disabled={step.isGrounding && !isGroundingComplete()}
        >
          {step.isComplete ? 'Вернуться на главную' : 'Продолжить'}
        </Button>
      </div>
    </div>
  );
}
