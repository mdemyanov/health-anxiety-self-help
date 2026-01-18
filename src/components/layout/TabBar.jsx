import { useNavigate, useLocation } from 'react-router-dom';
import { HomeIcon, ToolsIcon, BookIcon, CalendarIcon } from '../icons';

const tabs = [
  { path: '/', label: 'Главная', Icon: HomeIcon },
  { path: '/tools', label: 'Техники', Icon: ToolsIcon },
  { path: '/stoic', label: 'Стоики', Icon: BookIcon },
  { path: '/diary', label: 'Дневник', Icon: CalendarIcon },
];

export default function TabBar() {
  const navigate = useNavigate();
  const location = useLocation();

  // Hide TabBar on chat pages
  const hiddenPaths = [
    '/sos',
    '/tools/stop-pause', '/tools/grounding', '/tools/abc',
    '/tools/decatastrophize', '/tools/dichotomy',
    '/tools/double-standard', '/tools/triple-column',
    '/tools/facts-vs-feelings', '/tools/should-statements',
    '/tools/impostor-syndrome', '/tools/decision', '/tools/work-life-balance',
    '/stoic/morning', '/stoic/evening', '/stoic/view-from-above',
    '/settings'
  ];

  if (hiddenPaths.some(path => location.pathname.startsWith(path))) {
    return null;
  }

  const handleTabClick = (path) => {
    navigator.vibrate?.(10);
    navigate(path);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-2 safe-area-bottom">
      <nav className="tab-bar-float flex items-center justify-around h-[64px]">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path ||
            (tab.path !== '/' && location.pathname.startsWith(tab.path));

          return (
            <button
              key={tab.path}
              onClick={() => handleTabClick(tab.path)}
              className="tab-bar-item"
              data-active={isActive}
            >
              <div className="tab-bar-icon">
                <tab.Icon size={24} filled={isActive} />
              </div>
              <span className="tab-bar-label">
                {tab.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
