import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui';
import { ToolIcon, ChevronLeft } from '../../components/icons';

const STEPS = [
  {
    count: 5,
    sense: 'ВИДИШЬ',
    iconTool: 'see',
    color: 'var(--apple-blue)',
    placeholder: 'Я вижу...',
  },
  {
    count: 4,
    sense: 'ТРОГАЕШЬ',
    iconTool: 'touch',
    color: 'var(--apple-green)',
    placeholder: 'Я трогаю...',
  },
  {
    count: 3,
    sense: 'СЛЫШИШЬ',
    iconTool: 'hear',
    color: 'var(--apple-purple)',
    placeholder: 'Я слышу...',
  },
  {
    count: 2,
    sense: 'ЧУВСТВУЕШЬ (запах)',
    iconTool: 'smell',
    color: 'var(--apple-orange)',
    placeholder: 'Я чувствую запах...',
  },
  {
    count: 1,
    sense: 'ОЩУЩАЕШЬ (вкус)',
    iconTool: 'taste',
    color: 'var(--apple-red)',
    placeholder: 'Я ощущаю вкус...',
  },
];

export default function Grounding54321() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [inputs, setInputs] = useState({});

  const step = STEPS[currentStep];
  const progress = ((currentStep + 1) / STEPS.length) * 100;

  const handleInputChange = (index, value) => {
    setInputs({
      ...inputs,
      [`${currentStep}-${index}`]: value,
    });
  };

  const isStepComplete = () => {
    for (let i = 0; i < step.count; i++) {
      if (!inputs[`${currentStep}-${i}`]?.trim()) return false;
    }
    return true;
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

  return (
    <div className="min-h-screen flex flex-col pb-24">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 safe-area-top">
        <div className="h-1 bg-gray-200 dark:bg-gray-800">
          <div
            className="h-full transition-all duration-300"
            style={{ width: `${progress}%`, background: step.color }}
          />
        </div>
      </div>

      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-40 px-4 pt-5 pb-4 safe-area-top flex items-center justify-between">
        <button
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: 'var(--card-secondary)' }}
          onClick={handleBack}
        >
          <ChevronLeft size={20} className="text-[var(--label)]" />
        </button>
        <span className="headline">Техника 5-4-3-2-1</span>
        <span className="footnote secondary-text">
          {currentStep + 1}/{STEPS.length}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center px-6 pt-20">
        {/* Icon and count */}
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
          style={{ background: `${step.color}20` }}
        >
          <ToolIcon tool={step.iconTool} size={40} style={{ color: step.color }} />
        </div>

        {/* Count badge */}
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
          style={{ background: step.color }}
        >
          <span className="text-2xl font-bold text-white">{step.count}</span>
        </div>

        {/* Title */}
        <h1 className="title-2 text-center mb-2">
          {step.count} {step.count === 1 ? 'вещь' : step.count < 5 ? 'вещи' : 'вещей'}
        </h1>
        <p className="headline secondary-text text-center mb-6">
          которые ты {step.sense}
        </p>

        {/* Input fields */}
        <div className="w-full max-w-sm space-y-3 mb-8">
          {Array.from({ length: step.count }).map((_, i) => (
            <div key={i} className="relative">
              <span
                className="absolute left-4 top-1/2 -translate-y-1/2 font-semibold"
                style={{ color: step.color }}
              >
                {i + 1}.
              </span>
              <input
                type="text"
                className="form-input pl-10"
                placeholder={step.placeholder}
                value={inputs[`${currentStep}-${i}`] || ''}
                onChange={(e) => handleInputChange(i, e.target.value)}
              />
            </div>
          ))}
        </div>

        {/* Tip */}
        <div className="card p-3 w-full max-w-sm">
          <p className="caption secondary-text text-center">
            Не спеши. Внимательно осмотрись вокруг и назови конкретные предметы.
          </p>
        </div>
      </div>

      {/* Next button */}
      <div className="fixed bottom-24 left-0 right-0 px-6">
        <Button
          variant="filled"
          className="w-full py-4"
          onClick={handleNext}
          disabled={!isStepComplete()}
          style={{ background: step.color }}
        >
          {currentStep === STEPS.length - 1 ? 'Завершить' : 'Далее'}
        </Button>
      </div>
    </div>
  );
}
