# CLAUDE.md — Мобильное приложение самопомощи при тревоге о здоровье

## Текущий статус проекта

**Версия**: 2.0 (React + Vite)
**Последнее обновление**: 15 января 2026
**Деплой**: Yandex Object Storage (автоматический через GitHub Actions)

### Завершённые модули

- [x] **Базовая структура** — React 18 + Vite + React Router
- [x] **Тёмная/светлая тема** — автопереключение + ручной выбор
- [x] **SOS-модуль** — 11-шаговый guided flow с дыханием и заземлением
- [x] **Дыхание "Квадрат"** — 4-4-4-4 с анимацией квадрата
- [x] **Дыхание 4-7-8** — с анимированным кругом
- [x] **СТОП-пауза** — 4 шага с таймером
- [x] **Техника 54321** — заземление с полями ввода
- [x] **Дневник ABC** — форма A-B-C-D-E + просмотр/удаление записей
- [x] **Декатастрофизация** — 8 шагов со слайдерами вероятности
- [x] **Дихотомия контроля** — чеклисты + кастомный ввод
- [x] **Утренняя практика** — 7 guided экранов (Memento Mori, Premeditatio)
- [x] **Вечерняя рефлексия** — 8 экранов с обзором дня
- [x] **Взгляд сверху** — визуализация с таймерами
- [x] **Цитаты стоиков** — 15 цитат с фильтрами и избранным
- [x] **Трекер настроения** — график 7 дней + тренд
- [x] **PWA** — Service Worker, manifest, оффлайн-режим

### Технический стек

```
React 18.2 + Vite 4.5
React Router 6
Tailwind CSS 4 (@tailwindcss/postcss)
vite-plugin-pwa 0.17
localStorage для данных
```

---

## Структура проекта

```
/health-anxiety-self-help
├── .github/workflows/deploy.yml  # GitHub Actions → Yandex S3
├── public/
│   ├── icon-192.svg              # PWA иконка
│   └── icon-512.svg
├── src/
│   ├── components/
│   │   ├── breathing/            # BreathingCircle
│   │   ├── layout/               # TabBar, Header, SosButton
│   │   └── ui/                   # Button, Card, ActionCard
│   ├── context/
│   │   └── ThemeContext.jsx      # Тёмная/светлая тема
│   ├── data/
│   │   └── quotes.js             # 15 цитат стоиков
│   ├── hooks/
│   │   ├── useLocalStorage.js
│   │   ├── useTimer.js
│   │   └── useHaptic.js
│   ├── pages/
│   │   ├── breathing/            # BoxBreathing, Breathing478
│   │   ├── diary/                # MoodTracker
│   │   ├── sos/                  # SosStart, SosFlow
│   │   ├── stoic/                # Morning, Evening, ViewFromAbove, Quotes
│   │   ├── tools/                # StopPause, Grounding, ABC, Decatastrophize, Dichotomy
│   │   ├── Home.jsx
│   │   ├── Tools.jsx
│   │   ├── Stoic.jsx
│   │   └── Diary.jsx
│   ├── App.jsx                   # Роутинг
│   ├── main.jsx                  # Entry point
│   └── index.css                 # Tailwind + Apple Liquid Glass
├── CLAUDE.md                     # Этот файл
├── health-anxiety-self-help-guide.md  # Контент и методички
├── index.html
├── package.json
├── vite.config.js                # PWA конфигурация
├── tailwind.config.js
└── postcss.config.js
```

---

## Контекст проекта

Создаём мобильное HTML-приложение (PWA) для клиента КПТ-терапии с тревогой о здоровье. Приложение объединяет техники когнитивно-поведенческой терапии и стоическую философию.

### Профиль пользователя

- Мужчина, руководитель (директор компании)
- Диагноз: атеросклеротическая бляшка в сонной артерии (60% стеноз)
- Негативная наследственность (дед умер, отцу делали операцию)
- Прогрессия холестерина за год
- Высокий рабочий стресс (2 года), финансовый кризис компании
- Уже занимается спортом и следит за питанием
- Планирует читать "Думай как римский император" (Дональд Робертсон)

