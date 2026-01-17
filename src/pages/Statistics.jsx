import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui';
import { getToolStats, TOOL_NAMES } from '../utils/analytics';

const DISTORTION_LABELS = [
  'Чёрно-белое мышление',
  'Сверхобобщение',
  'Негативный фильтр',
  'Обесценивание позитивного',
  'Чтение мыслей',
  'Предсказание будущего',
  'Катастрофизация',
  'Эмоциональное обоснование',
  'Долженствования',
  'Навешивание ярлыков',
];

const DAY_NAMES = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

export default function Statistics() {
  const navigate = useNavigate();
  const [moodData, setMoodData] = useState([]);
  const [abcData, setAbcData] = useState([]);
  const [toolStats, setToolStats] = useState(null);

  useEffect(() => {
    const moodEntries = JSON.parse(localStorage.getItem('mood-entries') || '[]');
    const abcEntries = JSON.parse(localStorage.getItem('abc-entries') || '[]');
    setMoodData(moodEntries);
    setAbcData(abcEntries);
    setToolStats(getToolStats(30));
  }, []);

  // Статистика настроения за 30 дней
  const getMood30DaysData = () => {
    const result = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toDateString();
      const entry = moodData.find((e) => new Date(e.date).toDateString() === dateStr);
      result.push({
        date: date,
        dayNum: date.getDate(),
        mood: entry?.mood || null,
        anxiety: entry?.anxiety || null,
      });
    }
    return result;
  };

  // Средняя тревога
  const getAnxietyStats = () => {
    const withAnxiety = moodData.filter((e) => e.anxiety !== undefined);
    if (withAnxiety.length === 0) return null;

    const avg = withAnxiety.reduce((sum, e) => sum + e.anxiety, 0) / withAnxiety.length;
    const highAnxietyDays = withAnxiety.filter((e) => e.anxiety >= 7).length;

    return {
      average: avg.toFixed(1),
      highDays: highAnxietyDays,
      totalDays: withAnxiety.length,
    };
  };

  // Топ когнитивных искажений
  const getDistortionStats = () => {
    const counts = {};

    abcData.forEach((entry) => {
      (entry.distortions || []).forEach((d) => {
        // Извлекаем только название искажения (до тире)
        const label = d.split(' — ')[0];
        counts[label] = (counts[label] || 0) + 1;
      });
    });

    return DISTORTION_LABELS.map((label) => ({
      label,
      count: counts[label] || 0,
    })).sort((a, b) => b.count - a.count);
  };

  // Тренд настроения
  const getMoodTrend = () => {
    const last7 = moodData.slice(0, 7).filter((e) => e.mood !== undefined);
    const prev7 = moodData.slice(7, 14).filter((e) => e.mood !== undefined);

    if (last7.length < 2 || prev7.length < 2) return null;

    const avgLast = last7.reduce((sum, e) => sum + e.mood, 0) / last7.length;
    const avgPrev = prev7.reduce((sum, e) => sum + e.mood, 0) / prev7.length;

    const diff = avgLast - avgPrev;
    if (diff > 0.3) return 'up';
    if (diff < -0.3) return 'down';
    return 'stable';
  };

  // Streak
  const getStreak = () => {
    let streak = 0;
    const today = new Date().toDateString();

    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toDateString();

      const hasMood = moodData.some((e) => new Date(e.date).toDateString() === dateStr);
      const hasAbc = abcData.some((e) => new Date(e.date).toDateString() === dateStr);

      if (hasMood || hasAbc) {
        streak++;
      } else if (i > 0) {
        break;
      }
    }
    return streak;
  };

  const mood30Data = getMood30DaysData();
  const anxietyStats = getAnxietyStats();
  const distortionStats = getDistortionStats();
  const trend = getMoodTrend();
  const streak = getStreak();

  const hasData = moodData.length > 0 || abcData.length > 0;
  const hasDistortionData = distortionStats.some((d) => d.count > 0);
  const maxDistortionCount = Math.max(...distortionStats.map((d) => d.count), 1);

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
        <h1 className="title-2 m-0">Статистика</h1>
      </header>

      <main className="px-4 pb-8 space-y-6">
        {!hasData ? (
          <div className="text-center py-12">
            <p className="text-5xl mb-4">📊</p>
            <p className="secondary-text">
              Здесь появится статистика, когда ты начнёшь вести записи.
            </p>
          </div>
        ) : (
          <>
            {/* Общая статистика */}
            <div className="grid grid-cols-3 gap-3">
              <Card className="p-4 text-center">
                <p className="title-1" style={{ color: 'var(--apple-blue)' }}>
                  {moodData.length}
                </p>
                <p className="caption secondary-text">Записей настроения</p>
              </Card>
              <Card className="p-4 text-center">
                <p className="title-1" style={{ color: 'var(--apple-purple)' }}>
                  {abcData.length}
                </p>
                <p className="caption secondary-text">ABC-записей</p>
              </Card>
              <Card className="p-4 text-center">
                <p className="title-1" style={{ color: 'var(--apple-green)' }}>
                  {streak}
                </p>
                <p className="caption secondary-text">Дней подряд</p>
              </Card>
            </div>

            {/* График настроения 30 дней */}
            {moodData.length > 0 && (
              <Card className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="headline">Настроение за месяц</span>
                  {trend && (
                    <span
                      className="subhead"
                      style={{
                        color:
                          trend === 'up'
                            ? 'var(--apple-green)'
                            : trend === 'down'
                            ? 'var(--apple-red)'
                            : 'var(--label-secondary)',
                      }}
                    >
                      {trend === 'up'
                        ? '↑ Улучшение'
                        : trend === 'down'
                        ? '↓ Снижение'
                        : '→ Стабильно'}
                    </span>
                  )}
                </div>

                {/* Mini bar chart */}
                <div className="flex items-end gap-[2px] h-24">
                  {mood30Data.map((day, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t-sm transition-all"
                      style={{
                        height: day.mood ? `${(day.mood / 5) * 100}%` : '4px',
                        background: day.mood
                          ? `var(--apple-${
                              day.mood >= 4 ? 'green' : day.mood >= 3 ? 'blue' : 'orange'
                            })`
                          : 'var(--separator)',
                        opacity: day.mood ? 0.7 : 0.3,
                      }}
                      title={`${day.dayNum}: ${day.mood || '-'}/5`}
                    />
                  ))}
                </div>

                <div className="flex justify-between mt-2">
                  <span className="caption secondary-text">30 дней назад</span>
                  <span className="caption secondary-text">Сегодня</span>
                </div>
              </Card>
            )}

            {/* Тревога */}
            {anxietyStats && (
              <Card className="p-4">
                <p className="headline mb-4">Уровень тревоги</p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p
                      className="title-1"
                      style={{
                        color:
                          anxietyStats.average <= 3
                            ? 'var(--apple-green)'
                            : anxietyStats.average <= 6
                            ? 'var(--apple-orange)'
                            : 'var(--apple-red)',
                      }}
                    >
                      {anxietyStats.average}
                    </p>
                    <p className="caption secondary-text">Средний уровень</p>
                  </div>
                  <div className="text-center">
                    <p
                      className="title-1"
                      style={{
                        color:
                          anxietyStats.highDays === 0 ? 'var(--apple-green)' : 'var(--apple-red)',
                      }}
                    >
                      {anxietyStats.highDays}
                    </p>
                    <p className="caption secondary-text">
                      Дней высокой тревоги (≥7)
                    </p>
                  </div>
                </div>

                {/* Anxiety trend bar */}
                <div className="mt-4 h-2 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${(anxietyStats.average / 10) * 100}%`,
                      background: `linear-gradient(to right, var(--apple-green), var(--apple-orange), var(--apple-red))`,
                    }}
                  />
                </div>
              </Card>
            )}

            {/* ABC-дневник инсайты */}
            {abcData.length > 0 && (
              <Card className="p-4">
                <p className="headline mb-2">ABC-дневник</p>
                <p className="secondary-text text-sm mb-4">
                  {abcData.length} записей за всё время
                </p>

                {/* Последние записи */}
                <p className="subhead mb-2">Последние темы:</p>
                <div className="space-y-2">
                  {abcData.slice(0, 3).map((entry, i) => (
                    <div
                      key={entry.id || i}
                      className="p-3 rounded-xl"
                      style={{ background: 'var(--card-secondary)' }}
                    >
                      <p className="caption secondary-text">
                        {new Date(entry.date).toLocaleDateString('ru-RU', {
                          day: 'numeric',
                          month: 'short',
                        })}
                      </p>
                      <p className="body-text text-sm line-clamp-2">
                        {entry.A || entry.situation || '—'}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Когнитивные искажения */}
            <Card className="p-4">
              <p className="headline mb-2">Когнитивные искажения</p>
              {!hasDistortionData ? (
                <p className="secondary-text text-sm">
                  Заполни ABC-дневник и отметь искажения, чтобы увидеть паттерны мышления.
                </p>
              ) : (
                <>
                  <p className="secondary-text text-sm mb-4">
                    Частые паттерны мышления (топ-5)
                  </p>
                  <div className="space-y-3">
                    {distortionStats.slice(0, 5).filter((d) => d.count > 0).map((d) => (
                      <div key={d.label}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">{d.label}</span>
                          <span
                            className="text-sm font-medium"
                            style={{ color: 'var(--apple-orange)' }}
                          >
                            {d.count}
                          </span>
                        </div>
                        <div
                          className="h-2 rounded-full overflow-hidden"
                          style={{ background: 'var(--card-secondary)' }}
                        >
                          <div
                            className="h-full rounded-full transition-all"
                            style={{
                              width: `${(d.count / maxDistortionCount) * 100}%`,
                              background: 'var(--apple-orange)',
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </Card>

            {/* Использование техник */}
            {toolStats && toolStats.totalUsage > 0 && (
              <Card className="p-4">
                <p className="headline mb-2">Использование техник</p>
                <p className="secondary-text text-sm mb-4">
                  {toolStats.totalUsage} практик за 30 дней ({toolStats.completedUsage} завершённых)
                </p>
                <div className="space-y-3">
                  {Object.entries(toolStats.usageByTool)
                    .sort((a, b) => b[1].total - a[1].total)
                    .slice(0, 5)
                    .map(([toolId, data]) => {
                      const maxUsage = Math.max(...Object.values(toolStats.usageByTool).map(d => d.total), 1);
                      return (
                        <div key={toolId}>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">{TOOL_NAMES[toolId] || toolId}</span>
                            <span
                              className="text-sm font-medium"
                              style={{ color: 'var(--apple-blue)' }}
                            >
                              {data.total}
                            </span>
                          </div>
                          <div
                            className="h-2 rounded-full overflow-hidden"
                            style={{ background: 'var(--card-secondary)' }}
                          >
                            <div
                              className="h-full rounded-full transition-all"
                              style={{
                                width: `${(data.total / maxUsage) * 100}%`,
                                background: 'var(--apple-blue)',
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                </div>
              </Card>
            )}

            {/* Активность по дням недели */}
            {toolStats && toolStats.totalUsage > 0 && (
              <Card className="p-4">
                <p className="headline mb-4">Активность по дням</p>
                <div className="flex items-end justify-between gap-2 h-24">
                  {toolStats.usageByDayOfWeek.map((count, dayIndex) => {
                    const maxCount = Math.max(...toolStats.usageByDayOfWeek, 1);
                    const height = count > 0 ? Math.max((count / maxCount) * 100, 8) : 4;
                    return (
                      <div key={dayIndex} className="flex-1 flex flex-col items-center gap-1">
                        <div
                          className="w-full rounded-t-sm transition-all"
                          style={{
                            height: `${height}%`,
                            background: count > 0 ? 'var(--apple-green)' : 'var(--separator)',
                            opacity: count > 0 ? 0.7 : 0.3,
                          }}
                        />
                        <span className="text-xs" style={{ color: 'var(--label-secondary)' }}>
                          {DAY_NAMES[dayIndex]}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </Card>
            )}
          </>
        )}
      </main>
    </div>
  );
}
