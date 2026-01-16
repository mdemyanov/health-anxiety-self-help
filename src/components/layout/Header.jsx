import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

export default function Header({ title, showBack, onBack, showSettings = false }) {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 px-4 py-3 safe-area-top flex items-center justify-between"
      style={{ background: 'var(--background)' }}
    >
      <div className="flex items-center gap-3">
        {showBack && (
          <button
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center rounded-full border-none bg-transparent cursor-pointer"
            style={{ background: 'var(--card-secondary)' }}
          >
            ←
          </button>
        )}
        {title && <h1 className="title-2 m-0">{title}</h1>}
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={toggleTheme}
          className="w-10 h-10 flex items-center justify-center rounded-full border-none cursor-pointer text-xl"
          style={{ background: 'var(--card-secondary)' }}
          aria-label="Toggle theme"
        >
          {isDark ? '☀️' : '🌙'}
        </button>
        {showSettings && (
          <button
            onClick={() => navigate('/settings')}
            className="w-10 h-10 flex items-center justify-center rounded-full border-none cursor-pointer text-xl"
            style={{ background: 'var(--card-secondary)' }}
            aria-label="Settings"
          >
            ⚙️
          </button>
        )}
      </div>
    </header>
  );
}
