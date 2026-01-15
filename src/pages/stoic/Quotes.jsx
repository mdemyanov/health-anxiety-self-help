import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui';
import { quotes } from '../../data/quotes';

export default function Quotes() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all' | 'favorites' | author name

  useEffect(() => {
    const saved = localStorage.getItem('favorite-quotes');
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch (e) {
        // ignore
      }
    }
  }, []);

  const toggleFavorite = (id) => {
    if (navigator.vibrate) {
      navigator.vibrate(30);
    }
    const newFavorites = favorites.includes(id)
      ? favorites.filter((f) => f !== id)
      : [...favorites, id];
    setFavorites(newFavorites);
    localStorage.setItem('favorite-quotes', JSON.stringify(newFavorites));
  };

  const authors = [...new Set(quotes.map((q) => q.author))];

  const filteredQuotes = quotes.filter((q) => {
    if (filter === 'all') return true;
    if (filter === 'favorites') return favorites.includes(q.id);
    return q.author === filter;
  });

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-40 px-4 py-4 flex items-center justify-between"
           style={{ background: 'var(--background)' }}>
        <button
          className="p-2 rounded-full"
          style={{ background: 'var(--card-secondary)' }}
          onClick={() => navigate(-1)}
        >
          <span className="text-lg">←</span>
        </button>
        <span className="headline">Цитаты стоиков</span>
        <div className="w-10" />
      </div>

      {/* Filters */}
      <div className="px-4 pt-16 pb-4">
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          <FilterChip
            label="Все"
            active={filter === 'all'}
            onClick={() => setFilter('all')}
          />
          <FilterChip
            label={`Избранные (${favorites.length})`}
            active={filter === 'favorites'}
            onClick={() => setFilter('favorites')}
            icon="❤️"
          />
          {authors.map((author) => (
            <FilterChip
              key={author}
              label={author}
              active={filter === author}
              onClick={() => setFilter(author)}
            />
          ))}
        </div>
      </div>

      {/* Quotes list */}
      <div className="px-4 space-y-4">
        {filteredQuotes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-4xl mb-4">📚</p>
            <p className="callout secondary-text">
              {filter === 'favorites'
                ? 'У вас пока нет избранных цитат'
                : 'Цитаты не найдены'}
            </p>
          </div>
        ) : (
          filteredQuotes.map((quote) => (
            <QuoteCard
              key={quote.id}
              quote={quote}
              isFavorite={favorites.includes(quote.id)}
              onToggleFavorite={() => toggleFavorite(quote.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}

function FilterChip({ label, active, onClick, icon }) {
  return (
    <button
      className="flex-shrink-0 px-4 py-2 rounded-full subhead transition-all"
      style={{
        background: active ? 'var(--apple-blue)' : 'var(--card-secondary)',
        color: active ? 'white' : 'var(--label)',
      }}
      onClick={onClick}
    >
      {icon && <span className="mr-1">{icon}</span>}
      {label}
    </button>
  );
}

function QuoteCard({ quote, isFavorite, onToggleFavorite }) {
  return (
    <Card className="p-4">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <p className="callout mb-3 leading-relaxed">«{quote.text}»</p>
          <p className="subhead secondary-text">— {quote.author}</p>
        </div>
        <button
          className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-transform active:scale-90"
          style={{ background: isFavorite ? 'rgba(255, 59, 48, 0.15)' : 'var(--card-secondary)' }}
          onClick={onToggleFavorite}
        >
          <span className="text-lg">{isFavorite ? '❤️' : '🤍'}</span>
        </button>
      </div>
    </Card>
  );
}
