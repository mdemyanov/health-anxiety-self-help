import {
  Wind,
  Pause,
  Wrench,
  BookOpen,
  HeartHandshake,
  Globe,
  FileText,
  BarChart3,
  Search,
  ClipboardList,
  Users,
  Theater,
  Target,
  Scale,
  Home,
  Sunrise,
  Moon,
  Sun,
  RefreshCw,
  Trash2,
  Heart,
  Settings,
  ChevronRight,
  ChevronLeft,
  Eye,
  Hand,
  Ear,
  Bird,
  Building2,
  Building,
  Map,
  Sparkles,
  MessageCircle,
  Snowflake,
  Library,
  MoonStar,
  Leaf,
  Shield,
  Hourglass,
  Check,
  X,
  Compass,
  Smile,
  Play,
  Clock,
  Send,
} from 'lucide-react';

// Custom SVG for nose (no Lucide equivalent)
const NoseIcon = ({ size = 24, className, strokeWidth = 1.5, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M12 4C12 4 8 8 8 14C8 17 9.5 20 12 20C14.5 20 16 17 16 14C16 8 12 4 12 4Z" />
    <path d="M10 16C10 16 11 17 12 17C13 17 14 16 14 16" />
  </svg>
);

// Custom SVG for tongue/taste (no Lucide equivalent)
const TongueIcon = ({ size = 24, className, strokeWidth = 1.5, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M12 4C7 4 4 8 4 12C4 16 7 20 12 20C17 20 20 16 20 12C20 8 17 4 12 4Z" />
    <path d="M12 8V16" />
    <path d="M9 10C9 10 10 12 12 12C14 12 15 10 15 10" />
  </svg>
);

// Custom SVG for prayer hands (no exact Lucide equivalent)
const PrayerIcon = ({ size = 24, className, strokeWidth = 1.5, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M12 4L12 8" />
    <path d="M8 8C8 8 8 12 8 14C8 16 10 20 12 20C14 20 16 16 16 14C16 12 16 8 16 8" />
    <path d="M8 8C8 8 10 10 12 10C14 10 16 8 16 8" />
    <path d="M10 14L12 16L14 14" />
  </svg>
);

// Custom SVG for dove/peace (alternative to Bird)
const DoveIcon = ({ size = 24, className, strokeWidth = 1.5, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M12 8C12 8 14 6 18 6C18 10 16 12 12 12" />
    <path d="M12 12C8 12 4 14 4 18C8 18 10 16 12 12" />
    <path d="M12 12L12 20" />
    <circle cx="16" cy="8" r="1" fill="currentColor" />
  </svg>
);

// Mapping of tool IDs to Lucide components
const TOOL_ICONS = {
  // Emergency tools
  'sos': HeartHandshake,
  'breathing': Wind,
  'stop-pause': Pause,
  'grounding': Globe,

  // CBT tools
  'abc-diary': FileText,
  'triple-column': BarChart3,
  'decatastrophize': Search,
  'facts-vs-feelings': ClipboardList,
  'double-standard': Users,
  'impostor-syndrome': Theater,
  'should-statements': Target,
  'dichotomy': Scale,
  'work-life-balance': Home,
  'decision': Compass,

  // Stoic practices
  'morning': Sunrise,
  'evening': Moon,
  'view-from-above': Bird,
  'quotes': BookOpen,

  // Navigation & UI
  'tools': Wrench,
  'stoic': BookOpen,
  'diary': FileText,
  'statistics': BarChart3,
  'mood': Smile,
  'settings': Settings,
  'delete': Trash2,
  'favorite': Heart,
  'next': ChevronRight,
  'back': ChevronLeft,

  // Theme
  'theme-light': Sun,
  'theme-dark': Moon,
  'theme-auto': RefreshCw,

  // Grounding senses
  'see': Eye,
  'touch': Hand,
  'hear': Ear,
  'smell': NoseIcon,
  'taste': TongueIcon,

  // Journey steps (ViewFromAbove)
  'eagle': Bird,
  'room': Home,
  'building': Building2,
  'city': Building,
  'country': Map,
  'earth': Globe,
  'universe': Sparkles,
  'return': PrayerIcon,
  'release': DoveIcon,

  // SOS specific
  'thoughts': MessageCircle,
  'ice': Snowflake,

  // Misc
  'empty': Library,
  'sleep': MoonStar,
  'letting-go': Leaf,
  'shield': Shield,
  'hourglass': Hourglass,
  'complete': Check,
  'control': Check,
  'no-control': X,
  'sparkles': Sparkles,
  'intention': Target,
  'gratitude': PrayerIcon,
  'learn': BookOpen,
  'improve': RefreshCw,
};

/**
 * ToolIcon - универсальный компонент для отображения иконок инструментов
 * в стиле Apple Liquid Glass
 *
 * @param {string} tool - ID инструмента из TOOL_ICONS
 * @param {number} size - размер иконки в пикселях (по умолчанию 24)
 * @param {string} className - дополнительные CSS классы
 * @param {number} strokeWidth - толщина линий (по умолчанию 1.5)
 * @param {string} variant - вариант стиля: 'default' | 'glass' | 'glow' | 'shadow'
 * @param {string} container - размер контейнера: 'none' | 'sm' | 'md' | 'lg' | 'xl'
 * @param {string} color - цвет фона контейнера: 'none' | 'blue' | 'green' | 'red' | 'orange' | 'purple' | 'tinted'
 */
export default function ToolIcon({
  tool,
  size = 24,
  className = '',
  strokeWidth = 1.5,
  variant = 'default',
  container = 'none',
  color = 'none',
  ...props
}) {
  const IconComponent = TOOL_ICONS[tool];

  if (!IconComponent) {
    console.warn(`ToolIcon: Unknown tool "${tool}"`);
    return null;
  }

  // Build variant classes
  const variantClasses = {
    default: '',
    glass: 'icon-glass',
    glow: 'icon-glow',
    shadow: 'icon-shadow',
  };

  // Build container classes
  const containerClasses = {
    none: '',
    sm: 'icon-container icon-container-sm',
    md: 'icon-container icon-container-md',
    lg: 'icon-container icon-container-lg',
    xl: 'icon-container icon-container-xl',
  };

  // Build color classes
  const colorClasses = {
    none: '',
    blue: 'icon-blue',
    green: 'icon-green',
    red: 'icon-red',
    orange: 'icon-orange',
    purple: 'icon-purple',
    tinted: 'icon-tinted',
  };

  const iconClassName = `${variantClasses[variant] || ''} ${className}`.trim();

  // If container is specified, wrap icon
  if (container !== 'none') {
    const containerClassName = `${containerClasses[container]} ${colorClasses[color] || ''}`.trim();
    return (
      <div className={containerClassName}>
        <IconComponent
          size={size}
          className={iconClassName}
          strokeWidth={strokeWidth}
          {...props}
        />
      </div>
    );
  }

  return (
    <IconComponent
      size={size}
      className={iconClassName}
      strokeWidth={strokeWidth}
      {...props}
    />
  );
}

// Export individual icons for direct use
export {
  Wind,
  Pause,
  Wrench,
  BookOpen,
  HeartHandshake,
  Globe,
  FileText,
  BarChart3,
  Search,
  ClipboardList,
  Users,
  Theater,
  Target,
  Scale,
  Home,
  Sunrise,
  Moon,
  Sun,
  RefreshCw,
  Trash2,
  Heart,
  Settings,
  ChevronRight,
  ChevronLeft,
  Eye,
  Hand,
  Ear,
  Bird,
  Building2,
  Building,
  Map,
  Sparkles,
  MessageCircle,
  Snowflake,
  Library,
  MoonStar,
  Leaf,
  Shield,
  Hourglass,
  Check,
  X,
  Compass,
  Smile,
  Play,
  Clock,
  Send,
  // Custom icons
  NoseIcon,
  TongueIcon,
  PrayerIcon,
  DoveIcon,
};
