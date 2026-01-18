/**
 * Система персональных рекомендаций техник
 * Анализирует данные пользователя и предлагает наиболее подходящую технику
 */

import { getToolUsage, getToolStats, TOOL_NAMES } from './analytics';

// Конфигурация техник для рекомендаций
// icon теперь содержит ID для ToolIcon компонента
const TOOL_CONFIG = {
  'sos': { icon: 'sos', path: '/sos', priority: 10 },
  'breathing': { icon: 'breathing', path: '/tools/breathing', priority: 9 },
  'stop-pause': { icon: 'stop-pause', path: '/tools/stop-pause', priority: 8 },
  'grounding': { icon: 'grounding', path: '/tools/grounding', priority: 7 },
  'abc-diary': { icon: 'abc-diary', path: '/tools/abc-diary', priority: 6 },
  'decatastrophize': { icon: 'decatastrophize', path: '/tools/decatastrophize', priority: 6 },
  'dichotomy': { icon: 'dichotomy', path: '/stoic/dichotomy', priority: 5 },
  'double-standard': { icon: 'double-standard', path: '/tools/double-standard', priority: 5 },
  'triple-column': { icon: 'triple-column', path: '/tools/triple-column', priority: 5 },
  'facts-vs-feelings': { icon: 'facts-vs-feelings', path: '/tools/facts-vs-feelings', priority: 5 },
  'should-statements': { icon: 'should-statements', path: '/tools/should-statements', priority: 5 },
  'morning': { icon: 'morning', path: '/stoic/morning', priority: 4 },
  'evening': { icon: 'evening', path: '/stoic/evening', priority: 4 },
  'view-from-above': { icon: 'view-from-above', path: '/stoic/view-from-above', priority: 4 },
  'impostor-syndrome': { icon: 'impostor-syndrome', path: '/tools/impostor-syndrome', priority: 5 },
  'decision': { icon: 'decision', path: '/stoic/decision', priority: 5 },
};

// Названия когнитивных искажений для анализа
const CATASTROPHIZING_DISTORTIONS = [
  'Катастрофизация',
  'Предсказание будущего',
];

/**
 * Анализирует ABC-записи на предмет когнитивных искажений
 * @returns {Object} Статистика по искажениям
 */
function analyzeDistortions() {
  try {
    const entries = JSON.parse(localStorage.getItem('abc-entries') || '[]');
    const recentEntries = entries.slice(0, 10); // Последние 10 записей

    const distortionCounts = {};
    recentEntries.forEach(entry => {
      (entry.distortions || []).forEach(d => {
        distortionCounts[d] = (distortionCounts[d] || 0) + 1;
      });
    });

    return {
      total: recentEntries.length,
      counts: distortionCounts,
      hasCatastrophizing: CATASTROPHIZING_DISTORTIONS.some(d => distortionCounts[d] > 1),
    };
  } catch {
    return { total: 0, counts: {}, hasCatastrophizing: false };
  }
}

/**
 * Проверяет, использовалась ли техника сегодня
 * @param {string} toolId - ID техники
 * @returns {boolean}
 */
function wasUsedToday(toolId) {
  const usage = getToolUsage();
  const today = new Date().toDateString();

  return usage.some(entry =>
    entry.toolId === toolId && new Date(entry.date).toDateString() === today
  );
}

/**
 * Получает последние данные о тревоге
 * @returns {Object|null}
 */
function getRecentAnxietyData() {
  const usage = getToolUsage();
  const withAnxiety = usage.filter(e => e.anxietyAfter !== undefined);

  if (withAnxiety.length === 0) return null;

  // Последние 5 записей с данными о тревоге
  const recent = withAnxiety.slice(0, 5);
  const avgAnxietyAfter = recent.reduce((sum, e) => sum + e.anxietyAfter, 0) / recent.length;

  return {
    avgAnxietyAfter,
    lastAnxietyAfter: recent[0]?.anxietyAfter,
    hasHighAnxiety: avgAnxietyAfter > 6,
  };
}

/**
 * Получает персональную рекомендацию техники
 * @returns {Object} { toolId, title, reason, icon, path }
 */
