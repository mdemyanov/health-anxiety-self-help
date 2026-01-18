import { Link } from 'react-router-dom';
import { ActionCard, Card } from '../components/ui';
import { Header } from '../components/layout';
import { ToolIcon } from '../components/icons';
import { quotes } from '../data/quotes';

export default function Stoic() {
  return (
    <div className="min-h-screen pb-tab-bar">
      <Header title="Стоические практики" />

      <main className="px-4 space-y-6">
        {/* Daily practices */}
        <section>
          <p className="secondary-text mb-3">Ежедневные практики</p>
          <div className="space-y-3">
            <Card className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'var(--card-secondary)' }}>
                  <ToolIcon tool="morning" size={24} className="text-[var(--apple-orange)]" />
                </div>
                <div>
                  <p className="headline">Утренняя практика</p>
                  <p className="secondary-text text-sm">Подготовка к дню</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Link
                  to="/stoic/morning-quick"
                  className="flex-1 py-2.5 px-3 rounded-xl text-center text-sm font-medium active:scale-[0.98] transition-transform"
                  style={{ background: 'var(--glass-bg)', color: 'var(--label)' }}
                >
                  Быстро (2 мин)
                </Link>
                <Link
                  to="/stoic/morning"
                  className="flex-1 py-2.5 px-3 rounded-xl text-center text-sm font-medium active:scale-[0.98] transition-transform"
                  style={{ background: 'var(--apple-blue)', color: 'white' }}
                >
                  Полная (5 мин)
                </Link>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'var(--card-secondary)' }}>
                  <ToolIcon tool="evening" size={24} className="text-[var(--apple-purple)]" />
                </div>
                <div>
                  <p className="headline">Вечерняя рефлексия</p>
                  <p className="secondary-text text-sm">Обзор дня</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Link
                  to="/stoic/evening-quick"
                  className="flex-1 py-2.5 px-3 rounded-xl text-center text-sm font-medium active:scale-[0.98] transition-transform"
                  style={{ background: 'var(--glass-bg)', color: 'var(--label)' }}
                >
                  Быстро (2 мин)
                </Link>
                <Link
                  to="/stoic/evening"
                  className="flex-1 py-2.5 px-3 rounded-xl text-center text-sm font-medium active:scale-[0.98] transition-transform"
                  style={{ background: 'var(--apple-blue)', color: 'white' }}
                >
                  Полная (5 мин)
                </Link>
              </div>
            </Card>
          </div>
        </section>

        {/* Techniques */}
        <section>
          <p className="secondary-text mb-3">Техники</p>
          <div className="space-y-3">
            <ActionCard to="/tools/decision">
              <div className="flex items-center gap-3">
                <ToolIcon tool="decision" size={24} className="text-[var(--apple-blue)]" />
                <div>
                  <p className="headline">Принятие решений</p>
                  <p className="secondary-text text-sm">Стоический подход к выбору</p>
                </div>
              </div>
            </ActionCard>
            <ActionCard to="/stoic/view-from-above">
              <div className="flex items-center gap-3">
                <ToolIcon tool="view-from-above" size={24} className="text-[var(--apple-green)]" />
                <div>
                  <p className="headline">Взгляд сверху</p>
                  <p className="secondary-text text-sm">Космическая перспектива</p>
                </div>
              </div>
            </ActionCard>
          </div>
        </section>

        {/* Wisdom */}
        <section>
          <p className="secondary-text mb-3">Мудрость</p>
          <div className="space-y-3">
            <ActionCard to="/stoic/quotes">
              <div className="flex items-center gap-3">
                <ToolIcon tool="quotes" size={24} className="text-[var(--apple-orange)]" />
                <div>
                  <p className="headline">Цитаты стоиков</p>
                  <p className="secondary-text text-sm">{quotes.length} цитат</p>
                </div>
              </div>
            </ActionCard>
          </div>
        </section>
      </main>
    </div>
  );
}
