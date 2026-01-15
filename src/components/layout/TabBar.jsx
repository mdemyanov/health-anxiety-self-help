import { useNavigate, useLocation } from 'react-router-dom';

const tabs = [
  { path: '/', icon: '🏠', activeIcon: '🏠', label: 'Главная' },
  { path: '/tools', icon: '🛠', activeIcon: '🛠', label: 'Техники' },
  { path: '/stoic', icon: '📖', activeIcon: '📖', label: 'Стоики' },
  { path: '/diary', icon: '📓', activeIcon: '📓', label: 'Дневник' },
];

export default function TabBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleTabClick = (path) => {
    navigator.vibrate?.(10);
    navigate(path);
  };

  return (
    <nav className="tab-bar fixed bottom-0 left-0 right-0 h-[49px] safe-area-bottom flex items-center justify-around z-50">
      {tabs.map((tab) => {
        const isActive = location.pathname === tab.path ||
          (tab.path !== '/' && location.pathname.startsWith(tab.path));

        return (
          <button
            key={tab.path}
            onClick={() => handleTabClick(tab.path)}
            className={`flex flex-col items-center justify-center flex-1 h-full border-none bg-transparent cursor-pointer transition-opacity ${
              isActive ? 'opacity-100' : 'opacity-60'
            }`}
          >
            <span className="text-2xl mb-0.5">
              {isActive ? tab.activeIcon : tab.icon}
            </span>
            <span
              className="caption"
              style={{ color: isActive ? 'var(--apple-blue)' : 'var(--label-secondary)' }}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
