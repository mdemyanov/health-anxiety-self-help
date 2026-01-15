import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui';

const STEPS = [
  {
    key: 'A',
    title: 'A — Активирующее событие',
    description: 'Что произошло? Опиши ситуацию объективно, как камера.',
    placeholder: 'Например: Я почувствовал боль в груди...',
    color: 'var(--apple-blue)',
  },
  {
    key: 'B',
    title: 'B — Убеждения (Beliefs)',
    description: 'Какие мысли возникли? Что ты подумал о ситуации?',
    placeholder: 'Например: У меня сердечный приступ, я умру...',
    color: 'var(--apple-purple)',
  },
  {
    key: 'C',
    title: 'C — Последствия (Consequences)',
    description: 'Какие эмоции и поведение это вызвало?',
    placeholder: 'Например: Паника, страх, вызвал скорую...',
    color: 'var(--apple-orange)',
  },
  {
    key: 'D',
    title: 'D — Диспут',
    description: 'Оспорь свои мысли. Какие есть доказательства против?',
    placeholder: 'Например: Врач говорил, что сердце здоровое. Боль может быть от мышц...',
    color: 'var(--apple-green)',
  },
  {
    key: 'E',
    title: 'E — Эффект',
    description: 'Как изменились твои чувства после диспута?',
    placeholder: 'Например: Тревога снизилась, понял что это мышечное...',
    color: 'var(--apple-blue)',
  },
];

export default function AbcDiary() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [values, setValues] = useState({});

  const step = STEPS[currentStep];
  const progress = ((currentStep + 1) / STEPS.length) * 100;

  const handleChange = (value) => {
    setValues({ ...values, [step.key]: value });
  };

  const handleNext = () => {
    if (navigator.vibrate) {
      navigator.vibrate(30);
    }
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Save to localStorage
      const entries = JSON.parse(localStorage.getItem('abc-entries') || '[]');
      const newEntry = {
        id: Date.now(),
        date: new Date().toISOString(),
        ...values,
      };
      entries.unshift(newEntry);
      localStorage.setItem('abc-entries', JSON.stringify(entries));

      if (navigator.vibrate) {
        navigator.vibrate([50, 30, 50]);
      }
      navigate('/diary');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate(-1);
    }
  };

  const canProceed = values[step.key]?.trim().length > 0;

  return (
    <div className="min-h-screen flex flex-col pb-24">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-800 z-50">
        <div
          className="h-full transition-all duration-300"
          style={{ width: `${progress}%`, background: step.color }}
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
        <span className="headline">ABC-дневник</span>
        <span className="footnote secondary-text">
          {currentStep + 1}/{STEPS.length}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col px-6 pt-20">
        {/* Step indicator */}
        <div className="flex justify-center gap-2 mb-6">
          {STEPS.map((s, i) => (
            <div
              key={s.key}
              className="w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all"
              style={{
                background: i === currentStep ? s.color : 'var(--card-secondary)',
                color: i === currentStep ? 'white' : 'var(--label-secondary)',
                transform: i === currentStep ? 'scale(1.1)' : 'scale(1)',
              }}
            >
              {s.key}
            </div>
          ))}
        </div>

        {/* Title */}
        <h1 className="title-2 text-center mb-2">{step.title}</h1>

        {/* Description */}
        <p className="callout secondary-text text-center mb-6">
          {step.description}
        </p>

        {/* Text area */}
        <textarea
          className="form-input flex-1 min-h-[200px] resize-none"
          placeholder={step.placeholder}
          value={values[step.key] || ''}
          onChange={(e) => handleChange(e.target.value)}
          autoFocus
        />

        {/* Tips for D step */}
        {step.key === 'D' && (
          <div className="card p-4 mt-4">
            <p className="subhead font-semibold mb-2">Вопросы для диспута:</p>
            <ul className="space-y-1 text-sm secondary-text">
              <li>• Какие факты подтверждают эту мысль?</li>
              <li>• Какие факты опровергают её?</li>
              <li>• Что бы я сказал другу в такой ситуации?</li>
              <li>• Насколько вероятен худший сценарий?</li>
            </ul>
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
          style={{ background: step.color }}
        >
          {currentStep === STEPS.length - 1 ? 'Сохранить' : 'Далее'}
        </Button>
      </div>
    </div>
  );
}