### Терапевтический фокус

Основной: тревога о здоровье (health anxiety)
Вторичный: управление стрессом, принятие ситуации

---

## Технические требования

- **Формат**: Модульный React-проект (Vite)
- **Фреймворк**: React 18 с функциональными компонентами и hooks
- **Стилизация**: Tailwind CSS 4 + CSS переменные (Apple Liquid Glass)
- **Адаптивность**: Mobile-first, работает на телефоне
- **Оффлайн**: PWA с Service Worker (vite-plugin-pwa)
- **Хранение**: localStorage для дневника и настроек
- **Тема**: Светлая + тёмная (автопереключение или вручную)

### Дизайн

- Спокойные цвета (синие, зелёные, нейтральные)
- Крупные кнопки (использование в состоянии тревоги)
- Минимум текста на экране
- Плавные анимации (дыхание, переходы)
- Haptic feedback где возможно (navigator.vibrate)

---

## Apple Liquid Glass Design (iOS 26 / WWDC 2025)

Приложение использует **Liquid Glass** — новый дизайн-язык Apple, анонсированный на WWDC 2025.

### Что такое Liquid Glass

Liquid Glass — это полупрозрачный материал, который отражает и преломляет окружающий контент, динамически трансформируясь для фокусировки на контенте. Дизайн создаёт эффект реального стекла с бликами и тенями.

