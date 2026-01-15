import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from '../../components/ui';

const INTRO_STEPS = [
  {
    title: 'Дихотомия контроля',
    description: 'Древние стоики учили различать то, что в нашей власти, и то, что нет. Это ключ к спокойствию.',
    quote: '«Из существующего одно находится в нашей власти, другое нет.»',
    author: 'Эпиктет',
  },
];

const CAN_CONTROL = [
  { id: 1, text: 'Мои мысли и отношение' },
  { id: 2, text: 'Мои действия и реакции' },
  { id: 3, text: 'Мои решения и выбор' },
  { id: 4, text: 'Как я забочусь о себе' },
  { id: 5, text: 'К кому обращаюсь за помощью' },
  { id: 6, text: 'Как трачу своё время' },
];

const CANNOT_CONTROL = [
  { id: 1, text: 'Результаты медицинских обследований' },
  { id: 2, text: 'Мнения и действия других людей' },
  { id: 3, text: 'Прошлое и будущее' },
  { id: 4, text: 'Погода и внешние обстоятельства' },
  { id: 5, text: 'Ощущения в теле' },
  { id: 6, text: 'Когда придёт тревога' },
];

export default function Dichotomy() {
  const navigate = useNavigate();
  const [step, setStep] = useState('intro'); // 'intro' | 'exercise' | 'custom' | 'summary'
  const [checkedCan, setCheckedCan] = useState([]);
  const [checkedCannot, setCheckedCannot] = useState([]);
  const [customWorry, setCustomWorry] = useState('');
  const [customCategory, setCustomCategory] = useState(null); // 'can' | 'cannot'

  const handleCheck = (id, type) => {
    if (navigator.vibrate) {
      navigator.vibrate(20);
    }
    if (type === 'can') {
      setCheckedCan((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      );
    } else {
      setCheckedCannot((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      );
    }
  };

  const renderIntro = () => (
    <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
        style={{ background: 'var(--card-secondary)' }}
      >
        <span className="text-4xl">⚖️</span>
      </div>
      <h1 className="title-1 mb-4">{INTRO_STEPS[0].title}</h1>
      <p className="body-text secondary-text mb-6 max-w-sm">
        {INTRO_STEPS[0].description}
      </p>
      <Card className="p-4 max-w-sm">
        <p className="callout italic mb-2">{INTRO_STEPS[0].quote}</p>
        <p className="caption secondary-text">— {INTRO_STEPS[0].author}</p>
      </Card>
    </div>
  );

  const renderExercise = () => (
    <div className="flex-1 px-4 pt-4 pb-4 overflow-auto">
      <p className="callout secondary-text text-center mb-6">
        Отметь то, что резонирует с твоей текущей ситуацией
      </p>

      {/* Can control */}
      <div className="mb-6">
        <h2 className="headline mb-3" style={{ color: 'var(--apple-green)' }}>
          ✓ В моей власти
        </h2>
        <Card className="p-3">
          <div className="space-y-3">
            {CAN_CONTROL.map((item) => (
              <label key={item.id} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-5 h-5 rounded"
                  checked={checkedCan.includes(item.id)}
                  onChange={() => handleCheck(item.id, 'can')}
                />
                <span className="subhead">{item.text}</span>
              </label>
            ))}
          </div>
        </Card>
      </div>

      {/* Cannot control */}
      <div>
        <h2 className="headline mb-3" style={{ color: 'var(--apple-red)' }}>
          ✗ Не в моей власти
        </h2>
        <Card className="p-3">
          <div className="space-y-3">
            {CANNOT_CONTROL.map((item) => (
              <label key={item.id} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-5 h-5 rounded"
                  checked={checkedCannot.includes(item.id)}
                  onChange={() => handleCheck(item.id, 'cannot')}
                />
                <span className="subhead">{item.text}</span>
              </label>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );

  const renderCustom = () => (
    <div className="flex-1 flex flex-col px-6 pt-4">
      <h2 className="title-2 text-center mb-2">Твоё беспокойство</h2>
      <p className="callout secondary-text text-center mb-6">
        Напиши то, что тебя беспокоит сейчас
      </p>

      <textarea
        className="form-input min-h-[120px] resize-none mb-6"
        placeholder="Например: Беспокоюсь о результатах анализов..."
        value={customWorry}
        onChange={(e) => setCustomWorry(e.target.value)}
      />

      {customWorry.trim() && (
        <>
          <p className="headline text-center mb-4">
            Это в твоей власти?
          </p>
          <div className="flex gap-4">
            <Button
              variant={customCategory === 'can' ? 'filled' : 'tinted'}
              className="flex-1"
              onClick={() => setCustomCategory('can')}
              style={{
                background: customCategory === 'can' ? 'var(--apple-green)' : 'rgba(52, 199, 89, 0.15)',
                color: customCategory === 'can' ? 'white' : 'var(--apple-green)',
              }}
            >
              Да
            </Button>
            <Button
              variant={customCategory === 'cannot' ? 'filled' : 'tinted'}
              className="flex-1"
              onClick={() => setCustomCategory('cannot')}
              style={{
                background: customCategory === 'cannot' ? 'var(--apple-red)' : 'rgba(255, 59, 48, 0.15)',
                color: customCategory === 'cannot' ? 'white' : 'var(--apple-red)',
              }}
            >
              Нет
            </Button>
          </div>

          {customCategory && (
            <Card className="p-4 mt-6">
              {customCategory === 'can' ? (
                <p className="callout">
                  Отлично! Раз это в твоей власти, подумай: какой маленький шаг ты можешь сделать прямо сейчас?
                </p>
              ) : (
                <p className="callout">
                  Это не в твоей власти. Отпусти это. Сфокусируйся на том, что ты МОЖЕШЬ контролировать — свои действия и реакции.
                </p>
              )}
            </Card>
          )}
        </>
      )}
    </div>
  );

  const renderSummary = () => (
    <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
        style={{ background: 'rgba(52, 199, 89, 0.15)' }}
      >
        <span className="text-4xl">🌟</span>
      </div>
      <h1 className="title-1 mb-4">Запомни</h1>
      <Card className="p-4 max-w-sm mb-6">
        <p className="callout">
          Тревога о том, что вне твоего контроля — это трата энергии.
          Направь силы на то, что можешь изменить.
        </p>
      </Card>
      <p className="subhead secondary-text max-w-sm">
        Каждый раз, когда появляется беспокойство, спроси себя: «Это в моей власти?»
      </p>
    </div>
  );

  const handleNext = () => {
    if (navigator.vibrate) {
      navigator.vibrate(30);
    }
    if (step === 'intro') setStep('exercise');
    else if (step === 'exercise') setStep('custom');
    else if (step === 'custom') setStep('summary');
    else navigate('/tools');
  };

  const handleBack = () => {
    if (step === 'intro') navigate(-1);
    else if (step === 'exercise') setStep('intro');
    else if (step === 'custom') setStep('exercise');
    else setStep('custom');
  };

  return (
    <div className="min-h-screen flex flex-col pb-24">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-40 px-4 py-4 flex items-center justify-between"
           style={{ background: 'var(--background)' }}>
        <button
          className="p-2 rounded-full"
          style={{ background: 'var(--card-secondary)' }}
          onClick={handleBack}
        >
          <span className="text-lg">←</span>
        </button>
        <span className="headline">Дихотомия контроля</span>
        <div className="w-10" />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col pt-16">
        {step === 'intro' && renderIntro()}
        {step === 'exercise' && renderExercise()}
        {step === 'custom' && renderCustom()}
        {step === 'summary' && renderSummary()}
      </div>

      {/* Next button */}
      <div className="fixed bottom-24 left-0 right-0 px-6">
        <Button
          variant="filled"
          className="w-full py-4"
          onClick={handleNext}
          disabled={step === 'custom' && customWorry.trim() && !customCategory}
        >
          {step === 'summary' ? 'Завершить' : 'Далее'}
        </Button>
      </div>
    </div>
  );
}
