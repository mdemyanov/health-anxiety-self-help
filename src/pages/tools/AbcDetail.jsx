import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card } from '../../components/ui';
import { ChevronLeft, Trash2 } from '../../components/icons';

const SECTIONS = [
  { key: 'A', title: 'Событие', color: 'var(--apple-blue)' },
  { key: 'B', title: 'Мысли', color: 'var(--apple-purple)' },
  { key: 'C', title: 'Последствия', color: 'var(--apple-orange)' },
  { key: 'D', title: 'Диспут', color: 'var(--apple-green)' },
  { key: 'E', title: 'Эффект', color: 'var(--apple-blue)' },
];

export default function AbcDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [entry, setEntry] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    const entries = JSON.parse(localStorage.getItem('abc-entries') || '[]');
    const found = entries.find((e) => e.id === Number(id));
    if (found) {
      setEntry(found);
    } else {
      navigate('/diary');
    }
  }, [id, navigate]);

  const handleDelete = () => {
    const entries = JSON.parse(localStorage.getItem('abc-entries') || '[]');
    const filtered = entries.filter((e) => e.id !== Number(id));
    localStorage.setItem('abc-entries', JSON.stringify(filtered));
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
    navigate('/diary');
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (!entry) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="secondary-text">Загрузка...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-40 px-4 py-4 safe-area-top flex items-center justify-between"
           style={{ background: 'var(--background)' }}>
        <button
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: 'var(--card-secondary)' }}
          onClick={() => navigate(-1)}
        >
          <ChevronLeft size={20} className="text-[var(--label)]" />
        </button>
        <span className="headline">Запись</span>
        <button
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(255, 59, 48, 0.15)' }}
          onClick={() => setShowDeleteConfirm(true)}
        >
          <Trash2 size={20} className="text-[var(--apple-red)]" />
        </button>
      </div>

      {/* Content */}
      <div className="px-4 pt-20 safe-area-top">
        {/* Date */}
        <p className="subhead secondary-text text-center mb-6">
          {formatDate(entry.date)}
        </p>

        {/* Sections */}
        <div className="space-y-4">
          {SECTIONS.map((section) => (
            <Card key={section.key} className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                  style={{ background: section.color }}
                >
                  {section.key}
                </div>
                <span className="headline">{section.title}</span>
              </div>
              <p className="body-text">
                {entry[section.key] || <span className="secondary-text">Не заполнено</span>}
              </p>
            </Card>
          ))}
        </div>
      </div>

      {/* Delete confirmation modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6"
             style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="card p-6 max-w-sm w-full">
            <h2 className="title-2 text-center mb-2">Удалить запись?</h2>
            <p className="callout secondary-text text-center mb-6">
              Это действие нельзя отменить
            </p>
            <div className="space-y-3">
              <Button
                variant="filled"
                className="w-full"
                onClick={handleDelete}
                style={{ background: 'var(--apple-red)' }}
              >
                Удалить
              </Button>
              <Button
                variant="gray"
                className="w-full"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Отмена
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
