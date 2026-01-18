import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from '../components/ui';
import { Header } from '../components/layout';
import { ToolIcon, BarChart3, BookOpen } from '../components/icons';

export default function Diary() {
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    // Пробуем новый ключ, потом старый для обратной совместимости
    const saved = localStorage.getItem('abc-entries') || localStorage.getItem('abcEntries');
    if (saved) {
      setEntries(JSON.parse(saved));
    }
  }, []);

  if (entries.length === 0) {
    return (
      <div className="min-h-screen pb-tab-bar">
        <Header title="Мой дневник" />

        <main className="px-4 space-y-4">
          {/* Quick actions */}
          <div className="flex gap-3">
            <Button
              variant="secondary"
              className="flex-1 flex items-center justify-center gap-2"
              onClick={() => navigate('/diary/mood')}
            >
              <ToolIcon tool="mood" size={20} /> Настроение
            </Button>
            <Button
              variant="secondary"
              onClick={() => navigate('/diary/statistics')}
            >
              <BarChart3 size={20} />
            </Button>
          </div>

          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'var(--card-secondary)' }}>
              <BookOpen size={32} className="text-[var(--apple-blue)]" />
            </div>
            <p className="secondary-text mb-6">
              Записей ABC-дневника пока нет. Начни вести дневник мыслей.
            </p>
            <Button onClick={() => navigate('/tools/abc')}>
              Создать запись
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-tab-bar">
      <Header title="Мой дневник" />

      <main className="px-4">
        {/* Quick actions */}
        <div className="flex gap-3 mb-4">
          <Button
            variant="tinted"
            className="flex-1"
            onClick={() => navigate('/tools/abc')}
          >
            + ABC-запись
          </Button>
          <Button
            variant="secondary"
            className="flex-1 flex items-center justify-center gap-2"
            onClick={() => navigate('/diary/mood')}
          >
            <ToolIcon tool="mood" size={20} /> Настроение
          </Button>
          <Button
            variant="secondary"
            onClick={() => navigate('/diary/statistics')}
          >
            <BarChart3 size={20} />
          </Button>
        </div>

        <div className="space-y-3">
          {entries.map((entry) => {
            // Поддержка обоих форматов: новый (A,B,C,D,E) и старый (situation, thought)
            const situation = entry.A || entry.situation;
            const thought = entry.B || entry.thought;
            const dateStr = entry.date
              ? new Date(entry.date).toLocaleDateString('ru-RU', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })
              : '—';

            return (
              <Card
                key={entry.id}
                className="p-4"
                onClick={() => navigate(`/diary/${entry.id}`)}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="caption">{dateStr}</span>
                </div>
                <p className="body-text text-sm mb-1">
                  <strong>Событие:</strong> {situation || '—'}
                </p>
                <p className="secondary-text text-sm line-clamp-2">
                  <strong>Мысли:</strong> {thought || '—'}
                </p>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
}
