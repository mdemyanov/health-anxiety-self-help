export const impostorSyndromeFlow = {
  id: 'impostor-syndrome',
  title: 'Синдром самозванца',
  saveKey: 'impostor-syndrome-entries',

  steps: [
    // Шаг 1: Intro
    {
      id: 'intro',
      messages: [
        {
          type: 'therapist-text',
          content: 'Привет! Давай поработаем с синдромом самозванца.',
          delay: 0,
        },
        {
          type: 'therapist-text',
          content: 'Это чувство, что ты "не заслуживаешь" своих достижений, несмотря на реальные успехи. Очень распространено среди руководителей.',
          delay: 800,
        },
        {
          type: 'quote',
          content: 'Синдром самозванца испытывают 70% успешных людей.',
          options: { author: 'Исследование Clance & Imes' },
          delay: 1600,
        },
      ],
    },

    // Шаг 2: Идентификация мысли
    {
      id: 'identify',
      messages: [
        {
          type: 'therapist-question',
          content: 'Какая мысль о своей некомпетентности тебя сейчас беспокоит?',
          delay: 500,
          awaitInput: true,
          inputPlaceholder: 'Например: я недостаточно опытен для должности CEO, я не заслуживаю этой роли...',
          saveAs: 'impostorThought',
          multiline: true,
        },
      ],
    },

    // Шаг 3: Checklist "доказательств" самозванца
    {
      id: 'beliefs',
      messages: [
        {
          type: 'therapist-text',
          content: 'Какие "аргументы" использует твой внутренний критик?',
          delay: 500,
        },
        {
          type: 'checklist',
          options: {
            title: 'Отметь знакомые мысли',
            color: 'var(--apple-orange)',
            items: [
              'Мне просто повезло',
              'Скоро все поймут, что я ничего не знаю',
              'Другие справились бы лучше',
              'Мои успехи — это заслуга команды, не моя',
              'Я недостаточно квалифицирован',
              'Я не заслуживаю своей должности',
              'Я обманываю окружающих',
              'Рано или поздно меня "разоблачат"',
            ],
            showContinueButton: true,
          },
          delay: 1000,
          awaitCompletion: true,
          saveAs: 'impostorBeliefs',
        },
      ],
    },

    // Шаг 4: Достижения (repeated-input)
    {
      id: 'achievements',
      messages: [
        {
          type: 'therapist-text',
          content: 'Теперь соберём факты о твоей реальной компетентности.',
          delay: 500,
        },
        {
          type: 'therapist-text',
          content: 'Напиши 3 своих достижения за последний год. Любые — большие или маленькие.',
          delay: 1200,
        },
        {
          type: 'repeated-input',
          options: {
            count: 3,
            placeholder: 'Моё достижение...',
            statusHintTemplate: 'Осталось ещё {remaining}',
          },
          delay: 1800,
          saveAs: 'achievements',
        },
      ],
    },

    // Шаг 5: Внешний наблюдатель
    {
      id: 'observer',
      messages: [
        {
          type: 'therapist-text',
          content: 'Представь коллегу-руководителя, который смотрит на твою карьеру со стороны.',
          delay: 500,
        },
        {
          type: 'therapist-text',
          content: 'Он видит твой путь, твои решения, твои результаты.',
          delay: 1200,
        },
        {
          type: 'therapist-question',
          content: 'Что бы он сказал о твоей компетентности?',
          delay: 1800,
          awaitInput: true,
          inputPlaceholder: 'Он бы сказал, что...',
          saveAs: 'externalView',
          multiline: true,
        },
      ],
    },

    // Шаг 6: Переформулирование
    {
      id: 'reframe',
      messages: [
        {
          type: 'therapist-text',
          content: 'Теперь давай переформулируем твою изначальную мысль.',
          delay: 500,
        },
        {
          type: 'quote',
          content: 'Не "я недостаточно хорош", а "я учусь и развиваюсь, как и все".',
          options: { author: 'Принцип роста' },
          delay: 1000,
        },
        {
          type: 'therapist-question',
          content: 'Как звучит более реалистичная версия твоей мысли?',
          delay: 1800,
          awaitInput: true,
          inputPlaceholder: 'Более честная оценка себя...',
          saveAs: 'reframedThought',
          multiline: true,
        },
      ],
    },

    // Шаг 7: План действий
    {
      id: 'plan',
      messages: [
        {
          type: 'therapist-question',
          content: 'Что ты сделаешь, когда синдром самозванца снова появится? Какой один шаг поможет тебе?',
          delay: 500,
          awaitInput: true,
          inputPlaceholder: 'Когда появятся сомнения, я...',
          saveAs: 'actionPlan',
          multiline: true,
        },
      ],
    },

    // Шаг 8: Завершение
    {
      id: 'complete',
      messages: [
        {
          type: 'therapist-text',
          content: 'Отлично! Ты проделал важную работу.',
          delay: 500,
        },
        {
          type: 'therapist-text',
          content: 'Синдром самозванца — это не истина о тебе. Это искажённое восприятие, которое можно корректировать.',
          delay: 1200,
        },
        {
          type: 'quote',
          content: 'Единственный способ избежать критики — ничего не делать, ничего не говорить и быть никем.',
          options: { author: 'Аристотель' },
          delay: 2200,
        },
        {
          type: 'system',
          content: 'Запись сохранена ✓',
          delay: 3200,
        },
      ],
      onComplete: (data) => {
        const entries = JSON.parse(localStorage.getItem('impostor-syndrome-entries') || '[]');
        entries.unshift({
          id: Date.now(),
          date: new Date().toISOString(),
          impostorThought: data.impostorThought,
          impostorBeliefs: data.impostorBeliefs || [],
          achievements: data.achievements || [],
          externalView: data.externalView,
          reframedThought: data.reframedThought,
          actionPlan: data.actionPlan,
        });
        localStorage.setItem('impostor-syndrome-entries', JSON.stringify(entries));
      },
    },
  ],
};