**Источники:**
- [Apple Newsroom](https://www.apple.com/newsroom/2025/06/apple-introduces-a-delightful-and-elegant-new-software-design/)
- [Wikipedia: Liquid Glass](https://en.wikipedia.org/wiki/Liquid_Glass)

### Ключевые характеристики

- **Усиленный glassmorphism**: `backdrop-filter: blur(40px)` — более выраженное размытие
- **Высокая прозрачность**: `rgba(255, 255, 255, 0.25-0.45)` в светлой теме
- **Тонкие границы**: `border: 0.5px solid rgba(255, 255, 255, 0.3-0.5)`
- **Specular highlights**: градиентные блики, имитирующие преломление света
- **Многослойные тени**: 3 уровня теней для глубины
- **Spring-based анимации**: `cubic-bezier(0.4, 0, 0.2, 1)` — физически реалистичные переходы

### CSS-переменные Liquid Glass

```css
/* Light Mode */
--glass-bg: rgba(255, 255, 255, 0.45);
--glass-bg-elevated: rgba(255, 255, 255, 0.6);
--glass-bg-button: rgba(255, 255, 255, 0.35);
--glass-border: rgba(255, 255, 255, 0.5);
--glass-border-subtle: rgba(0, 0, 0, 0.06);
--glass-blur: 40px;
--glass-shadow:
  0 2px 4px rgba(0, 0, 0, 0.02),
  0 8px 16px rgba(0, 0, 0, 0.04),
  0 16px 32px rgba(0, 0, 0, 0.06);
--glass-highlight: linear-gradient(135deg, rgba(255,255,255,0.6) 0%, transparent 60%);
--glass-inner-highlight: inset 0 1px 1px rgba(255, 255, 255, 0.6);

/* Dark Mode */
--glass-bg: rgba(255, 255, 255, 0.08);
--glass-bg-elevated: rgba(255, 255, 255, 0.12);
--glass-border: rgba(255, 255, 255, 0.15);
--glass-shadow: /* более тёмные тени */
--glass-highlight: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%);
```

### CSS-классы компонентов

| Класс | Назначение |
|-------|------------|
| `.liquid-glass` | Базовый Liquid Glass материал |
| `.liquid-glass-elevated` | Для карточек на цветном фоне |
| `.card` | Алиас для `.liquid-glass` |
| `.action-card` | Интерактивные карточки |
| `.btn-glass` | Стеклянная кнопка |
| `.btn-filled` | Заполненная кнопка с тенью |
| `.btn-tinted` | Полупрозрачная цветная кнопка |
| `.glass-tint-{color}` | Цветные оттенки: blue, green, red, orange, purple |

### Цветовая палитра Apple

| Цвет | Light Mode | Dark Mode |
|------|------------|-----------|
| Blue (Primary) | `#007AFF` | `#0A84FF` |
| Green (Success) | `#34C759` | `#30D158` |
| Red (SOS/Danger) | `#FF3B30` | `#FF453A` |
| Orange (Warning) | `#FF9500` | `#FF9F0A` |
| Purple | `#AF52DE` | `#BF5AF2` |
| Background | `#F2F2F7` | `#000000` |
| Label | `#000000` | `#FFFFFF` |
| Secondary Label | `rgba(60, 60, 67, 0.6)` | `rgba(235, 235, 245, 0.6)` |

### Типографика

```css
font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', system-ui, sans-serif;
```

| Стиль | Размер | Вес | Letter-spacing |
|-------|--------|-----|----------------|
| Large Title | 34px | Bold (700) | -0.02em |
| Title 1 | 28px | Bold (700) | -0.02em |
| Title 2 | 22px | Bold (700) | -0.02em |
| Headline | 17px | Semibold (600) | -0.01em |
| Body | 17px | Regular (400) | 0 |
| Callout | 16px | Regular (400) | 0 |
| Subhead | 15px | Regular (400) | 0 |
| Footnote | 13px | Regular (400) | 0 |
| Caption | 12px | Regular (400) | 0 |

### Компоненты React

```jsx
// Card с Liquid Glass
<Card className="p-6">Контент</Card>
<Card elevated className="p-6">Elevated карточка</Card>

// ActionCard с цветным оттенком
<ActionCard to="/path" tint="blue">Синий оттенок</ActionCard>

// Button варианты
<Button variant="filled">Primary</Button>
<Button variant="glass">Glass</Button>
<Button variant="tinted">Tinted</Button>
<Button variant="gray">Gray</Button>
```

---

## Команды разработки

```bash
# Установка зависимостей
npm install

# Запуск dev-сервера
npm run dev

# Сборка для продакшена
npm run build

# Линтинг
npm run lint

# Предпросмотр сборки
npm run preview
```

---

## Деплой

Автоматический деплой через GitHub Actions при push в `main`:

1. Checkout репозитория
2. Setup Node.js 18
3. `npm ci` — установка зависимостей
4. `npm run build` — сборка Vite
5. Синхронизация `dist/` с Yandex Object Storage

**Секреты GitHub:**
- `YC_ACCESS_KEY_ID`
- `YC_SECRET_ACCESS_KEY`
- `YC_BUCKET_NAME`

---

## Данные localStorage

```javascript
const appData = {
  // Тема
  theme: 'light' | 'dark',

  // ABC-записи
  'abc-entries': [{ id, date, A, B, C, D, E }],

  // Трекер настроения
  'mood-entries': [{ date, mood, anxiety, note }],

  // Утреннее намерение
  'daily-intention': { text, date },

  // Вечерние рефлексии
  'evening-reflections': [{ date, ... }],

  // Избранные цитаты
  'favorite-quotes': [quoteId],

  // Цитата дня
  'quoteOfDayDate': 'date string',
  'quoteOfDayId': 'number'
};
```

---

## Критерии готовности

- [x] Работает на мобильном (iOS Safari, Android Chrome)
- [x] Все формы сохраняют данные в localStorage
- [x] Дыхательная анимация плавная (60fps)
- [x] Тёмная тема не режет глаза
- [x] SOS-кнопка доступна с любого экрана
- [x] Работает офлайн после первой загрузки
- [x] Размер бандла: ~233 KB JS (70.5 KB gzip)

---

## Референсы

### Методические рекомендации
Полный контент для всех модулей — в файле `health-anxiety-self-help-guide.md`

### Когнитивные искажения (для чеклиста ABC)
- Катастрофизация
- Предсказание будущего
- Чёрно-белое мышление
- Эмоциональное обоснование
- Сверхобобщение
- Чтение мыслей
- Долженствование
- Персонализация
- Туннельное зрение
- Минимизация позитивного

---

*Последнее обновление: 15 января 2026*
