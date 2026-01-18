import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui';
import { ChevronLeft } from '../../components/icons';

const STEPS = [
  {
    id: 'fear',
    title: 'Чего ты боишься?',
    description: 'Опиши свой страх или тревожную мысль',
    placeholder: 'Например: Боюсь, что головная боль — это опухоль мозга',
    type: 'textarea',
  },
  {
    id: 'probability',
    title: 'Насколько это вероятно?',
    description: 'Оцени вероятность того, что твой страх реален',
    type: 'slider',
    min: 0,
    max: 100,
    unit: '%',
  },
  {
    id: 'evidence_for',
    title: 'Доказательства ЗА',
    description: 'Какие факты подтверждают твой страх?',
    placeholder: 'Например: Голова болит уже несколько дней',
    type: 'textarea',
  },
  {
    id: 'evidence_against',
    title: 'Доказательства ПРОТИВ',
    description: 'Какие факты опровергают твой страх?',
    placeholder: 'Например: Врач говорил что головные боли — это норма. У меня нет других симптомов.',
    type: 'textarea',
  },
  {
    id: 'worst_case',
    title: 'Худший сценарий',
    description: 'Что произойдёт, если страх реален? Смог бы ты справиться?',
    placeholder: 'Например: Даже если это серьёзно, современная медицина лечит многое...',
    type: 'textarea',
  },
  {
    id: 'best_case',
    title: 'Лучший сценарий',
    description: 'Какой наиболее вероятный позитивный исход?',
    placeholder: 'Например: Это обычная головная боль от напряжения или стресса',
    type: 'textarea',
  },
  {
    id: 'realistic',
    title: 'Реалистичный сценарий',
    description: 'Что скорее всего произойдёт на самом деле?',
    placeholder: 'Например: Головная боль пройдёт сама или после отдыха',
    type: 'textarea',
  },
  {
    id: 'new_probability',
    title: 'Переоценка',
    description: 'После анализа, какова вероятность твоего страха сейчас?',
    type: 'slider',
    min: 0,
    max: 100,
    unit: '%',
  },
];

export default function Decatastrophize() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [values, setValues] = useState({
    probability: 50,
    new_probability: 50,
  });

  const step = STEPS[currentStep];
  const progress = ((currentStep + 1) / STEPS.length) * 100;

  const handleChange = (value) => {
    setValues({ ...values, [step.id]: value });
  };

  const handleNext = () => {
    if (navigator.vibrate) {
      navigator.vibrate(30);
    }
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate('/tools');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate(-1);
    }
  };

  const canProceed = () => {
    if (step.type === 'slider') return true;
    return values[step.id]?.trim().length > 0;
  };

  // Show comparison on last step
  const showComparison = step.id === 'new_probability';
  const probabilityDiff = values.probability - (values.new_probability || values.probability);

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
          className="p-2 rounded-full flex items-center justify-center"
          style={{ background: 'var(--card-secondary)' }}
          onClick={handleBack}
        >
          <ChevronLeft size={20} />
        </button>
        <span className="headline">Декатастрофизация</span>
        <span className="footnote secondary-text">
          {currentStep + 1}/{STEPS.length}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col px-6 pt-20">
        {/* Title */}
        <h1 className="title-2 text-center mb-2">{step.title}</h1>

        {/* Description */}
        <p className="callout secondary-text text-center mb-6">
          {step.description}
        </p>

        {/* Input based on type */}
        {step.type === 'textarea' && (
          <textarea
            className="form-input flex-1 min-h-[180px] resize-none"
            placeholder={step.placeholder}
            value={values[step.id] || ''}
            onChange={(e) => handleChange(e.target.value)}
            autoFocus
          />
        )}

        {step.type === 'slider' && (
          <div className="flex-1 flex flex-col items-center justify-center">
            {/* Comparison for last step */}
            {showComparison && (
              <div className="card p-4 w-full max-w-sm mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="subhead">До анализа:</span>
                  <span className="headline">{values.probability}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="subhead">После анализа:</span>
                  <span className="headline" style={{ color: 'var(--apple-green)' }}>
                    {values.new_probability}%
                  </span>
                </div>
                {probabilityDiff > 0 && (
                  <p className="caption text-center mt-3" style={{ color: 'var(--apple-green)' }}>
                    Тревога снизилась на {probabilityDiff}%
                  </p>
                )}
              </div>
            )}

            {/* Slider value */}
            <div
              className="text-6xl font-bold mb-8"
              style={{ color: 'var(--apple-purple)' }}
            >
              {values[step.id]}%
            </div>

            {/* Slider */}
            <input
              type="range"
              min={step.min}
              max={step.max}
              value={values[step.id]}
              onChange={(e) => handleChange(Number(e.target.value))}
              className="w-full max-w-sm h-2 rounded-full appearance-none"
              style={{
                background: `linear-gradient(to right, var(--apple-purple) ${values[step.id]}%, var(--separator) ${values[step.id]}%)`,
              }}
            />

            {/* Labels */}
            <div className="flex justify-between w-full max-w-sm mt-2">
              <span className="caption secondary-text">Невозможно</span>
              <span className="caption secondary-text">Точно случится</span>
            </div>
          </div>
        )}
      </div>

      {/* Next button */}
      <div className="fixed bottom-24 left-0 right-0 px-6">
        <Button
          variant="filled"
          className="w-full py-4"
          onClick={handleNext}
          disabled={!canProceed()}
          style={{ background: 'var(--apple-purple)' }}
        >
          {currentStep === STEPS.length - 1 ? 'Завершить' : 'Далее'}
        </Button>
      </div>
    </div>
  );
}
