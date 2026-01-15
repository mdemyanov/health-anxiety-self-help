import { Link } from 'react-router-dom';
import { Card, ActionCard } from '../components/ui';
import { Header } from '../components/layout';
import { getQuoteOfDay } from '../data/quotes';

export default function Home() {
  const quote = getQuoteOfDay();

  const handleSosClick = () => {
    navigator.vibrate?.([20, 50, 20]);
  };

  return (
    <div className="min-h-screen pb-tab-bar">
      <Header title="Спокойствие" />

      <main className="px-4 space-y-6">
        {/* SOS Button - prominent at top */}
        <Link to="/sos" onClick={handleSosClick} className="block">
          <div className="sos-card p-5 flex items-center gap-4 rounded-[22px] active:scale-[0.98] transition-transform">
            <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
              <span className="text-3xl">🫂</span>
            </div>
            <div className="flex-1">
              <p className="text-white font-bold text-lg">SOS-помощь</p>
              <p className="text-white/80 text-sm">Тревога или паника? Начни здесь</p>
            </div>
            <span className="text-white/60 text-2xl">→</span>
          </div>
        </Link>

        {/* Quote of the day */}
        <Card className="p-6">
          <p className="secondary-text text-sm mb-2">Цитата дня</p>
          <p className="body-text italic mb-3">&laquo;{quote.text}&raquo;</p>
          <p className="secondary-text text-right">— {quote.author}</p>
        </Card>

        {/* Quick actions */}
        <section>
          <h2 className="headline mb-3">Быстрые действия</h2>
          <div className="grid grid-cols-2 gap-3">
            <ActionCard to="/tools/breathing" className="text-center">
              <span className="text-3xl">🌬️</span>
              <p className="headline mt-2">Дыхание</p>
            </ActionCard>
            <ActionCard to="/tools/stop-pause" className="text-center">
              <span className="text-3xl">⏸️</span>
              <p className="headline mt-2">СТОП-пауза</p>
            </ActionCard>
            <ActionCard to="/tools" className="text-center">
              <span className="text-3xl">🛠</span>
              <p className="headline mt-2">Техники</p>
            </ActionCard>
            <ActionCard to="/stoic" className="text-center">
              <span className="text-3xl">📖</span>
              <p className="headline mt-2">Стоики</p>
            </ActionCard>
          </div>
        </section>
      </main>
    </div>
  );
}
