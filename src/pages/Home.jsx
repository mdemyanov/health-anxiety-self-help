import { Card, ActionCard } from '../components/ui';
import { Header } from '../components/layout';
import { getQuoteOfDay } from '../data/quotes';

export default function Home() {
  const quote = getQuoteOfDay();

  return (
    <div className="min-h-screen pb-20">
      <Header title="Спокойствие" />

      <main className="px-4 space-y-6">
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
            <ActionCard to="/sos" className="text-center">
              <span className="text-3xl">🆘</span>
              <p className="headline mt-2">SOS</p>
            </ActionCard>
            <ActionCard to="/tools/breathing" className="text-center">
              <span className="text-3xl">🌬️</span>
              <p className="headline mt-2">Дыхание</p>
            </ActionCard>
            <ActionCard to="/tools" className="text-center">
              <span className="text-3xl">🛠</span>
              <p className="headline mt-2">Техники</p>
            </ActionCard>
            <ActionCard to="/stoic" className="text-center">
              <span className="text-3xl">📖</span>
              <p className="headline mt-2">Цитаты</p>
            </ActionCard>
          </div>
        </section>
      </main>
    </div>
  );
}
