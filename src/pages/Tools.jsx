import { ActionCard } from '../components/ui';
import { Header } from '../components/layout';

export default function Tools() {
  return (
    <div className="min-h-screen pb-tab-bar">
      <Header title="Инструменты" />

      <main className="px-4 space-y-6">
        {/* Emergency tools */}
        <section>
          <p className="secondary-text mb-3">Экстренная помощь</p>
          <div className="space-y-3">
            <ActionCard to="/tools/stop-pause">
              <p className="headline">✋ СТОП-пауза</p>
              <p className="secondary-text text-sm">Быстрая техника за 30 секунд</p>
            </ActionCard>
            <ActionCard to="/tools/grounding">
              <p className="headline">🌍 Техника 54321</p>
              <p className="secondary-text text-sm">Заземление через органы чувств</p>
            </ActionCard>
            <ActionCard to="/tools/breathing">
              <p className="headline">🌬️ Дыхательные техники</p>
              <p className="secondary-text text-sm">Квадрат, 4-7-8</p>
            </ActionCard>
          </div>
        </section>

        {/* CBT tools */}
        <section>
          <p className="secondary-text mb-3">Работа с мыслями</p>
          <div className="space-y-3">
            <ActionCard to="/tools/abc">
              <p className="headline">📝 Дневник ABC</p>
              <p className="secondary-text text-sm">Запись и анализ мыслей</p>
            </ActionCard>
            <ActionCard to="/tools/triple-column">
              <p className="headline">📊 Три колонки</p>
              <p className="secondary-text text-sm">Мысль → искажение → ответ</p>
            </ActionCard>
            <ActionCard to="/tools/decatastrophize">
              <p className="headline">🔍 Декатастрофизация</p>
              <p className="secondary-text text-sm">Разбор катастрофических мыслей</p>
            </ActionCard>
            <ActionCard to="/tools/facts-vs-feelings">
              <p className="headline">📋 Факты vs Чувства</p>
              <p className="secondary-text text-sm">Отделить реальность от интерпретаций</p>
            </ActionCard>
            <ActionCard to="/tools/double-standard">
              <p className="headline">🤝 Двойной стандарт</p>
              <p className="secondary-text text-sm">Что бы ты сказал другу?</p>
            </ActionCard>
            <ActionCard to="/tools/should-statements">
              <p className="headline">🎯 Работа с "должен"</p>
              <p className="secondary-text text-sm">Трансформация долженствований</p>
            </ActionCard>
            <ActionCard to="/tools/dichotomy">
              <p className="headline">⚖️ Дихотомия контроля</p>
              <p className="secondary-text text-sm">Что в моей власти?</p>
            </ActionCard>
          </div>
        </section>
      </main>
    </div>
  );
}
