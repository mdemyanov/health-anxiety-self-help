import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui';

const PHASES = [
  { name: 'Вдох', duration: 4, color: 'var(--apple-blue)' },
  { name: 'Задержка', duration: 7, color: 'var(--apple-purple)' },
  { name: 'Выдох', duration: 8, color: 'var(--apple-green)' },
];

export default function Breathing478() {
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

  // Calculate circle scale based on phase
  const getCircleScale = () => {
    if (!isActive) return 0.6;
    const progress = 1 - timeLeft / phase.duration;
    switch (phaseIndex) {
      case 0: // Вдох - расширяется
        return 0.6 + progress * 0.4;
      case 1: // Задержка - максимальный размер
        return 1;
      case 2: // Выдох - сжимается
        return 1 - progress * 0.4;
      default:
        return 0.6;
    }
  };

  return (
    <div className="min-h-screen flex flex-col pb-24">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-40 px-4 py-4 flex items-center justify-between">
        <button
          className="p-2 rounded-full"
          style={{ background: 'var(--card-secondary)' }}
          onClick={() => navigate(-1)}
        >
          <span className="text-lg">←</span>
        </button>
        <span className="headline">Дыхание 4-7-8</span>
        <div className="w-10" />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-16">
        {/* Circle visualization */}
        <div className="relative w-56 h-56 mb-8 flex items-center justify-center">
          {/* Outer ring */}
          <div
            className="absolute w-full h-full rounded-full transition-all"
            style={{
              background: `${phase.color}15`,
              transform: `scale(${getCircleScale()})`,
              transitionDuration: '1s',
              transitionTimingFunction: 'ease-in-out',
            }}
          />

          {/* Inner circle */}
          <div
            className="relative w-40 h-40 rounded-full flex flex-col items-center justify-center transition-all"
            style={{
              background: phase.color,
              opacity: 0.85,
              transform: `scale(${getCircleScale()})`,
              transitionDuration: '1s',
              transitionTimingFunction: 'ease-in-out',
            }}
          >
            {isActive ? (
              <>
                <span className="text-4xl font-bold text-white mb-1">{timeLeft}</span>
                <span className="text-lg text-white/90">{phase.name}</span>
              </>
            ) : (
              <span className="text-2xl font-semibold text-white">4-7-8</span>
            )}
          </div>
        </div>

        {/* Phase indicators */}
        <div className="flex gap-6 mb-6">
          {PHASES.map((p, i) => (
            <div
              key={i}
              className="flex flex-col items-center transition-opacity"
              style={{ opacity: isActive && phaseIndex === i ? 1 : 0.4 }}
            >
              <div
                className="w-3 h-3 rounded-full mb-2"
                style={{ background: p.color }}
              />
              <span className="subhead">{p.name}</span>
              <span className="caption secondary-text">{p.duration}с</span>
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
              ? phaseIndex === 0
                ? 'Вдыхай через нос...'
                : phaseIndex === 1
                ? 'Задержи дыхание...'
                : 'Медленно выдыхай через рот...'
              : 'Техника 4-7-8 помогает при тревоге и бессоннице. Выдох в два раза длиннее вдоха активирует парасимпатическую нервную систему.'}
          </p>
        </div>

        {/* Recommendation */}
        {!isActive && (
          <p className="caption secondary-text mt-4 text-center">
            Рекомендуется: 3-4 цикла
          </p>
        )}
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
