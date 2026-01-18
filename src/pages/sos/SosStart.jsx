import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui';
import { ToolIcon } from '../../components/icons';

export default function SosStart() {
  const navigate = useNavigate();

  const handleStart = () => {
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
    navigate('/sos/flow');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 pb-24">
      <div className="text-center max-w-sm">
        {/* Icon */}
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8"
          style={{ background: 'rgba(255, 59, 48, 0.15)' }}
        >
          <ToolIcon tool="sos" size={48} className="text-[var(--apple-red)]" />
        </div>

        {/* Title */}
        <h1 className="title-1 mb-4">Ты не один</h1>

        {/* Description */}
        <p className="body-text secondary-text mb-8">
          Сейчас я проведу тебя через несколько простых шагов,
          которые помогут успокоиться. Это займёт около 5 минут.
        </p>

        {/* Features */}
        <div className="space-y-3 mb-10 text-left">
          <div className="flex items-center gap-3">
            <ToolIcon tool="breathing" size={24} className="text-[var(--apple-blue)]" />
            <span className="subhead">Дыхательная техника</span>
          </div>
          <div className="flex items-center gap-3">
            <ToolIcon tool="ice" size={24} className="text-[var(--apple-blue)]" />
            <span className="subhead">Техника заземления</span>
          </div>
          <div className="flex items-center gap-3">
            <ToolIcon tool="thoughts" size={24} className="text-[var(--apple-purple)]" />
            <span className="subhead">Работа с мыслями</span>
          </div>
        </div>

        {/* Start button */}
        <Button
          variant="filled"
          className="w-full py-4 text-lg"
          onClick={handleStart}
          style={{ background: 'var(--apple-red)' }}
        >
          Начать
        </Button>

        {/* Skip link */}
        <button
          className="mt-4 subhead secondary-text"
          onClick={() => navigate(-1)}
        >
          Мне уже лучше
        </button>
      </div>
    </div>
  );
}