export function getRecommendation() {
  const hour = new Date().getHours();
  const stats = getToolStats(14); // Последние 2 недели
  const anxietyData = getRecentAnxietyData();
  const distortions = analyzeDistortions();

  // 1. Высокая тревога → SOS или дыхание
  if (anxietyData?.hasHighAnxiety) {
    const toolId = wasUsedToday('sos') ? 'breathing' : 'sos';
    return {
      toolId,
      title: TOOL_NAMES[toolId],
      reason: 'Поможет быстро снизить тревогу',
      icon: TOOL_CONFIG[toolId].icon,
      path: TOOL_CONFIG[toolId].path,
    };
  }

  // 2. Много катастрофизации → декатастрофизация
  if (distortions.hasCatastrophizing) {
    return {
      toolId: 'decatastrophize',
      title: TOOL_NAMES['decatastrophize'],
      reason: 'Поможет работать с катастрофическими мыслями',
      icon: TOOL_CONFIG['decatastrophize'].icon,
      path: TOOL_CONFIG['decatastrophize'].path,
    };
  }

  // 3. Утро (6-11) и нет утренней практики → утренняя практика
  if (hour >= 6 && hour < 11 && !wasUsedToday('morning')) {
    return {
      toolId: 'morning',
      title: TOOL_NAMES['morning'],
      reason: 'Начни день с ясного намерения',
      icon: TOOL_CONFIG['morning'].icon,
      path: TOOL_CONFIG['morning'].path,
    };
  }

  // 4. Вечер (18-22) и нет вечерней практики → вечерняя рефлексия
  if (hour >= 18 && hour < 22 && !wasUsedToday('evening')) {
    return {
      toolId: 'evening',
      title: TOOL_NAMES['evening'],
      reason: 'Заверши день осознанной рефлексией',
      icon: TOOL_CONFIG['evening'].icon,
      path: TOOL_CONFIG['evening'].path,
    };
  }

  // 5. Fallback: техника с высоким рейтингом, которую давно не использовали
  const usedTools = Object.keys(stats.usageByTool);

  // Находим техники, которые не использовались или использовались мало
  const underusedTools = Object.keys(TOOL_CONFIG)
    .filter(toolId => {
      const usage = stats.usageByTool[toolId];
      return !usage || usage.total < 2;
    })
    .filter(toolId => !['sos', 'breathing', 'morning', 'evening'].includes(toolId));

  if (underusedTools.length > 0) {
    // Выбираем случайную недоиспользованную технику
    const randomIndex = Math.floor(Math.random() * Math.min(3, underusedTools.length));
    const toolId = underusedTools[randomIndex];

    return {
      toolId,
      title: TOOL_NAMES[toolId],
      reason: 'Попробуй новую технику',
      icon: TOOL_CONFIG[toolId].icon,
      path: TOOL_CONFIG[toolId].path,
    };
  }

  // 6. Самая эффективная техника из использованных
  if (usedTools.length > 0) {
    const topTool = usedTools
      .map(toolId => ({
        toolId,
        ...stats.usageByTool[toolId],
        avgRating: stats.usageByTool[toolId].ratings.length > 0
          ? stats.usageByTool[toolId].ratings.reduce((a, b) => a + b, 0) / stats.usageByTool[toolId].ratings.length
          : 0,
      }))
      .sort((a, b) => b.avgRating - a.avgRating)[0];

    if (topTool && TOOL_CONFIG[topTool.toolId]) {
      return {
        toolId: topTool.toolId,
        title: TOOL_NAMES[topTool.toolId],
        reason: 'Твоя любимая практика',
        icon: TOOL_CONFIG[topTool.toolId].icon,
        path: TOOL_CONFIG[topTool.toolId].path,
      };
    }
  }

  // 7. Дефолт: ABC-дневник
  return {
    toolId: 'abc-diary',
    title: TOOL_NAMES['abc-diary'],
    reason: 'Разбери текущую ситуацию',
    icon: TOOL_CONFIG['abc-diary'].icon,
    path: TOOL_CONFIG['abc-diary'].path,
  };
}
