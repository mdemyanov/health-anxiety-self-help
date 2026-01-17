import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui';

const PHASES = [
  { name: 'Вдох', duration: 4 },
  { name: 'Задержка', duration: 4 },
  { name: 'Выдох', duration: 4 },
  { name: 'Задержка', duration: 4 },
];

export default function BoxBreathing() {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(4);
  const [cycleCount, setCycleCount] = useState(0);

  const phase = PHASES[phaseIndex];

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Move to next phase
          setPhaseIndex((prevPhase) => {
            const nextPhase = (prevPhase + 1) % PHASES.length;
            if (nextPhase === 0) {
              setCycleCount((c) => c + 1);
            }
            return nextPhase;
          });
          if (navigator.vibrate) {
            navigator.vibrate(30);
          }
          return PHASES[(phaseIndex + 1) % PHASES.length].duration;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, phaseIndex]);

  const handleStart = () => {
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
    setIsActive(true);
    setPhaseIndex(0);
    setTimeLeft(4);
    setCycleCount(0);
  };

  const handleStop = () => {
    setIsActive(false);
  };

  // Calculate box animation position (using left/top only for consistent translate behavior)
  const getBoxPosition = () => {
    const progress = 1 - timeLeft / phase.duration;
    switch (phaseIndex) {
      case 0: // Вдох - снизу вверх (левая сторона)
        return { left: 0, top: `${(1 - progress) * 100}%` };
      case 1: // Задержка - слева направо (верх)
        return { left: `${progress * 100}%`, top: 0 };
      case 2: // Выдох - сверху вниз (правая сторона)
        return { left: '100%', top: `${progress * 100}%` };
      case 3: // Задержка - справа налево (низ)
        return { left: `${(1 - progress) * 100}%`, top: '100%' };
      default:
        return {};
    }
  };

  return (
    <div className="min-h-screen flex flex-col pb-24">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-40 px-4 py-4 safe-area-top flex items-center justify-between">
        <button
          className="p-2 rounded-full"
          style={{ background: 'var(--card-secondary)' }}
          onClick={() => navigate(-1)}
        >
          <span className="text-lg">←</span>
        </button>
        <span className="headline">Квадратное дыхание</span>
        <div className="w-10" />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-16">
        {/* Box visualization */}
        <div className="relative w-48 h-48 mb-8">
          {/* Box border */}
          <div
            className="absolute inset-0 rounded-lg"
            style={{ border: '3px solid var(--separator)' }}
          />

          {/* Active side highlight */}
          {isActive && (
            <>
              {/* Left side - Вдох */}
              <div
                className="absolute left-0 top-0 w-1 h-full rounded transition-opacity"
                style={{
                  background: 'var(--apple-blue)',
                  opacity: phaseIndex === 0 ? 1 : 0.2,
                }}
              />
              {/* Top side - Задержка */}
              <div
                className="absolute left-0 top-0 w-full h-1 rounded transition-opacity"
                style={{
                  background: 'var(--apple-purple)',
                  opacity: phaseIndex === 1 ? 1 : 0.2,
                }}
              />
              {/* Right side - Выдох */}
              <div
                className="absolute right-0 top-0 w-1 h-full rounded transition-opacity"
                style={{
                  background: 'var(--apple-green)',
                  opacity: phaseIndex === 2 ? 1 : 0.2,
                }}
              />
              {/* Bottom side - Задержка */}
              <div
                className="absolute left-0 bottom-0 w-full h-1 rounded transition-opacity"
                style={{
                  background: 'var(--apple-orange)',
                  opacity: phaseIndex === 3 ? 1 : 0.2,
                }}
              />

              {/* Moving dot */}
              <div
                className="absolute w-4 h-4 rounded-full -translate-x-1/2 -translate-y-1/2"
                style={{
                  background: 'var(--apple-blue)',
                  ...getBoxPosition(),
                  transition: 'all 0.3s ease-out',
                }}
              />
            </>
          )}

          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {isActive ? (
              <>
                <span className="title-large mb-1">{timeLeft}</span>
                <span className="headline" style={{ color: 'var(--apple-blue)' }}>
                  {phase.name}
                </span>
              </>
            ) : (
              <span className="headline secondary-text">4-4-4-4</span>
            )}
          </div>
        </div>

        {/* Phase indicators */}
        <div className="flex gap-4 mb-6">
          {PHASES.map((p, i) => (
            <div
              key={i}
              className="flex flex-col items-center"
              style={{ opacity: isActive && phaseIndex === i ? 1 : 0.5 }}
            >
              <span className="caption">{p.name}</span>
              <span className="footnote secondary-text">{p.duration}с</span>
            </div>
          ))}
        </div>

        {/* Cycle counter */}
        {isActive && (
          <p className="subhead secondary-text mb-6">
            Цикл: {cycleCount + 1}
          </p>
        )}

        {/* Instructions */}
        <div className="card p-4 w-full max-w-sm">
          <p className="callout text-center">
            {isActive
              ? 'Следуй за точкой по периметру квадрата'
              : 'Квадратное дыхание помогает снизить стресс и улучшить концентрацию. Каждая фаза длится 4 секунды.'}
          </p>
        </div>
      </div>

      {/* Control button */}
      <div className="fixed bottom-24 left-0 right-0 px-6">
        {isActive ? (
          <Button
            variant="gray"
            className="w-full py-4"
            onClick={handleStop}
          >
            Остановить
          </Button>
        ) : (
          <Button
            variant="filled"
            className="w-full py-4"
            onClick={handleStart}
          >
            Начать
          </Button>
        )}
      </div>
    </div>
  );
}
