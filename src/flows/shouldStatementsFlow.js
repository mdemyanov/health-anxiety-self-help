export const shouldStatementsFlow = {
  id: 'should-statements',
  title: 'Работа с "должен"',
  saveKey: 'should-statements-entries',

  steps: [
    {
      id: 'intro',
      messages: [
        {
          type: 'therapist-text',
          content: 'Сейчас мы поработаем с долженствованиями.',
          delay: 0,
        },
        {
          type: 'therapist-text',
          content: '«Должен», «обязан», «надо» — эти слова часто создают излишнее давление и вину. Давай разберёмся.',
          delay: 800,
        },
      ],
    },
    {
      id: 'should-statement',
      messages: [
        {
          type: 'therapist-question',
          content: 'Какое "должен" тебя сейчас давит? Запиши его.',
          delay: 500,
          awaitInput: true,
          inputPlaceholder: 'Например: я должен всегда быть доступен для команды, я должен был закрыть сделку...',
          saveAs: 'shouldStatement',
          multiline: true,
        },
      ],
    },
    {
      id: 'target',
      messages: [
        {
          type: 'therapist-text',
          content: 'На кого направлено это требование?',
          delay: 500,
        },
        {
          type: 'checklist',
          options: {
            title: 'Выбери цель долженствования',
            color: 'var(--apple-blue)',
            items: [
              'На себя — "Я должен..."',
              'На других — "Они должны..."',
              'На мир — "Так должно быть..."',
            ],
            singleSelect: true,
          },
          delay: 1000,
          saveAs: 'target',
        },
      ],
    },
    {
      id: 'source',
      messages: [
        {
          type: 'therapist-question',
          content: 'Откуда взялось это требование? Кто так решил?',
          delay: 500,
          awaitInput: true,
          inputPlaceholder: 'Родители, общество, прошлый опыт, я сам...',
          saveAs: 'source',
          multiline: true,
        },
      ],
    },
    {
      id: 'consequence',
      messages: [
        {
          type: 'therapist-question',
          content: 'Что происходит с тобой, когда ты не соответствуешь этому "должен"?',
          delay: 500,
          awaitInput: true,
          inputPlaceholder: 'Я чувствую вину, стыд, тревогу, злость...',
          saveAs: 'consequence',
          multiline: true,
        },
      ],
    },
    {
      id: 'reality-check',
      messages: [
        {
          type: 'therapist-text',
          content: 'Давай проверим это требование на реалистичность.',
          delay: 500,
        },
        {
          type: 'quote',
          content: 'Вопросы для размышления:',
          options: {
            items: [
              'Это требование реалистично для человека?',
              'Кто-то вообще соответствует ему на 100%?',
              'Что случится, если я НЕ буду этому следовать?',
              'Это помогает мне или мешает?',
            ],
          },
          delay: 1000,
        },
        {
          type: 'therapist-question',
          content: 'Насколько это требование реалистично?',
          delay: 2000,
          awaitInput: true,
          inputPlaceholder: 'Честно говоря...',
          saveAs: 'realityCheck',
          multiline: true,
        },
      ],
    },
    {
      id: 'reframe',
      messages: [
        {
          type: 'therapist-text',
          content: 'Теперь давай переформулируем жёсткое требование в гибкое предпочтение.',
          delay: 500,
        },
        {
          type: 'quote',
          content: 'Замени:',
          options: {
            items: [
              '"Я должен" → "Я хотел бы", "Мне важно"',
              '"Я обязан" → "Было бы хорошо", "Я предпочитаю"',
              '"Надо" → "Желательно", "Лучше бы"',
            ],
          },
          delay: 1000,
        },
        {
          type: 'therapist-question',
          content: 'Переформулируй своё "должен" в более гибкую форму.',
          delay: 2000,
          awaitInput: true,
          inputPlaceholder: 'Мне было бы важно... / Я предпочитаю...',
          saveAs: 'reframe',
          multiline: true,
        },
      ],
    },
    {
      id: 'self-compassion',
      messages: [
        {
          type: 'therapist-question',
          content: 'Что ты можешь сказать себе с сочувствием, когда не соответствуешь идеалу?',
          delay: 500,
          awaitInput: true,
          inputPlaceholder: 'Я человек, и это нормально...',
          saveAs: 'selfCompassion',
          multiline: true,
        },
      ],
    },
    {
      id: 'complete',
      messages: [
        {
          type: 'therapist-text',
          content: 'Отлично! Ты трансформировал жёсткое требование в гибкое предпочтение.',
          delay: 500,
        },
        {
          type: 'comparison',
          options: {
            before: { label: 'Было', valueKey: 'shouldStatement' },
            after: { label: 'Стало', valueKey: 'reframe' },
          },
          delay: 1000,
        },
        {
          type: 'quote',
          content: 'Требуй от себя не успеха, а лишь того, чтобы действовать правильно.',
          options: { author: 'Эпиктет' },
          delay: 2500,
        },
        {
          type: 'therapist-text',
          content: '«Должен» создаёт давление и вину. «Хотел бы» — мотивацию и выбор.',
          delay: 3500,
        },
        {
          type: 'system',
          content: 'Запись сохранена ✓',
          delay: 4300,
        },
      ],
      onComplete: (data) => {
        const entries = JSON.parse(localStorage.getItem('should-statements-entries') || '[]');
        entries.unshift({
          id: Date.now(),
          date: new Date().toISOString(),
          shouldStatement: data.shouldStatement,
          target: data.target,
          source: data.source,
          consequence: data.consequence,
          realityCheck: data.realityCheck,
          reframe: data.reframe,
          selfCompassion: data.selfCompassion,
        });
        localStorage.setItem('should-statements-entries', JSON.stringify(entries));
      },
    },
  ],
};
