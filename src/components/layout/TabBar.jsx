import { useNavigate, useLocation } from 'react-router-dom';

const tabs = [
  {
    path: '/',
    label: 'Главная',
    icon: (active) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" fill={active ? 'var(--background)' : 'none'} stroke={active ? 'var(--background)' : 'currentColor'} />
      </svg>
    )
  },
  {
    path: '/tools',
    label: 'Техники',
    icon: (active) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    )
  },
  {
    path: '/stoic',
    label: 'Стоики',
    icon: (active) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    )
  },
  {
    path: '/diary',
    label: 'Дневник',
    icon: (active) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    )
  },
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
              className="relative z-10 flex flex-col items-center justify-center flex-1 h-full border-none bg-transparent cursor-pointer transition-all duration-200"
              style={{
                color: isActive ? 'var(--apple-blue)' : 'var(--label-secondary)',
                transform: isActive ? 'scale(1.05)' : 'scale(1)'
              }}
            >
              <div className="mb-1">
                {tab.icon(isActive)}
              </div>
              <span className="text-[10px] font-medium">
                {tab.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
