import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  exportAllData,
  validateImportData,
  importData,
  getDataStats,
  clearAllData,
} from '../dataExport';

describe('dataExport', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('exportAllData', () => {
    it('should export empty data when localStorage is empty', () => {
      const data = exportAllData();

      expect(data.version).toBe('1.0');
      expect(data.exportDate).toBeDefined();
      expect(data.abcEntries).toEqual([]);
      expect(data.moodEntries).toEqual([]);
      expect(data.settings.theme).toBe('auto');
    });

    it('should export ABC entries', () => {
      const entries = [
        { id: 1, date: '2026-01-15', A: 'Test situation' },
        { id: 2, date: '2026-01-16', A: 'Another situation' },
      ];
      localStorage.setItem('abc-entries', JSON.stringify(entries));

      const data = exportAllData();

      expect(data.abcEntries).toEqual(entries);
    });

    it('should export mood entries', () => {
      const entries = [
        { date: '2026-01-15T10:00:00Z', mood: 4, anxiety: 3 },
        { date: '2026-01-16T10:00:00Z', mood: 3, anxiety: 5 },
      ];
      localStorage.setItem('mood-entries', JSON.stringify(entries));

      const data = exportAllData();

      expect(data.moodEntries).toEqual(entries);
    });

    it('should export theme setting', () => {
      localStorage.setItem('theme', 'dark');

      const data = exportAllData();

      expect(data.settings.theme).toBe('dark');
    });
  });

  describe('validateImportData', () => {
    it('should return valid for correct data', () => {
      const data = {
        version: '1.0',
        abcEntries: [],
        moodEntries: [],
      };

      const result = validateImportData(data);

      expect(result.valid).toBe(true);
    });

    it('should return invalid for null data', () => {
      const result = validateImportData(null);

      expect(result.valid).toBe(false);
      expect(result.error).toBe('Неверный формат данных');
    });

    it('should return invalid for missing version', () => {
      const result = validateImportData({ abcEntries: [] });

      expect(result.valid).toBe(false);
      expect(result.error).toBe('Отсутствует версия данных');
    });

    it('should return invalid for non-array abcEntries', () => {
      const result = validateImportData({
        version: '1.0',
        abcEntries: 'not an array',
      });

      expect(result.valid).toBe(false);
      expect(result.error).toBe('Неверный формат записей ABC-дневника');
    });

    it('should return invalid for non-array moodEntries', () => {
      const result = validateImportData({
        version: '1.0',
        moodEntries: {},
      });

      expect(result.valid).toBe(false);
      expect(result.error).toBe('Неверный формат записей настроения');
    });
  });

  describe('importData', () => {
    it('should import ABC entries (replace mode)', () => {
      const existingEntries = [{ id: 1, A: 'Old' }];
      localStorage.setItem('abc-entries', JSON.stringify(existingEntries));

      const importedData = {
        version: '1.0',
        abcEntries: [{ id: 2, A: 'New' }],
      };

      const result = importData(importedData, { merge: false });

      expect(result.success).toBe(true);
      expect(result.imported.abc).toBe(1);

      const stored = JSON.parse(localStorage.getItem('abc-entries'));
      expect(stored).toEqual([{ id: 2, A: 'New' }]);
    });

    it('should import ABC entries (merge mode)', () => {
      const existingEntries = [{ id: 1, date: '2026-01-15', A: 'Old' }];
      localStorage.setItem('abc-entries', JSON.stringify(existingEntries));

      const importedData = {
        version: '1.0',
        abcEntries: [
          { id: 1, date: '2026-01-15', A: 'Duplicate' },
          { id: 2, date: '2026-01-16', A: 'New' },
        ],
      };

      const result = importData(importedData, { merge: true });

      expect(result.success).toBe(true);
      expect(result.imported.abc).toBe(1); // Only new entry

      const stored = JSON.parse(localStorage.getItem('abc-entries'));
      expect(stored.length).toBe(2);
    });

    it('should import mood entries with 30 day limit', () => {
      const manyEntries = Array.from({ length: 40 }, (_, i) => ({
        date: new Date(2026, 0, i + 1).toISOString(),
        mood: 3,
      }));

      const result = importData({
        version: '1.0',
        moodEntries: manyEntries,
      });

      expect(result.success).toBe(true);
      expect(result.imported.mood).toBe(30);

      const stored = JSON.parse(localStorage.getItem('mood-entries'));
      expect(stored.length).toBe(30);
    });

    it('should import theme setting', () => {
      const result = importData({
        version: '1.0',
        settings: { theme: 'dark' },
      });

      expect(result.success).toBe(true);
      expect(localStorage.getItem('theme')).toBe('dark');
    });

    it('should return error for invalid data', () => {
      const result = importData({ invalid: true });

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  describe('getDataStats', () => {
    it('should return zeros for empty storage', () => {
      const stats = getDataStats();

      expect(stats.abcCount).toBe(0);
      expect(stats.moodCount).toBe(0);
      expect(stats.oldestEntry).toBeNull();
    });

    it('should count entries correctly', () => {
      localStorage.setItem(
        'abc-entries',
        JSON.stringify([{ id: 1 }, { id: 2 }, { id: 3 }])
      );
      localStorage.setItem(
        'mood-entries',
        JSON.stringify([{ date: '2026-01-15' }, { date: '2026-01-16' }])
      );

      const stats = getDataStats();

      expect(stats.abcCount).toBe(3);
      expect(stats.moodCount).toBe(2);
    });

    it('should find oldest entry date', () => {
      localStorage.setItem(
        'abc-entries',
        JSON.stringify([{ date: '2026-01-15' }])
      );
      localStorage.setItem(
        'mood-entries',
        JSON.stringify([{ date: '2026-01-10' }])
      );

      const stats = getDataStats();

      expect(stats.oldestEntry).toContain('10');
    });
  });

  describe('clearAllData', () => {
    it('should clear ABC and mood entries', () => {
      localStorage.setItem('abc-entries', JSON.stringify([{ id: 1 }]));
      localStorage.setItem('mood-entries', JSON.stringify([{ mood: 3 }]));

      const result = clearAllData();

      expect(result).toBe(true);
      expect(localStorage.getItem('abc-entries')).toBeNull();
      expect(localStorage.getItem('mood-entries')).toBeNull();
    });

    it('should preserve theme setting', () => {
      localStorage.setItem('theme', 'dark');
      localStorage.setItem('abc-entries', JSON.stringify([]));

      clearAllData();

      expect(localStorage.getItem('theme')).toBe('dark');
    });
  });
});
