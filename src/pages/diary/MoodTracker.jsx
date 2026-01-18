import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from '../../components/ui';
import { MoodEmoji, ChevronLeft } from '../../components/icons';

const MOODS = [
  { value: 1, label: 'Очень плохо' },
  { value: 2, label: 'Плохо' },
  { value: 3, label: 'Нормально' },
  { value: 4, label: 'Хорошо' },
  { value: 5, label: 'Отлично' },
];

export default function MoodTracker() {
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState(3);
  const [anxietyLevel, setAnxietyLevel] = useState(5);
  const [note, setNote] = useState('');
  const [weekData, setWeekData] = useState([]);
  const [todayLogged, setTodayLogged] = useState(false);

  useEffect(() => {
    const entries = JSON.parse(localStorage.getItem('mood-entries') || '[]');
    const today = new Date().toDateString();
    const todayEntry = entries.find((e) => new Date(e.date).toDateString() === today);

    if (todayEntry) {
      setTodayLogged(true);
      setSelectedMood(todayEntry.mood);
      setAnxietyLevel(todayEntry.anxiety);
    }

    // Get last 7 days
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toDateString();
      const entry = entries.find((e) => new Date(e.date).toDateString() === dateStr);
      last7Days.push({
        date: date,
        dayName: date.toLocaleDateString('ru-RU', { weekday: 'short' }),
        mood: entry?.mood || null,
        anxiety: entry?.anxiety || null,
      });
    }
    setWeekData(last7Days);
  }, []);

  const handleSave = () => {
    if (navigator.vibrate) {
      navigator.vibrate([30, 20, 30]);
    }

    const entries = JSON.parse(localStorage.getItem('mood-entries') || '[]');
    const today = new Date().toDateString();

    // Remove today's entry if exists
    const filtered = entries.filter((e) => new Date(e.date).toDateString() !== today);

    // Add new entry
    filtered.unshift({
      date: new Date().toISOString(),
      mood: selectedMood,
      anxiety: anxietyLevel,
      note: note.trim() || null,
    });

    // Keep last 30 days
    localStorage.setItem('mood-entries', JSON.stringify(filtered.slice(0, 30)));

    navigate('/diary');
  };

  const getTrend = () => {
    const validMoods = weekData.filter((d) => d.mood !== null);
    if (validMoods.length < 2) return null;

    const firstHalf = validMoods.slice(0, Math.floor(validMoods.length / 2));
    const secondHalf = validMoods.slice(Math.floor(validMoods.length / 2));

    const avgFirst = firstHalf.reduce((sum, d) => sum + d.mood, 0) / firstHalf.length;
    const avgSecond = secondHalf.reduce((sum, d) => sum + d.mood, 0) / secondHalf.length;

    if (avgSecond > avgFirst + 0.3) return 'up';
    if (avgSecond < avgFirst - 0.3) return 'down';
    return 'stable';
  };

  const trend = getTrend();

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-40 px-4 py-4 safe-area-top flex items-center justify-between"
           style={{ background: 'var(--background)' }}>
        <button
          className="p-2 rounded-full flex items-center justify-center"
          style={{ background: 'var(--card-secondary)' }}
          onClick={() => navigate(-1)}
        >
          <ChevronLeft size={20} />
        </button>
        <span className="headline">Трекер настроения</span>
        <div className="w-10" />
      </div>

      <div className="px-4 pt-20 space-y-6">
        {/* Week chart */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <span className="headline">Последние 7 дней</span>
            {trend && (
              <span className="subhead" style={{
                color: trend === 'up' ? 'var(--apple-green)' :
                       trend === 'down' ? 'var(--apple-red)' : 'var(--label-secondary)'
              }}>
                {trend === 'up' ? '↑ Улучшение' :
                 trend === 'down' ? '↓ Снижение' : '→ Стабильно'}
              </span>
            )}
          </div>

          <div className="flex justify-between items-end h-32 gap-2">
            {weekData.map((day, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                {/* Bar */}
                <div
                  className="w-full rounded-t-md transition-all"
                  style={{
                    height: day.mood ? `${(day.mood / 5) * 100}%` : '10%',
                    background: day.mood
                      ? `var(--apple-${day.mood >= 4 ? 'green' : day.mood >= 3 ? 'blue' : 'orange'})`
                      : 'var(--separator)',
                    opacity: day.mood ? 0.8 : 0.3,
                  }}
                />
                {/* Day label */}
                <span className="caption secondary-text">{day.dayName}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Mood selector */}
        <Card className="p-4">
          <p className="headline mb-4">Как ты себя чувствуешь?</p>
          <div className="flex justify-between">
            {MOODS.map((mood) => (
              <button
                key={mood.value}
                className="flex flex-col items-center gap-1 p-2 rounded-xl transition-all"
                style={{
                  background: selectedMood === mood.value ? 'var(--apple-blue)' : 'transparent',
                  transform: selectedMood === mood.value ? 'scale(1.1)' : 'scale(1)',
                }}
                onClick={() => {
                  if (navigator.vibrate) navigator.vibrate(20);
                  setSelectedMood(mood.value);
                }}
              >
                <MoodEmoji mood={mood.value} size="lg" />
                <span
                  className="caption"
                  style={{ color: selectedMood === mood.value ? 'white' : 'var(--label-secondary)' }}
                >
                  {mood.value}
                </span>
              </button>
            ))}
          </div>
        </Card>

        {/* Anxiety slider */}
        <Card className="p-4">
          <div className="flex justify-between items-center mb-4">
            <p className="headline">Уровень тревоги</p>
            <span
              className="title-2"
              style={{
                color: anxietyLevel <= 3 ? 'var(--apple-green)' :
                       anxietyLevel <= 6 ? 'var(--apple-orange)' : 'var(--apple-red)'
              }}
            >
              {anxietyLevel}/10
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            value={anxietyLevel}
            onChange={(e) => setAnxietyLevel(Number(e.target.value))}
            className="w-full h-2 rounded-full appearance-none"
            style={{
              background: `linear-gradient(to right, var(--apple-green) 0%, var(--apple-orange) 50%, var(--apple-red) 100%)`,
            }}
          />
          <div className="flex justify-between mt-2">
            <span className="caption secondary-text">Спокойно</span>
            <span className="caption secondary-text">Сильная тревога</span>
          </div>
        </Card>

        {/* Note */}
        <Card className="p-4">
          <p className="headline mb-3">Заметка (опционально)</p>
          <textarea
            className="form-input min-h-[80px] resize-none"
            placeholder="Что повлияло на твоё настроение сегодня?"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </Card>
      </div>

      {/* Save button */}
      <div className="fixed bottom-24 left-0 right-0 px-6">
        <Button
          variant="filled"
          className="w-full py-4"
          onClick={handleSave}
        >
          {todayLogged ? 'Обновить запись' : 'Сохранить'}
        </Button>
      </div>
    </div>
  );
}
