import { Link } from 'react-router-dom';
import { Card, ActionCard } from '../components/ui';
import { Header } from '../components/layout';
import { ToolIcon, ChevronRight } from '../components/icons';
import { getQuoteOfDay } from '../data/quotes';
import { getRecommendation } from '../utils/recommendations';

export default function Home() {
  const quote = getQuoteOfDay();
  const recommendation = getRecommendation();

  const handleSosClick = () => {
    navigator.vibrate?.([20, 50, 20]);
  };

  return (
    <div className="min-h-screen pb-tab-bar">
      <Header title="Спокойствие" showSettings />

      <main className="px-4 space-y-6">
        {/* SOS Button - prominent at top */}
        <div className="sos-card p-5 rounded-[22px]">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <ToolIcon tool="sos" size={32} className="text-white icon-shadow" />
            </div>
            <div className="flex-1">
              <p className="text-white font-bold text-lg">SOS-помощь</p>
              <p className="text-white/80 text-sm">Тревога или паника? Начни здесь</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link
              to="/sos-quick"
              onClick={handleSosClick}
              className="flex-1 py-3 px-4 rounded-xl bg-white/20 text-white text-center font-medium active:scale-[0.98] transition-transform"
            >
              Быстро (2 мин)
            </Link>
            <Link
              to="/sos"
              onClick={handleSosClick}
              className="flex-1 py-3 px-4 rounded-xl bg-white/30 text-white text-center font-medium active:scale-[0.98] transition-transform"
            >
              Полная (8 мин)
            </Link>
          </div>
        </div>

        {/* Quote of the day */}
        <Card className="p-6">
          <p className="secondary-text text-sm mb-2">Цитата дня</p>
          <p className="body-text italic mb-3">&laquo;{quote.text}&raquo;</p>
          <p className="secondary-text text-right">— {quote.author}</p>
        </Card>

        {/* Personal recommendation */}
        <Link to={recommendation.path} className="block">
          <Card className="p-4 flex items-center gap-3 active:scale-[0.98] transition-transform">
            <ToolIcon
              tool={recommendation.icon}
              size={24}
              container="lg"
              color="blue"
              variant="glow"
            />
            <div className="flex-1 min-w-0">
              <p className="headline truncate">{recommendation.title}</p>
              <p className="secondary-text text-sm truncate">{recommendation.reason}</p>
            </div>
            <ChevronRight size={20} className="text-[var(--label-secondary)]" />
          </Card>
        </Link>

        {/* Quick actions */}
        <section>
          <h2 className="headline mb-3">Быстрые действия</h2>
          <div className="grid grid-cols-2 gap-3">
            <ActionCard to="/tools/breathing" className="text-center py-5">
              <ToolIcon
                tool="breathing"
                size={28}
                container="lg"
                color="blue"
                variant="shadow"
              />
              <p className="headline mt-3">Дыхание</p>
            </ActionCard>
            <ActionCard to="/tools/stop-pause" className="text-center py-5">
              <ToolIcon
                tool="stop-pause"
                size={28}
                container="lg"
                color="orange"
                variant="shadow"
              />
              <p className="headline mt-3">СТОП-пауза</p>
            </ActionCard>
            <ActionCard to="/tools" className="text-center py-5">
              <ToolIcon
                tool="tools"
                size={28}
                container="lg"
                color="purple"
                variant="shadow"
              />
              <p className="headline mt-3">Техники</p>
            </ActionCard>
            <ActionCard to="/stoic" className="text-center py-5">
              <ToolIcon
                tool="stoic"
                size={28}
                container="lg"
                color="green"
                variant="shadow"
              />
              <p className="headline mt-3">Стоики</p>
            </ActionCard>
          </div>
        </section>
      </main>
    </div>
  );
}
