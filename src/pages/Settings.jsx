import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from '../components/ui';
import { useTheme } from '../context/ThemeContext';
import {
  exportAllData,
  downloadAsFile,
  readJsonFile,
  importData,
  getDataStats,
  clearAllData,
} from '../utils/dataExport';

export default function Settings() {
  const navigate = useNavigate();
  const { isDark, toggleTheme, theme, setTheme } = useTheme();
  const fileInputRef = useRef(null);

  const [stats] = useState(() => getDataStats());
  const [importStatus, setImportStatus] = useState(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleExport = () => {
    navigator.vibrate?.(20);
    const data = exportAllData();
    downloadAsFile(data);
    setImportStatus({ type: 'success', message: 'Данные экспортированы' });
    setTimeout(() => setImportStatus(null), 3000);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const data = await readJsonFile(file);
      const result = importData(data, { merge: true });

      if (result.success) {
        navigator.vibrate?.([30, 20, 30]);
        setImportStatus({
          type: 'success',
          message: `Импортировано: ${result.imported.abc} записей ABC, ${result.imported.mood} записей настроения`,
        });
        // Перезагрузить страницу для обновления данных
        setTimeout(() => window.location.reload(), 1500);
      } else {
        setImportStatus({ type: 'error', message: result.error });
      }
    } catch (error) {
      setImportStatus({ type: 'error', message: error.message });
    }

    // Сброс input для повторного выбора того же файла
    e.target.value = '';
  };

  const handleClearData = () => {
    if (clearAllData()) {
      navigator.vibrate?.([50, 30, 50]);
      setShowClearConfirm(false);
      setImportStatus({ type: 'success', message: 'Все данные удалены' });
      setTimeout(() => window.location.reload(), 1500);
    }
  };

  const themeOptions = [
    { value: 'auto', label: 'Авто', icon: '🔄' },
    { value: 'light', label: 'Светлая', icon: '☀️' },
    { value: 'dark', label: 'Тёмная', icon: '🌙' },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header
        className="sticky top-0 z-40 px-4 py-3 safe-area-top flex items-center gap-3"
        style={{ background: 'var(--background)' }}
      >
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 flex items-center justify-center rounded-full"
          style={{ background: 'var(--card-secondary)' }}
        >
          ←
        </button>
        <h1 className="title-2 m-0">Настройки</h1>
      </header>

      <main className="px-4 pb-8 space-y-6">
        {/* Статус импорта */}
        {importStatus && (
          <div
            className="p-4 rounded-xl text-center"
            style={{
              background: importStatus.type === 'success'
                ? 'rgba(52, 199, 89, 0.15)'
                : 'rgba(255, 59, 48, 0.15)',
              color: importStatus.type === 'success'
                ? 'var(--apple-green)'
                : 'var(--apple-red)',
            }}
          >
            {importStatus.message}
          </div>
        )}

        {/* Тема */}
        <Card className="p-4">
          <p className="headline mb-4">Тема оформления</p>
          <div className="flex gap-2">
            {themeOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setTheme(option.value)}
                className="flex-1 py-3 px-2 rounded-xl transition-all flex flex-col items-center gap-1"
                style={{
                  background: theme === option.value
                    ? 'var(--apple-blue)'
                    : 'var(--card-secondary)',
                  color: theme === option.value ? 'white' : 'var(--label)',
                }}
              >
                <span className="text-xl">{option.icon}</span>
                <span className="text-sm">{option.label}</span>
              </button>
            ))}
          </div>
        </Card>

        {/* Данные */}
        <Card className="p-4">
          <p className="headline mb-2">Мои данные</p>
          <p className="secondary-text text-sm mb-4">
            {stats.abcCount > 0 || stats.moodCount > 0 ? (
              <>
                {stats.abcCount} записей ABC-дневника, {stats.moodCount} записей настроения
                {stats.oldestEntry && <span className="block mt-1">Первая запись: {stats.oldestEntry}</span>}
              </>
            ) : (
              'Нет сохранённых данных'
            )}
          </p>

          <div className="space-y-3">
            <Button variant="tinted" className="w-full" onClick={handleExport}>
              Экспортировать данные
            </Button>

            <Button variant="secondary" className="w-full" onClick={handleImportClick}>
              Импортировать данные
            </Button>

            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        </Card>

        {/* Опасная зона */}
        {(stats.abcCount > 0 || stats.moodCount > 0) && (
          <Card className="p-4">
            <p className="headline mb-2" style={{ color: 'var(--apple-red)' }}>
              Удаление данных
            </p>
            <p className="secondary-text text-sm mb-4">
              Это действие нельзя отменить. Рекомендуем сначала экспортировать данные.
            </p>

            {showClearConfirm ? (
              <div className="flex gap-3">
                <Button
                  variant="secondary"
                  className="flex-1"
                  onClick={() => setShowClearConfirm(false)}
                >
                  Отмена
                </Button>
                <Button
                  className="flex-1"
                  style={{ background: 'var(--apple-red)' }}
                  onClick={handleClearData}
                >
                  Удалить
                </Button>
              </div>
            ) : (
              <Button
                variant="secondary"
                className="w-full"
                style={{ color: 'var(--apple-red)' }}
                onClick={() => setShowClearConfirm(true)}
              >
                Удалить все данные
              </Button>
            )}
          </Card>
        )}

        {/* Версия */}
        <div className="text-center pt-4">
          <p className="secondary-text text-sm">
            Версия 4.0 (Executive Edition)
          </p>
          <p className="secondary-text text-xs mt-1">
            КПТ + Стоицизм для руководителей
          </p>
        </div>
      </main>
    </div>
  );
}
