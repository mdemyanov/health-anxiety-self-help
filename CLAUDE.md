# CLAUDE.md — Приложение самопомощи для руководителей IT

## Текущий статус проекта

**Версия**: 3.2 (Executive Edition)
**Последнее обновление**: 16 января 2026
**Деплой**: Yandex Object Storage (автоматический через GitHub Actions)

### Целевая аудитория

- **Возраст**: 35-50 лет
- **Роль**: CEO, CTO, CPO, директора IT-компаний в России
- **Основной фокус**: управленческий стресс, принятие решений, баланс работа-семья
- **Вторичный фокус**: здоровье как часть жизни руководителя 35+
- **Методология**: КПТ (когнитивно-поведенческая терапия) + стоическая философия

### Книги-основы

- "Думай как римский император" (Donald Robertson) — стоические практики
- "Терапия настроения" (David Burns) — 10 когнитивных искажений и техники КПТ

### Завершённые модули

- [x] **Базовая структура** — React 18 + Vite + React Router
- [x] **Тёмная/светлая тема** — автопереключение + ручной выбор
- [x] **Chat-based UX** — все пошаговые инструменты в формате чата
- [x] **Тестирование** — Vitest + Testing Library + Playwright
- [x] **SOS-модуль** — комплексная помощь при панике (бизнес + здоровье контекст)
- [x] **Дыхание "Квадрат"** — 4-4-4-4 с анимацией квадрата
- [x] **Дыхание 4-7-8** — с анимированным кругом
- [x] **СТОП-пауза** — chat flow с таймерами
- [x] **Техника 54321** — заземление через органы чувств
- [x] **ABC-дневник** — с чеклистом 10 когнитивных искажений Burns
- [x] **Декатастрофизация** — анализ вероятности + план совладания
- [x] **Дихотомия контроля** — управленческий контекст + шаг действия
- [x] **Двойной стандарт** — "Что бы ты сказал другу?" (Burns, гл. 4)
- [x] **Три колонки** — мысль → искажение → рациональный ответ (Burns, гл. 4)
- [x] **Факты vs Чувства** — отделение интерпретаций от реальности (Burns, гл. 5)
- [x] **Работа с "должен"** — трансформация долженствований (Burns, гл. 5)
- [x] **Утренняя практика** — приоритеты дня, намерение руководителя
- [x] **Вечерняя рефлексия** — обзор решений, благодарность
- [x] **Взгляд сверху** — космическая перспектива
- [x] **Цитаты стоиков** — 40 цитат с категориями (решения, лидерство, команда и др.)
- [x] **Трекер настроения** — график 7 дней + тренд
- [x] **PWA** — Service Worker, manifest, оффлайн-режим
- [x] **Apple Liquid Glass** — CSS-based glass effects (iOS 26 style)

### Технический стек

