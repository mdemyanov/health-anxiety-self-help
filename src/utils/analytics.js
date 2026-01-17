/**
 * Система трекинга использования техник
 * Сохраняет данные в localStorage для последующего анализа в статистике
 */

const STORAGE_KEY = 'tool-usage';
const MAX_ENTRIES = 500; // Максимум записей для хранения

/**
 * Логирует использование техники
 * @param {string} toolId - ID техники (например, 'abc-diary', 'sos')
 * @param {boolean} completed - Была ли техника завершена полностью
 * @param {Object} options - Дополнительные параметры
 * @param {number} options.anxietyBefore - Уровень тревоги до практики (0-10)
 * @param {number} options.anxietyAfter - Уровень тревоги после практики (0-10)
 * @param {number} options.rating - Оценка полезности (1-5)
 */
export function logToolUsage(toolId, completed, options = {}) {
  const entries = getToolUsage();

  const entry = {
    id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    toolId,
    completed,
    date: new Date().toISOString(),
    dayOfWeek: new Date().getDay(), // 0 = Sunday, 1 = Monday, etc.
    hour: new Date().getHours(),
    ...options,
  };

  entries.unshift(entry);

  // Ограничиваем количество записей
  if (entries.length > MAX_ENTRIES) {
    entries.length = MAX_ENTRIES;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  return entry;
}

/**
 * Получает все записи использования техник
 * @returns {Array} Массив записей
 */
export function getToolUsage() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

/**
 * Получает статистику по использованию техник
 * @param {number} days - За сколько дней (по умолчанию 30)
 * @returns {Object} Статистика
 */
export function getToolStats(days = 30) {
  const entries = getToolUsage();
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);

  const recentEntries = entries.filter(e => new Date(e.date) >= cutoffDate);

  // Подсчёт использования по техникам
  const usageByTool = {};
  recentEntries.forEach(entry => {
    if (!usageByTool[entry.toolId]) {
      usageByTool[entry.toolId] = {
        total: 0,
        completed: 0,
        anxietyReduction: [],
        ratings: [],
      };
    }
    usageByTool[entry.toolId].total++;
    if (entry.completed) {
      usageByTool[entry.toolId].completed++;
    }
    if (entry.anxietyBefore !== undefined && entry.anxietyAfter !== undefined) {
      usageByTool[entry.toolId].anxietyReduction.push(entry.anxietyBefore - entry.anxietyAfter);
    }
    if (entry.rating !== undefined) {
      usageByTool[entry.toolId].ratings.push(entry.rating);
    }
  });

  // Подсчёт по дням недели
  const usageByDayOfWeek = [0, 0, 0, 0, 0, 0, 0];
  recentEntries.forEach(entry => {
    usageByDayOfWeek[entry.dayOfWeek]++;
  });

  // Подсчёт по часам
  const usageByHour = new Array(24).fill(0);
  recentEntries.forEach(entry => {
    if (entry.hour !== undefined) {
      usageByHour[entry.hour]++;
    }
  });

  return {
    totalUsage: recentEntries.length,
    completedUsage: recentEntries.filter(e => e.completed).length,
    usageByTool,
    usageByDayOfWeek,
    usageByHour,
  };
}

/**
 * Получает эффективность техник (средние снижение тревоги)
 * @returns {Array} Массив техник отсортированный по эффективности
 */
export function getToolEffectiveness() {
  const stats = getToolStats();

  return Object.entries(stats.usageByTool)
    .map(([toolId, data]) => {
      const avgReduction = data.anxietyReduction.length > 0
        ? data.anxietyReduction.reduce((a, b) => a + b, 0) / data.anxietyReduction.length
        : null;
      const avgRating = data.ratings.length > 0
        ? data.ratings.reduce((a, b) => a + b, 0) / data.ratings.length
        : null;

      return {
        toolId,
        totalUses: data.total,
        completedUses: data.completed,
        completionRate: data.total > 0 ? data.completed / data.total : 0,
        avgAnxietyReduction: avgReduction,
        avgRating,
      };
    })
    .sort((a, b) => {
      // Сортируем по средней эффективности (снижение тревоги), затем по рейтингу
      if (a.avgAnxietyReduction !== null && b.avgAnxietyReduction !== null) {
        return b.avgAnxietyReduction - a.avgAnxietyReduction;
      }
      if (a.avgRating !== null && b.avgRating !== null) {
        return b.avgRating - a.avgRating;
      }
      return b.totalUses - a.totalUses;
    });
}

/**
 * Названия техник для отображения
 */
export const TOOL_NAMES = {
  'sos': 'SOS-помощь',
  'stop-pause': 'СТОП-пауза',
  'grounding': 'Заземление 5-4-3-2-1',
  'abc-diary': 'ABC-дневник',
  'decatastrophize': 'Декатастрофизация',
  'dichotomy': 'Дихотомия контроля',
  'double-standard': 'Двойной стандарт',
  'triple-column': 'Три колонки',
  'facts-vs-feelings': 'Факты vs Чувства',
  'should-statements': 'Работа с "должен"',
  'morning': 'Утренняя практика',
  'evening': 'Вечерняя рефлексия',
  'view-from-above': 'Взгляд сверху',
};
