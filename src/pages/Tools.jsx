import { ActionCard } from '../components/ui';
import { Header } from '../components/layout';
import { ToolIcon } from '../components/icons';

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
              <div className="flex items-center gap-3">
                <ToolIcon tool="stop-pause" size={24} className="text-[var(--apple-orange)]" />
                <div>
                  <p className="headline">СТОП-пауза</p>
                  <p className="secondary-text text-sm">Быстрая техника за 30 секунд</p>
                </div>
              </div>
            </ActionCard>
            <ActionCard to="/tools/grounding">
              <div className="flex items-center gap-3">
                <ToolIcon tool="grounding" size={24} className="text-[var(--apple-green)]" />
                <div>
                  <p className="headline">Техника 54321</p>
                  <p className="secondary-text text-sm">Заземление через органы чувств</p>
                </div>
              </div>
            </ActionCard>
            <ActionCard to="/tools/breathing">
              <div className="flex items-center gap-3">
                <ToolIcon tool="breathing" size={24} className="text-[var(--apple-blue)]" />
                <div>
                  <p className="headline">Дыхательные техники</p>
                  <p className="secondary-text text-sm">Квадрат, 4-7-8</p>
                </div>
              </div>
            </ActionCard>
          </div>
        </section>

        {/* CBT tools */}
        <section>
          <p className="secondary-text mb-3">Работа с мыслями</p>
          <div className="space-y-3">
            <ActionCard to="/tools/abc">
              <div className="flex items-center gap-3">
                <ToolIcon tool="abc-diary" size={24} className="text-[var(--apple-blue)]" />
                <div>
                  <p className="headline">Дневник ABC</p>
                  <p className="secondary-text text-sm">Запись и анализ мыслей</p>
                </div>
              </div>
            </ActionCard>
            <ActionCard to="/tools/triple-column">
              <div className="flex items-center gap-3">
                <ToolIcon tool="triple-column" size={24} className="text-[var(--apple-purple)]" />
                <div>
                  <p className="headline">Три колонки</p>
                  <p className="secondary-text text-sm">Мысль → искажение → ответ</p>
                </div>
              </div>
            </ActionCard>
            <ActionCard to="/tools/decatastrophize">
              <div className="flex items-center gap-3">
                <ToolIcon tool="decatastrophize" size={24} className="text-[var(--apple-red)]" />
                <div>
                  <p className="headline">Декатастрофизация</p>
                  <p className="secondary-text text-sm">Разбор катастрофических мыслей</p>
                </div>
              </div>
            </ActionCard>
            <ActionCard to="/tools/facts-vs-feelings">
              <div className="flex items-center gap-3">
                <ToolIcon tool="facts-vs-feelings" size={24} className="text-[var(--apple-green)]" />
                <div>
                  <p className="headline">Факты vs Чувства</p>
                  <p className="secondary-text text-sm">Отделить реальность от интерпретаций</p>
                </div>
              </div>
            </ActionCard>
            <ActionCard to="/tools/double-standard">
              <div className="flex items-center gap-3">
                <ToolIcon tool="double-standard" size={24} className="text-[var(--apple-blue)]" />
                <div>
                  <p className="headline">Двойной стандарт</p>
                  <p className="secondary-text text-sm">Что бы ты сказал другу?</p>
                </div>
              </div>
            </ActionCard>
            <ActionCard to="/tools/impostor-syndrome">
              <div className="flex items-center gap-3">
                <ToolIcon tool="impostor-syndrome" size={24} className="text-[var(--apple-purple)]" />
                <div>
                  <p className="headline">Синдром самозванца</p>
                  <p className="secondary-text text-sm">Работа с чувством некомпетентности</p>
                </div>
              </div>
            </ActionCard>
            <ActionCard to="/tools/should-statements">
              <div className="flex items-center gap-3">
                <ToolIcon tool="should-statements" size={24} className="text-[var(--apple-orange)]" />
                <div>
                  <p className="headline">Работа с "должен"</p>
                  <p className="secondary-text text-sm">Трансформация долженствований</p>
                </div>
              </div>
            </ActionCard>
            <ActionCard to="/tools/dichotomy">
              <div className="flex items-center gap-3">
                <ToolIcon tool="dichotomy" size={24} className="text-[var(--apple-green)]" />
                <div>
                  <p className="headline">Дихотомия контроля</p>
                  <p className="secondary-text text-sm">Что в моей власти?</p>
                </div>
              </div>
            </ActionCard>
            <ActionCard to="/tools/work-life-balance">
              <div className="flex items-center gap-3">
                <ToolIcon tool="work-life-balance" size={24} className="text-[var(--apple-blue)]" />
                <div>
                  <p className="headline">Баланс работа-жизнь</p>
                  <p className="secondary-text text-sm">Оценка и улучшение баланса</p>
                </div>
              </div>
            </ActionCard>
          </div>
        </section>
      </main>
    </div>
  );
}