```
React 18.2 + Vite 4.5
React Router 6
Tailwind CSS 4 (@tailwindcss/postcss)
Framer Motion 11 (анимации чата)
vite-plugin-pwa 0.17
localStorage для данных

# Тестирование
Vitest 0.33.0 + @testing-library/react 14
Playwright 1.44 (E2E)
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
│   │   ├── chat/                 # Chat UI компоненты (NEW)
│   │   │   ├── index.js          # Экспорт всех компонентов
│   │   │   ├── ChatContainer.jsx # Контейнер чата с header и input
│   │   │   ├── ChatMessage.jsx   # Сообщение (therapist/user/system)
│   │   │   ├── ChatInput.jsx     # Поле ввода с кнопкой отправки
│   │   │   ├── ChatTypingIndicator.jsx  # Индикатор "печатает..."
│   │   │   └── messages/         # Интерактивные элементы в сообщениях
│   │   │       ├── ChatTimer.jsx       # Таймер с круговым прогрессом
│   │   │       ├── ChatBreathing.jsx   # Дыхательная анимация
│   │   │       ├── ChatSlider.jsx      # Слайдер (вероятность)
│   │   │       ├── ChatChecklist.jsx   # Чеклист с галочками
│   │   │       ├── ChatQuote.jsx       # Цитата стоиков
│   │   │       ├── ChatMultiInput.jsx  # Несколько полей (5-4-3-2-1)
│   │   │       └── ChatComparison.jsx  # Сравнение до/после
│   │   ├── layout/               # TabBar, Header
│   │   └── ui/                   # Button, Card, ActionCard
│   ├── context/
│   │   └── ThemeContext.jsx      # Тёмная/светлая тема
│   ├── data/
│   │   └── quotes.js             # 40 цитат стоиков с категориями
│   ├── flows/                    # Конфигурации chat flows (13 flows)
│   │   ├── sosFlow.js            # SOS-помощь
│   │   ├── stopPauseFlow.js      # СТОП-пауза
│   │   ├── groundingFlow.js      # Техника 5-4-3-2-1
│   │   ├── abcFlow.js            # ABC-дневник
│   │   ├── decatastrophizeFlow.js # Декатастрофизация
│   │   ├── dichotomyFlow.js      # Дихотомия контроля
│   │   ├── doubleStandardFlow.js # Двойной стандарт (Burns)
│   │   ├── tripleColumnFlow.js   # Три колонки (Burns)
│   │   ├── factsVsFeelingsFlow.js # Факты vs Чувства (Burns)
│   │   ├── shouldStatementsFlow.js # Работа с "должен" (Burns)
│   │   ├── morningFlow.js        # Утренняя практика
│   │   ├── eveningFlow.js        # Вечерняя рефлексия
│   │   └── viewFromAboveFlow.js  # Взгляд сверху
│   ├── hooks/
│   │   ├── useLocalStorage.js
│   │   ├── useTimer.js
│   │   ├── useHaptic.js
│   │   └── useChatFlow.js        # Hook для управления chat flow (NEW)
│   ├── pages/
│   │   ├── breathing/            # BoxBreathing, Breathing478
│   │   ├── chat/                 # (NEW)
│   │   │   └── ChatTool.jsx      # Универсальная страница чат-инструмента
│   │   ├── diary/                # MoodTracker
│   │   ├── stoic/                # Quotes (остальное через ChatTool)
│   │   ├── tools/                # (через ChatTool)
│   │   ├── Home.jsx
│   │   ├── Tools.jsx
│   │   ├── Stoic.jsx
│   │   └── Diary.jsx
│   ├── App.jsx                   # Роутинг
│   ├── main.jsx                  # Entry point
│   └── index.css                 # Tailwind + Apple Liquid Glass CSS
├── e2e/                              # E2E тесты (Playwright)
│   ├── navigation.spec.js
│   ├── theme.spec.js
│   ├── sos-flow.spec.js
│   ├── abc-diary.spec.js
│   ├── breathing.spec.js
│   ├── stoic-tools.spec.js
│   ├── cognitive-tools.spec.js
│   ├── quotes.spec.js
│   └── mood-tracker.spec.js
├── test/                             # Тестовые утилиты
│   ├── setup.js                      # Vitest setup (моки)
│   └── utils/
│       ├── renderWithProviders.jsx   # Обёртка с ThemeProvider, Router
│       └── flowTestUtils.js          # Хелперы для таймеров
├── CLAUDE.md                     # Этот файл
├── health-anxiety-self-help-guide.md  # Контент и методички
├── index.html
├── package.json
├── vitest.config.js              # Конфигурация Vitest
├── playwright.config.js          # Конфигурация Playwright
├── vite.config.js                # PWA конфигурация
├── tailwind.config.js
└── postcss.config.js
```

---

## Chat-based UX Architecture

Все пошаговые инструменты реализованы в формате чата — диалога с виртуальным терапевтом.

### Концепция

Пользователь общается с "терапевтом" через чат-интерфейс:
- **Сообщения терапевта** (слева) — инструкции, вопросы, поддержка
- **Сообщения пользователя** (справа, синий фон) — ответы
- **Системные сообщения** (по центру) — "Таймер завершён", "Запись сохранена"
- **Интерактивные элементы** — таймеры, слайдеры, чеклисты внутри сообщений

