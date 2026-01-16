export const abcFlow = {
  id: 'abc-diary',
  title: 'ABC-дневник',
  saveKey: 'abc-entries',

  steps: [
    {
      id: 'intro',
      messages: [
        {
          type: 'therapist-text',
          content: 'Привет! Давай разберём ситуацию по методу ABC.',
          delay: 0,
        },
        {
          type: 'therapist-text',
          content: 'Это поможет увидеть связь между событиями, мыслями и эмоциями.',
          delay: 800,
        },
        {
          type: 'therapist-question',
          content: 'Что произошло? Опиши активирующее событие (A).',
          delay: 1500,
          awaitInput: true,
          inputPlaceholder: 'Например: сложный разговор с инвестором, конфликт в команде, плохие новости...',
          saveAs: 'A',
          multiline: true,
        },
      ],
    },
    {
      id: 'beliefs',
      messages: [
        {
          type: 'therapist-text',
          content: 'Понял. Теперь давай посмотрим на мысли.',
          delay: 500,
        },
        {
          type: 'therapist-question',
          content: 'Какие мысли возникли? Что ты подумал о ситуации? (B - Beliefs)',
          delay: 1000,
          awaitInput: true,
          inputPlaceholder: 'Мои мысли были...',
          saveAs: 'B',
          multiline: true,
        },
      ],
    },
    {
      id: 'consequences',
      messages: [
        {
          type: 'therapist-question',
          content: 'Какие эмоции и поведение это вызвало? (C - Consequences)',
          delay: 500,
          awaitInput: true,
          inputPlaceholder: 'Я почувствовал / сделал...',
          saveAs: 'C',
          multiline: true,
        },
      ],
    },
    {
      id: 'distortions',
      messages: [
        {
          type: 'therapist-text',
          content: 'Давай проверим, нет ли в твоих мыслях когнитивных искажений.',
          delay: 500,
        },
        {
          type: 'therapist-text',
          content: 'Вот 10 типичных ловушек мышления (по Дэвиду Бёрнсу):',
          delay: 1000,
        },
        {
          type: 'checklist',
          options: {
            title: 'Отметь, что узнаёшь в своих мыслях',
            color: 'var(--apple-orange)',
            items: [
              'Чёрно-белое мышление — "всё или ничего"',
              'Сверхобобщение — "всегда", "никогда"',
              'Негативный фильтр — фокус только на плохом',
              'Обесценивание позитивного — "это не считается"',
              'Чтение мыслей — "он думает, что я..."',
              'Предсказание будущего — "точно будет плохо"',
              'Катастрофизация — "это конец всему"',
              'Эмоциональное обоснование — "чувствую = правда"',
              'Долженствования — "я должен", "они должны"',
              'Навешивание ярлыков — "я неудачник"',
            ],
          },
          delay: 1500,
        },
      ],
    },
    {
      id: 'dispute',
      messages: [
        {
          type: 'therapist-text',
          content: 'Теперь самое важное — оспорим эти мысли.',
          delay: 500,
        },
        {
          type: 'quote',
          content: 'Вопросы для размышления:',
          options: {
            items: [
              'Какие факты подтверждают эту мысль?',
              'Какие факты опровергают её?',
              'Что бы я сказал коллеге в такой ситуации?',
              'Насколько вероятен худший сценарий?',
              'Как я посмотрю на это через год?',
            ],
          },
          delay: 1000,
        },
        {
          type: 'therapist-question',
          content: 'Оспорь свои мысли. Какие есть доказательства против? (D - Dispute)',
          delay: 1800,
          awaitInput: true,
          inputPlaceholder: 'На самом деле...',
          saveAs: 'D',
          multiline: true,
        },
      ],
    },
    {
      id: 'effect',
      messages: [
        {
          type: 'therapist-question',
          content: 'Как изменились твои чувства после этого анализа? (E - Effect)',
          delay: 500,
          awaitInput: true,
          inputPlaceholder: 'Теперь я чувствую...',
          saveAs: 'E',
          multiline: true,
        },
      ],
    },
    {
      id: 'complete',
      messages: [
        {
          type: 'therapist-text',
          content: 'Отлично! Ты успешно проработал ситуацию.',
          delay: 500,
        },
        {
          type: 'quote',
          content: 'Не вещи беспокоят нас, а наши суждения о вещах.',
          options: { author: 'Эпиктет' },
          delay: 1200,
        },
        {
          type: 'therapist-text',
          content: 'Каждый раз, когда ты это делаешь, ты тренируешь навык рационального мышления.',
          delay: 2000,
        },
        {
          type: 'system',
          content: 'Запись сохранена в дневник ✓',
          delay: 2800,
        },
      ],
      onComplete: (data) => {
        const entries = JSON.parse(localStorage.getItem('abc-entries') || '[]');
        entries.unshift({
          id: Date.now(),
          date: new Date().toISOString(),
          A: data.A,
          B: data.B,
          C: data.C,
          D: data.D,
          E: data.E,
        });
        localStorage.setItem('abc-entries', JSON.stringify(entries));
      },
    },
  ],
};
