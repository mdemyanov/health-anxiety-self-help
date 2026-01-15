import { ActionCard } from '../components/ui';
import { Header } from '../components/layout';
import { quotes } from '../data/quotes';

export default function Stoic() {
  return (
    <div className="min-h-screen pb-20">
      <Header title="Стоические практики" />

      <main className="px-4 space-y-6">
        {/* Daily practices */}
        <section>
          <p className="secondary-text mb-3">Ежедневные практики</p>
          <div className="space-y-3">
            <ActionCard to="/stoic/morning">
              <p className="headline">🌅 Утренняя практика</p>
              <p className="secondary-text text-sm">5 минут для подготовки к дню</p>
            </ActionCard>
            <ActionCard to="/stoic/evening">
              <p className="headline">🌙 Вечерняя рефлексия</p>
              <p className="secondary-text text-sm">5 минут для обзора дня</p>
            </ActionCard>
          </div>
        </section>

        {/* Wisdom */}
        <section>
          <p className="secondary-text mb-3">Мудрость</p>
          <div className="space-y-3">
            <ActionCard to="/stoic/quotes">
              <p className="headline">📖 Цитаты стоиков</p>
              <p className="secondary-text text-sm">{quotes.length} цитат</p>
            </ActionCard>
            <ActionCard to="/stoic/view-from-above">
              <p className="headline">🌍 Взгляд сверху</p>
              <p className="secondary-text text-sm">Космическая перспектива</p>
            </ActionCard>
          </div>
        </section>
      </main>
    </div>
  );
}