### Flow Configuration

Каждый инструмент описывается как конфигурация в `src/flows/`:

```javascript
// Пример: flows/abcFlow.js
export const abcFlow = {
  id: 'abc-diary',
  title: 'ABC-дневник',
  saveKey: 'abc-entries',

  steps: [
    {
      id: 'intro',
      messages: [
        {
          type: 'therapist',
          content: 'Давай разберём ситуацию по методу ABC.',
        },
        {
          type: 'therapist',
          content: 'Что произошло? Опиши событие (A).',
          awaitInput: { placeholder: 'Опиши ситуацию...', multiline: true },
          saveAs: 'A',
        },
      ],
    },
    // ... остальные шаги
  ],
};
```

### Типы сообщений

| type | Описание |
|------|----------|
| `therapist` | Сообщение терапевта (слева, glass) |
| `user` | Ответ пользователя (справа, синий) |
| `system` | Системное уведомление (по центру) |
| `timer` | Таймер с круговым прогрессом |
| `breathing` | Дыхательная анимация |
| `slider` | Слайдер (например, вероятность 0-100%) |
| `checklist` | Чеклист с галочками |
| `quote` | Цитата стоиков |
| `multi-input` | Несколько полей ввода (5-4-3-2-1) |
| `comparison` | Сравнение до/после |

### Hook useChatFlow

```javascript
const {
  messages,           // Массив сообщений для отображения
  awaitingInput,      // Ожидаем ли ввод от пользователя
  isTyping,           // Показывать индикатор "печатает..."
  handleUserInput,    // Обработчик текстового ввода
  handleInteractionComplete, // Для таймеров, слайдеров
  collectedData,      // Собранные данные
  isComplete,         // Завершён ли flow
} = useChatFlow(flowConfig);
```

### Тон сообщений

Используется **дружелюбный стиль** — обращение на "ты":
- "Давай разберёмся вместе"
- "Отлично! Идём дальше"
- "Как ты себя чувствуешь?"
- "Ты справился!"

---

## Контекст проекта

Мобильное PWA-приложение для руководителей IT-компаний в России (35+). Объединяет техники когнитивно-поведенческой терапии (КПТ) и стоическую философию для управления стрессом и тревогой.

### Профиль пользователя

- **Возраст**: 35-50 лет
- **Роль**: CEO, CTO, CPO, директор IT-компании
- **Локация**: Россия
- **Контекст 2024-2026**:
  - Замедление роста IT-рынка
  - Кадровый дефицит (500-700 тыс. специалистов)
  - AI-трансформация и импортозамещение
  - Высокая ставка ЦБ, финансовая нестабильность

### Основные проблемы пользователей

1. **Управленческий стресс** — решения, ответственность, неопределённость
2. **Баланс работа-семья** — время на детей, супругу, родителей
3. **Кризис среднего возраста** — смысл, достижения, "что дальше?"
4. **Здоровье** — возрастные изменения, хронический стресс
5. **Синдром самозванца** — "достаточно ли я компетентен?"

### Терапевтический фокус

**Основной**: управленческий стресс, принятие решений
**Вторичный**: здоровье как часть жизни руководителя 35+

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

### ⚠️ ВАЖНО: НЕ использовать библиотеку `liquid-glass-react`

Библиотека `liquid-glass-react` создаёт canvas overlay, который **блокирует все pointer events**. Это делает кнопки и интерактивные элементы некликабельными.

**Решение**: Использовать **CSS-based glass effects** вместо библиотеки:

