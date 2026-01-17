import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Card } from './ui';

const ROLES = [
  { id: 'ceo', label: 'CEO / Генеральный директор' },
  { id: 'cto', label: 'CTO / Технический директор' },
  { id: 'cpo', label: 'CPO / Продуктовый директор' },
  { id: 'founder', label: 'Основатель / Сооснователь' },
  { id: 'other', label: 'Другое' },
];

const PROBLEMS = [
  { id: 'stress', label: 'Управленческий стресс' },
  { id: 'balance', label: 'Баланс работа-семья' },
  { id: 'decisions', label: 'Сложность принятия решений' },
  { id: 'impostor', label: 'Синдром самозванца' },
  { id: 'health', label: 'Тревога о здоровье' },
];

export default function Onboarding({ onComplete }) {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState({
    name: '',
    role: '',
    mainProblem: '',
  });

  const handleNext = () => {
    navigator.vibrate?.(10);
    if (step < 2) {
      setStep(step + 1);
    } else {
      // Save profile
      const finalProfile = {
        ...profile,
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem('user-profile', JSON.stringify(finalProfile));
      navigator.vibrate?.([30, 20, 30]);
      onComplete(finalProfile);
    }
  };

  const handleBack = () => {
    navigator.vibrate?.(10);
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const canProceed = () => {
    switch (step) {
      case 0: return profile.name.trim().length > 0;
      case 1: return profile.role !== '';
      case 2: return profile.mainProblem !== '';
      default: return false;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 safe-area-top safe-area-bottom"
      style={{ background: 'var(--background)' }}
    >
      <Card className="w-full max-w-md p-6">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="step-0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="title-1 mb-2">Привет!</h2>
              <p className="secondary-text mb-6">Как тебя зовут?</p>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                placeholder="Твоё имя"
                className="w-full p-4 rounded-xl text-base"
                style={{
                  background: 'var(--glass-bg)',
                  border: '1px solid var(--glass-border)',
                  color: 'var(--label)',
                }}
                autoFocus
              />
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="title-1 mb-2">Приятно познакомиться, {profile.name}!</h2>
              <p className="secondary-text mb-6">Какая у тебя роль?</p>
              <div className="space-y-2">
                {ROLES.map((role) => (
                  <button
                    key={role.id}
                    onClick={() => {
                      navigator.vibrate?.(10);
                      setProfile({ ...profile, role: role.id });
                    }}
                    className="w-full p-4 rounded-xl text-left transition-all active:scale-[0.98]"
                    style={{
                      background: profile.role === role.id ? 'var(--apple-blue)' : 'var(--glass-bg)',
                      color: profile.role === role.id ? 'white' : 'var(--label)',
                      border: '1px solid var(--glass-border)',
                    }}
                  >
                    {role.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="title-1 mb-2">Последний вопрос</h2>
              <p className="secondary-text mb-6">Что тебя беспокоит больше всего?</p>
              <div className="space-y-2">
                {PROBLEMS.map((problem) => (
                  <button
                    key={problem.id}
                    onClick={() => {
                      navigator.vibrate?.(10);
                      setProfile({ ...profile, mainProblem: problem.id });
                    }}
                    className="w-full p-4 rounded-xl text-left transition-all active:scale-[0.98]"
                    style={{
                      background: profile.mainProblem === problem.id ? 'var(--apple-blue)' : 'var(--glass-bg)',
                      color: profile.mainProblem === problem.id ? 'white' : 'var(--label)',
                      border: '1px solid var(--glass-border)',
                    }}
                  >
                    {problem.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-6 flex gap-3">
          {step > 0 && (
            <Button variant="gray" onClick={handleBack} className="px-6">
              Назад
            </Button>
          )}
          <Button
            variant="filled"
            className="flex-1"
            onClick={handleNext}
            disabled={!canProceed()}
          >
            {step < 2 ? 'Далее' : 'Начать'}
          </Button>
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-2 mt-4">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full transition-colors duration-300"
              style={{
                background: i <= step ? 'var(--apple-blue)' : 'var(--separator)',
              }}
            />
          ))}
        </div>
      </Card>
    </div>
  );
}
