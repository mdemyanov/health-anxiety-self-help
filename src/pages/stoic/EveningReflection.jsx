import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from '../../components/ui';

const STEPS = [
  {
    id: 'welcome',
    title: 'Добрый вечер',
    description: 'Время подвести итоги дня. Эта практика поможет тебе расслабиться.',
    icon: '🌙',
  },
  {
    id: 'intention-review',
    title: 'Твоё намерение',
    description: 'Давай вспомним, какое намерение ты ставил утром.',
    icon: '🎯',
    showIntention: true,
  },
  {
    id: 'what-went-well',
    title: 'Что было хорошо?',
    description: 'Назови 3 вещи, которые сегодня прошли хорошо.',
    prompt: 'Сегодня было хорошо:',
    placeholder: '1. ...\n2. ...\n3. ...',
    icon: '✨',
    hasInput: true,
  },
  {
    id: 'what-learned',
    title: 'Чему ты научился?',
    description: 'Каждый день — возможность для роста.',
    prompt: 'Сегодня я узнал/понял:',
    placeholder: 'Например: Понял, что могу справиться с тревогой...',
    icon: '📚',
    hasInput: true,
  },
  {
    id: 'what-could-improve',
    title: 'Что можно улучшить?',
    description: 'Без самокритики — просто наблюдение.',
    prompt: 'Завтра я мог бы:',
    placeholder: 'Например: Раньше начать дыхательную технику...',
    icon: '🔄',
    hasInput: true,
  },
  {
    id: 'gratitude',
    title: 'Благодарность',
    description: 'За что ты благодарен сегодня?',
    prompt: 'Я благодарен за:',
    placeholder: 'Например: За то что был здоров, за поддержку близких...',
    icon: '🙏',
    hasInput: true,
  },
  {
    id: 'letting-go',
    title: 'Отпусти',
    description: 'Если сегодня были тревожные мысли — отпусти их. День закончен.',
    quote: '«Вчерашний день уже мёртв, завтрашний ещё не родился. У нас есть только сегодня.»',
    author: 'Марк Аврелий',
    icon: '🍃',
  },
  {
    id: 'complete',
    title: 'Спокойной ночи',
    description: 'Ты сделал всё, что мог сегодня. Отдыхай.',
    icon: '💤',
  },
];

export default function EveningReflection() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [inputs, setInputs] = useState({});
  const [morningIntention, setMorningIntention] = useState(null);

  const step = STEPS[currentStep];
  const progress = ((currentStep + 1) / STEPS.length) * 100;

  useEffect(() => {
    const saved = localStorage.getItem('daily-intention');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const savedDate = new Date(parsed.date).toDateString();
        const today = new Date().toDateString();
        if (savedDate === today) {
          setMorningIntention(parsed.text);
        }
      } catch (e) {
        // ignore
      }
    }
  }, []);

  const handleInputChange = (value) => {
    setInputs({ ...inputs, [step.id]: value });
  };

  const handleNext = () => {
    if (navigator.vibrate) {
      navigator.vibrate(30);
    }

    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Save evening reflection
      const reflection = {
        date: new Date().toISOString(),
        ...inputs,
        morningIntention,
      };
      const reflections = JSON.parse(localStorage.getItem('evening-reflections') || '[]');
      reflections.unshift(reflection);
      localStorage.setItem('evening-reflections', JSON.stringify(reflections.slice(0, 30)));

      navigate('/stoic');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate(-1);
    }
  };

  const canProceed = !step.hasInput || inputs[step.id]?.trim().length > 0;

  return (
    <div className="min-h-screen flex flex-col pb-24">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-800 z-50">
        <div
          className="h-full transition-all duration-300"
          style={{ width: `${progress}%`, background: 'var(--apple-purple)' }}
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
        <span className="headline">Вечерняя рефлексия</span>
        <span className="footnote secondary-text">
          {currentStep + 1}/{STEPS.length}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center px-6 pt-20">
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
        <p className="body-text secondary-text text-center max-w-sm mb-6">
          {step.description}
        </p>

        {/* Show morning intention */}
        {step.showIntention && (
          <Card className="p-4 max-w-sm w-full">
            {morningIntention ? (
              <>
                <p className="subhead secondary-text mb-2">Твоё утреннее намерение:</p>
                <p className="callout" style={{ color: 'var(--apple-orange)' }}>
                  {morningIntention}
                </p>
                <p className="caption secondary-text mt-3">
                  Удалось ли следовать этому намерению?
                </p>
              </>
            ) : (
              <p className="callout secondary-text text-center">
                Утреннее намерение не найдено. Попробуй завтра начать с утренней практики.
              </p>
            )}
          </Card>
        )}

        {/* Quote */}
        {step.quote && (
          <Card className="p-4 max-w-sm mb-6">
            <p className="callout italic mb-2">{step.quote}</p>
            <p className="caption secondary-text text-right">— {step.author}</p>
          </Card>
        )}

        {/* Input */}
        {step.hasInput && (
          <div className="w-full max-w-sm">
            <p className="subhead mb-3">{step.prompt}</p>
            <textarea
              className="form-input min-h-[120px] resize-none"
              placeholder={step.placeholder}
              value={inputs[step.id] || ''}
              onChange={(e) => handleInputChange(e.target.value)}
              autoFocus
            />
          </div>
        )}
      </div>

      {/* Next button */}
      <div className="fixed bottom-24 left-0 right-0 px-6">
        <Button
          variant="filled"
          className="w-full py-4"
          onClick={handleNext}
          disabled={!canProceed}
          style={{ background: 'var(--apple-purple)' }}
        >
          {step.id === 'complete' ? 'Завершить' : 'Далее'}
        </Button>
      </div>
    </div>
  );
}