```jsx
// ❌ НЕ ДЕЛАТЬ — кнопки не будут кликабельны
import LiquidGlass from 'liquid-glass-react';
<LiquidGlass><button>Click me</button></LiquidGlass>

// ✅ ПРАВИЛЬНО — использовать CSS классы
<button className="btn-glass">Click me</button>
<div className="liquid-glass">Content</div>
<nav className="tab-bar-float">...</nav>
```

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
| `.tab-bar-float` | Плавающий TabBar (rounded, glass) |
| `.chat-header` | Header чата (glass) |
| `.chat-input-bar` | Поле ввода чата (glass) |
| `.chat-bubble-therapist` | Сообщение терапевта (22px 22px 22px 6px) |
| `.chat-bubble-user` | Сообщение пользователя (22px 22px 6px 22px) |

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
npm install --legacy-peer-deps

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

## Тестирование

### Тестовый стек

| Инструмент | Назначение |
|------------|------------|
| **Vitest** | Unit и интеграционные тесты |
| **@testing-library/react** | Тестирование React-компонентов |
| **@testing-library/user-event** | Симуляция пользовательских событий |
| **jsdom** | DOM-окружение для тестов |
| **Playwright** | E2E тесты (кросс-браузерные) |

### Команды тестирования

```bash
# Unit и интеграционные тесты
npm run test              # Запуск в watch-режиме
npm run test:coverage     # С отчётом о покрытии

# E2E тесты
npm run test:e2e          # Headless режим
npm run test:e2e:headed   # С открытым браузером
npm run test:e2e:debug    # Debug режим
```

### Структура тестов

```
src/
├── hooks/__tests__/              # Unit-тесты хуков
│   ├── useTimer.test.js          # 21 тест
│   ├── useLocalStorage.test.js   # 21 тест
│   ├── useHaptic.test.js         # 16 тестов
│   └── useChatFlow.test.js       # 23 теста
├── components/**/__tests__/      # Компонентные тесты
│   └── ui/__tests__/Button.test.jsx
├── flows/__tests__/              # Валидация flow-конфигураций
│   └── flowSchema.test.js
├── data/__tests__/               # Тесты данных
│   └── quotes.test.js
└── context/__tests__/            # Тесты контекста
    └── ThemeContext.test.jsx

e2e/                              # E2E тесты (Playwright)
├── navigation.spec.js            # Навигация и TabBar
├── theme.spec.js                 # Переключение темы
├── sos-flow.spec.js              # SOS-помощь
├── abc-diary.spec.js             # ABC-дневник
├── breathing.spec.js             # Дыхательные упражнения
├── stoic-tools.spec.js           # Стоические практики
├── cognitive-tools.spec.js       # Когнитивные инструменты
├── quotes.spec.js                # Цитаты стоиков
└── mood-tracker.spec.js          # Трекер настроения

test/                             # Setup и утилиты
├── setup.js                      # Глобальные моки
└── utils/
    ├── renderWithProviders.jsx   # Обёртка с провайдерами
    └── flowTestUtils.js          # Хелперы для таймеров
```

### Покрытие кода

| Категория | Цель |
|-----------|------|
| Хуки | 90%+ |
| Компоненты | 70%+ |
| Flow-конфигурации | 100% (валидация) |
| Общее | 70%+ |

### Написание тестов

**Хуки:** Используй `renderHook` из `@testing-library/react`

```javascript
import { renderHook, act } from '@testing-library/react';
import { useTimer } from '../useTimer';

it('should countdown', () => {
  vi.useFakeTimers();
  const { result } = renderHook(() => useTimer(5));

  act(() => result.current.start());
  act(() => vi.advanceTimersByTime(1000));

  expect(result.current.timeLeft).toBe(4);
});
```

**Таймеры:** Используй `vi.useFakeTimers()` и `vi.advanceTimersByTime()`

**Компоненты:** Используй `renderWithProviders` из `test/utils/`

```javascript
import { renderWithProviders, screen } from '../../test/utils/renderWithProviders';

it('should render button', () => {
  renderWithProviders(<Button>Click me</Button>);
  expect(screen.getByRole('button')).toHaveTextContent('Click me');
});
```

### Моки

