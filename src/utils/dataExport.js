/**
 * Утилиты экспорта/импорта данных приложения
 */

const DATA_VERSION = '1.0';
const STORAGE_KEYS = {
  ABC_ENTRIES: 'abc-entries',
  MOOD_ENTRIES: 'mood-entries',
  THEME: 'theme',
};

/**
 * Экспортирует все данные приложения
 * @returns {Object} Объект с данными для экспорта
 */
export function exportAllData() {
  return {
    version: DATA_VERSION,
    exportDate: new Date().toISOString(),
    abcEntries: JSON.parse(localStorage.getItem(STORAGE_KEYS.ABC_ENTRIES) || '[]'),
    moodEntries: JSON.parse(localStorage.getItem(STORAGE_KEYS.MOOD_ENTRIES) || '[]'),
    settings: {
      theme: localStorage.getItem(STORAGE_KEYS.THEME) || 'auto',
    },
  };
}

/**
 * Валидирует структуру импортируемых данных
 * @param {Object} data - Данные для валидации
 * @returns {{ valid: boolean, error?: string }}
 */
export function validateImportData(data) {
  if (!data || typeof data !== 'object') {
    return { valid: false, error: 'Неверный формат данных' };
  }

  if (!data.version) {
    return { valid: false, error: 'Отсутствует версия данных' };
  }

  if (!Array.isArray(data.abcEntries) && data.abcEntries !== undefined) {
    return { valid: false, error: 'Неверный формат записей ABC-дневника' };
  }

  if (!Array.isArray(data.moodEntries) && data.moodEntries !== undefined) {
    return { valid: false, error: 'Неверный формат записей настроения' };
  }

  return { valid: true };
}

/**
 * Импортирует данные в localStorage
 * @param {Object} data - Данные для импорта
 * @param {Object} options - Опции импорта
 * @param {boolean} options.merge - Объединить с существующими данными (по умолчанию false - замена)
 * @returns {{ success: boolean, imported: { abc: number, mood: number }, error?: string }}
 */
export function importData(data, options = { merge: false }) {
  const validation = validateImportData(data);
  if (!validation.valid) {
    return { success: false, imported: { abc: 0, mood: 0 }, error: validation.error };
  }

  try {
    let abcCount = 0;
    let moodCount = 0;

    // Импорт ABC-записей
    if (data.abcEntries && data.abcEntries.length > 0) {
      if (options.merge) {
        const existing = JSON.parse(localStorage.getItem(STORAGE_KEYS.ABC_ENTRIES) || '[]');
        const existingIds = new Set(existing.map(e => e.id));
        const newEntries = data.abcEntries.filter(e => !existingIds.has(e.id));
        const merged = [...newEntries, ...existing].sort((a, b) =>
          new Date(b.date || b.timestamp) - new Date(a.date || a.timestamp)
        );
        localStorage.setItem(STORAGE_KEYS.ABC_ENTRIES, JSON.stringify(merged));
        abcCount = newEntries.length;
      } else {
        localStorage.setItem(STORAGE_KEYS.ABC_ENTRIES, JSON.stringify(data.abcEntries));
        abcCount = data.abcEntries.length;
      }
    }

    // Импорт записей настроения
    if (data.moodEntries && data.moodEntries.length > 0) {
      if (options.merge) {
        const existing = JSON.parse(localStorage.getItem(STORAGE_KEYS.MOOD_ENTRIES) || '[]');
        const existingDates = new Set(existing.map(e => new Date(e.date).toDateString()));
        const newEntries = data.moodEntries.filter(e => !existingDates.has(new Date(e.date).toDateString()));
        const merged = [...newEntries, ...existing]
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 30); // Храним максимум 30 записей
        localStorage.setItem(STORAGE_KEYS.MOOD_ENTRIES, JSON.stringify(merged));
        moodCount = newEntries.length;
      } else {
        localStorage.setItem(STORAGE_KEYS.MOOD_ENTRIES, JSON.stringify(data.moodEntries.slice(0, 30)));
        moodCount = Math.min(data.moodEntries.length, 30);
      }
    }

    // Импорт настроек темы
    if (data.settings?.theme) {
      localStorage.setItem(STORAGE_KEYS.THEME, data.settings.theme);
    }

    return { success: true, imported: { abc: abcCount, mood: moodCount } };
  } catch (error) {
    return { success: false, imported: { abc: 0, mood: 0 }, error: error.message };
  }
}

/**
 * Скачивает данные как JSON-файл
 * @param {Object} data - Данные для скачивания
 * @param {string} filename - Имя файла (без расширения)
 */
export function downloadAsFile(data, filename = 'health-anxiety-backup') {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Читает JSON-файл
 * @param {File} file - Файл для чтения
 * @returns {Promise<Object>} Распарсенные данные
 */
export function readJsonFile(file) {
  return new Promise((resolve, reject) => {
    if (!file.name.endsWith('.json')) {
      reject(new Error('Поддерживаются только JSON-файлы'));
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        resolve(data);
      } catch {
        reject(new Error('Ошибка чтения JSON-файла'));
      }
    };
    reader.onerror = () => reject(new Error('Ошибка чтения файла'));
    reader.readAsText(file);
  });
}

/**
 * Очищает все данные приложения
 * @returns {boolean}
 */
export function clearAllData() {
  try {
    localStorage.removeItem(STORAGE_KEYS.ABC_ENTRIES);
    localStorage.removeItem(STORAGE_KEYS.MOOD_ENTRIES);
    return true;
  } catch {
    return false;
  }
}

/**
 * Получает статистику по данным
 * @returns {{ abcCount: number, moodCount: number, oldestEntry: string | null }}
 */
export function getDataStats() {
  const abcEntries = JSON.parse(localStorage.getItem(STORAGE_KEYS.ABC_ENTRIES) || '[]');
  const moodEntries = JSON.parse(localStorage.getItem(STORAGE_KEYS.MOOD_ENTRIES) || '[]');

  const allDates = [
    ...abcEntries.map(e => e.date || e.timestamp),
    ...moodEntries.map(e => e.date),
  ].filter(Boolean);

  const oldestEntry = allDates.length > 0
    ? new Date(Math.min(...allDates.map(d => new Date(d)))).toLocaleDateString('ru-RU')
    : null;

  return {
    abcCount: abcEntries.length,
    moodCount: moodEntries.length,
    oldestEntry,
  };
}
