import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from '../components/ui';
import { Header } from '../components/layout';

export default function Diary() {
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('abcEntries');
    if (saved) {
      setEntries(JSON.parse(saved));
    }
  }, []);

  if (entries.length === 0) {
    return (
      <div className="min-h-screen pb-tab-bar">
        <Header title="Мой дневник" />

        <main className="px-4">
          <div className="text-center py-12">
            <p className="text-5xl mb-4">📓</p>
            <p className="secondary-text mb-6">
              Записей пока нет. Начни вести дневник мыслей.
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
        <Button
          variant="tinted"
          className="mb-4"
          onClick={() => navigate('/tools/abc')}
        >
          + Новая запись
        </Button>

        <div className="space-y-3">
          {entries.map((entry) => {
            const hasImproved = entry.emotionAfter !== undefined &&
              entry.emotionInt > entry.emotionAfter;

            return (
              <Card
                key={entry.id}
                className="p-4"
                onClick={() => navigate(`/diary/${entry.id}`)}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="caption">{entry.date}</span>
                  <div className="flex items-center gap-2">
                    {hasImproved && (
                      <span className="text-xs" style={{ color: 'var(--apple-green)' }}>↓</span>
                    )}
                    <span
                      className="caption px-2 py-1 rounded-full"
                      style={{ background: 'rgba(0, 122, 255, 0.15)', color: 'var(--apple-blue)' }}
                    >
                      {entry.emotion} {entry.emotionInt}/10
                    </span>
                  </div>
                </div>
                <p className="body-text text-sm mb-1">
                  <strong>Ситуация:</strong> {entry.situation || '—'}
                </p>
                <p className="secondary-text text-sm mb-2">
                  <strong>Мысль:</strong> {entry.thought || '—'}
                </p>
                {entry.alternative && (
                  <p className="text-sm" style={{ color: 'var(--apple-green)' }}>
                    <strong>Альтернатива:</strong> {entry.alternative}
                  </p>
                )}
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
}
