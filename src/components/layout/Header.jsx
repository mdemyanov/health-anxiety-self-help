import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { ChevronLeft, Sun, Moon, Settings } from '../icons';

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
            <ChevronLeft size={20} />
          </button>
        )}
        {title && <h1 className="title-2 m-0">{title}</h1>}
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={toggleTheme}
          className="w-10 h-10 flex items-center justify-center rounded-full border-none cursor-pointer"
          style={{ background: 'var(--card-secondary)' }}
          aria-label="Toggle theme"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        {showSettings && (
          <button
            onClick={() => navigate('/settings')}
            className="w-10 h-10 flex items-center justify-center rounded-full border-none cursor-pointer"
            style={{ background: 'var(--card-secondary)' }}
            aria-label="Settings"
          >
            <Settings size={20} />
          </button>
        )}
      </div>
    </header>
  );
}
