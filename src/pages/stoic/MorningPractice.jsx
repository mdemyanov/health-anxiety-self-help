import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from '../../components/ui';

const STEPS = [
  {
    id: 'welcome',
    title: 'Доброе утро',
    description: 'Начни день с ясного ума. Эта практика займёт 5 минут.',
    icon: '🌅',
  },
  {
    id: 'memento',
    title: 'Memento Mori',
    description: 'Помни о смертности. Не для страха, а чтобы ценить каждый момент.',
    quote: '«Каждый день думай о смерти, и тогда в мыслях твоих не будет ничего низкого.»',
    author: 'Эпиктет',
    icon: '⏳',
  },
  {
    id: 'premeditatio',
    title: 'Premeditatio Malorum',
    description: 'Представь, что может пойти не так сегодня. Это не пессимизм — это подготовка.',
    prompt: 'Что может пойти не так сегодня?',
    placeholder: 'Например: Могу получить плохие новости, может быть тревожный день...',
    icon: '🛡️',
    hasInput: true,
  },
  {
    id: 'acceptance',
    title: 'Принятие',
    description: 'Если это случится — я приму это. Я справлюсь с тем, что в моей власти.',
    quote: '«Не то, что с нами случается, а то, как мы к этому относимся — определяет нашу жизнь.»',
    author: 'Эпиктет',
    icon: '🙏',
  },
  {
    id: 'dichotomy',
    title: 'Дихотомия контроля',
    description: 'Что сегодня в моей власти, а что нет?',
    prompt: 'Сегодня я сосредоточусь на том, что могу контролировать:',
    placeholder: 'Например: Мои действия, мой настрой, как я забочусь о себе...',
    icon: '⚖️',
    hasInput: true,
  },
  {
    id: 'intention',
    title: 'Намерение дня',
    description: 'Выбери одно главное намерение на сегодня.',
    prompt: 'Моё намерение на сегодня:',
    placeholder: 'Например: Быть спокойным, несмотря на обстоятельства',
    icon: '🎯',
    hasInput: true,
    saveKey: 'daily-intention',
  },
  {
    id: 'complete',
    title: 'Ты готов',
    description: 'Помни своё намерение в течение дня. Вечером мы вернёмся к нему.',
    icon: '✨',
  },
];

export default function MorningPractice() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [inputs, setInputs] = useState({});

  const step = STEPS[currentStep];
  const progress = ((currentStep + 1) / STEPS.length) * 100;

  const handleInputChange = (value) => {
    setInputs({ ...inputs, [step.id]: value });
  };

  const handleNext = () => {
    if (navigator.vibrate) {
      navigator.vibrate(30);
    }

    // Save intention to localStorage
    if (step.saveKey && inputs[step.id]) {
      localStorage.setItem(step.saveKey, JSON.stringify({
        text: inputs[step.id],
        date: new Date().toISOString(),
      }));
    }

    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
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
          style={{ width: `${progress}%`, background: 'var(--apple-orange)' }}
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
        <span className="headline">Утренняя практика</span>
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

        {/* Final step message */}
        {step.id === 'complete' && inputs.intention && (
          <Card className="p-4 max-w-sm">
            <p className="subhead mb-2">Твоё намерение:</p>
            <p className="callout" style={{ color: 'var(--apple-orange)' }}>
              {inputs.intention}
            </p>
          </Card>
        )}
      </div>

      {/* Next button */}
      <div className="fixed bottom-24 left-0 right-0 px-6">
        <Button
          variant="filled"
          className="w-full py-4"
          onClick={handleNext}
          disabled={!canProceed}
          style={{ background: 'var(--apple-orange)' }}
        >
          {step.id === 'complete' ? 'Завершить' : 'Далее'}
        </Button>
      </div>
    </div>
  );
}