В `test/setup.js` настроены глобальные моки:
- `localStorage` — полная эмуляция
- `navigator.vibrate` — haptic feedback
- `matchMedia` — определение темы
- `framer-motion` — анимации заменены на статичные элементы
- `liquid-glass-react` — canvas заменён на div

### CI/CD интеграция

При push в `main`:
1. **Job `test`** — unit-тесты с coverage
2. **Job `e2e`** — Playwright тесты (после успеха unit-тестов)
3. **Job `deploy`** — деплой только после прохождения всех тестов

Артефакты:
- `coverage-report/` — отчёт о покрытии (7 дней)
- `playwright-report/` — отчёт E2E тестов (7 дней)

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

  // Двойной стандарт (Burns)
  'double-standard-entries': [{ id, date, selfCriticism, situation, friendResponse, compassionateResponse, action }],

  // Три колонки (Burns)
  'triple-column-entries': [{ id, date, automaticThought, distortions, distortionExplanation, rationalResponse, beliefRating }],

  // Факты vs Чувства (Burns)
  'facts-vs-feelings-entries': [{ id, date, situation, feelings, thoughts, factsOnly, alternative, anxietyLevel }],

  // Работа с "должен" (Burns)
  'should-statements-entries': [{ id, date, shouldStatement, target, source, consequence, realityCheck, reframe, selfCompassion }],

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
- [x] Размер бандла: ~380 KB JS (121 KB gzip)

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

## Дорожная карта

### v3.0 (январь 2026) — Chat-based UX ✅
- Все пошаговые инструменты в формате чата
- Apple Liquid Glass дизайн
- 9 chat flows

### v3.1 (январь 2026) — Тестирование ✅
- Unit-тесты хуков (useChatFlow, useTimer, useLocalStorage, useHaptic) — 81 тест
- Компонентные тесты (Button, ThemeContext, Quotes)
- Валидация flow-конфигураций
- E2E тесты (9 сценариев)
- CI/CD с обязательным прохождением тестов

### v3.2 (январь 2026) — КПТ-инструменты Burns ✅
- 4 новых flow из "Терапии настроения" (David Burns)
- Двойной стандарт — самосострадание через перспективу друга
- Три колонки — мысль → искажение → рациональный ответ
- Факты vs Чувства — отделение интерпретаций от реальности
- Работа с "должен" — трансформация долженствований
- Всего 13 chat flows

### v4.0 (планируется) — Расширения
- Синхронизация данных (опционально)
- Экспорт/импорт данных
- Статистика и аналитика

---

## История изменений

### v3.2 (16 января 2026)
- 4 новых КПТ-инструмента из "Терапии настроения" (David Burns):
  - Двойной стандарт (doubleStandardFlow.js)
  - Три колонки (tripleColumnFlow.js)
  - Факты vs Чувства (factsVsFeelingsFlow.js)
  - Работа с "должен" (shouldStatementsFlow.js)
- Всего 13 chat flows
- Обновлены тесты для валидации новых flows

### v3.1 (15 января 2026)
- Добавлена полная инфраструктура тестирования
- Vitest 0.33.0 + @testing-library/react 14
- Playwright 1.44 для E2E тестов
- 81 unit-тест для хуков
- 9 E2E тест-файлов
- CI/CD: тесты обязательны перед деплоем

### v3.0 (15 января 2026)
- Полный редизайн UX: все пошаговые инструменты переведены на chat-based интерфейс
- Добавлена система flow-конфигураций для декларативного описания диалогов
- Интеграция Framer Motion для анимаций сообщений
- Отказ от `liquid-glass-react` в пользу CSS-based glass effects (fix: blocked clicks)
- Новые компоненты: ChatContainer, ChatMessage, ChatInput, ChatTimer, ChatSlider и др.

### v2.0 (январь 2026)
- Миграция на React + Vite
- Apple Liquid Glass design (iOS 26)
- PWA с оффлайн-режимом

### v1.0 (декабрь 2025)
- Первая версия на чистом HTML/CSS/JS

---

*Последнее обновление: 16 января 2026*
