export const decisionFlow = {
  id: 'decision',
  title: 'Принятие решений',
  saveKey: 'decision-entries',

  steps: [
    // Шаг 1: Intro
    {
      id: 'intro',
      messages: [
        {
          type: 'therapist-text',
          content: 'Давай разберём твоё решение с помощью стоического подхода.',
          delay: 0,
        },
        {
          type: 'therapist-text',
          content: 'Стоики учили принимать решения спокойно, фокусируясь на том, что в нашей власти.',
          delay: 800,
        },
      ],
    },

    // Шаг 2: Описание ситуации
    {
      id: 'situation',
      messages: [
        {
          type: 'therapist-question',
          content: 'Какое решение тебе нужно принять? Опиши ситуацию.',
          delay: 500,
          awaitInput: true,
          inputPlaceholder: 'Например: увольнение сотрудника, смена стратегии, инвестиция...',
          saveAs: 'situation',
          multiline: true,
        },
      ],
    },

    // Шаг 3: Дихотомия — в моей власти
    {
      id: 'in-control',
      messages: [
        {
          type: 'therapist-text',
          content: 'Теперь применим дихотомию контроля.',
          delay: 500,
        },
        {
          type: 'quote',
          content: 'Из всего существующего одно находится в нашей власти, другое — нет.',
          options: { author: 'Эпиктет' },
          delay: 1000,
        },
        {
          type: 'therapist-question',
          content: 'Что в этой ситуации В ТВОЕЙ ВЛАСТИ?',
          delay: 1800,
          awaitInput: true,
          inputPlaceholder: 'Я могу контролировать...',
          saveAs: 'inControl',
          multiline: true,
        },
      ],
    },

    // Шаг 4: Дихотомия — не в моей власти
    {
      id: 'not-in-control',
      messages: [
        {
          type: 'therapist-question',
          content: 'А что НЕ В ТВОЕЙ ВЛАСТИ?',
          delay: 500,
          awaitInput: true,
          inputPlaceholder: 'Я не могу контролировать...',
          saveAs: 'notInControl',
          multiline: true,
        },
      ],
    },

    // Шаг 5: Варианты решения
    {
      id: 'options',
      messages: [
        {
          type: 'therapist-text',
          content: 'Какие варианты решения у тебя есть? Напиши 2 основных.',
          delay: 500,
        },
        {
          type: 'repeated-input',
          options: {
            count: 2,
            placeholder: 'Вариант решения...',
            statusHintTemplate: 'Ещё {remaining}',
          },
          delay: 1000,
          saveAs: 'options',
        },
      ],
    },

    // Шаг 6: Худший исход
    {
      id: 'worst-case',
      messages: [
        {
          type: 'therapist-text',
          content: 'Давай проанализируем возможные исходы.',
          delay: 500,
        },
        {
          type: 'therapist-question',
          content: 'Каков ХУДШИЙ возможный исход твоего решения? Что самое плохое может случиться?',
          delay: 1000,
          awaitInput: true,
          inputPlaceholder: 'В худшем случае...',
          saveAs: 'worstCase',
          multiline: true,
        },
      ],
    },

    // Шаг 7: Реалистичный исход
    {
      id: 'realistic-case',
      messages: [
        {
          type: 'therapist-question',
          content: 'А каков РЕАЛИСТИЧНЫЙ исход? Что, скорее всего, произойдёт?',
          delay: 500,
          awaitInput: true,
          inputPlaceholder: 'Скорее всего...',
          saveAs: 'realisticCase',
          multiline: true,
        },
      ],
    },

    // Шаг 8: Принятие решения
    {
      id: 'decision',
      messages: [
        {
          type: 'therapist-text',
          content: 'Теперь, когда ты проанализировал ситуацию...',
          delay: 500,
        },
        {
          type: 'therapist-question',
          content: 'Какое решение ты принимаешь?',
          delay: 1000,
          awaitInput: true,
          inputPlaceholder: 'Я решаю...',
          saveAs: 'decision',
          multiline: true,
        },
      ],
    },

    // Шаг 9: Отпускание результата
    {
      id: 'acceptance',
      messages: [
        {
          type: 'therapist-text',
          content: 'Последний шаг — стоическое отпускание результата.',
          delay: 500,
        },
        {
          type: 'quote',
          content: 'Не требуй, чтобы всё происходило так, как ты хочешь. Желай, чтобы всё происходило так, как происходит.',
          options: { author: 'Эпиктет' },
          delay: 1000,
        },
        {
          type: 'therapist-text',
          content: 'Ты контролируешь своё решение и свои действия. Результат — уже не в твоей власти.',
          delay: 2000,
        },
        {
          type: 'therapist-question',
          content: 'Как ты можешь отнестись к любому исходу с принятием?',
          delay: 2800,
          awaitInput: true,
          inputPlaceholder: 'Я приму результат, потому что...',
          saveAs: 'acceptance',
          multiline: true,
        },
      ],
    },

    // Шаг 10: Завершение
    {
      id: 'complete',
      messages: [
        {
          type: 'therapist-text',
          content: 'Отлично! Ты принял решение осознанно и подготовился к любому исходу.',
          delay: 500,
        },
        {
          type: 'quote',
          content: 'Счастье зависит от тебя самого.',
          options: { author: 'Марк Аврелий' },
          delay: 1200,
        },
        {
          type: 'system',
          content: 'Запись сохранена ✓',
          delay: 2200,
        },
      ],
      onComplete: (data) => {
        const entries = JSON.parse(localStorage.getItem('decision-entries') || '[]');
        entries.unshift({
          id: Date.now(),
          date: new Date().toISOString(),
          situation: data.situation,
          inControl: data.inControl,
          notInControl: data.notInControl,
          options: data.options || [],
          worstCase: data.worstCase,
          realisticCase: data.realisticCase,
          decision: data.decision,
          acceptance: data.acceptance,
        });
        localStorage.setItem('decision-entries', JSON.stringify(entries));
      },
    },
  ],
};
