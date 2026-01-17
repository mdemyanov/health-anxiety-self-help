export const eveningQuickFlow = {
  id: 'evening-quick',
  title: 'Вечер (быстро)',

  steps: [
    {
      id: 'welcome',
      messages: [
        {
          type: 'therapist-text',
          content: 'Добрый вечер! Быстрая рефлексия дня.',
          delay: 0,
        },
      ],
    },
    {
      id: 'good-things',
      messages: [
        {
          type: 'therapist-question',
          content: 'Назови 3 хорошие вещи, которые произошли сегодня.',
          delay: 500,
          awaitInput: true,
          inputPlaceholder: '1. ...\n2. ...\n3. ...',
          saveAs: 'good_things',
          multiline: true,
        },
      ],
    },
    {
      id: 'gratitude',
      messages: [
        {
          type: 'therapist-question',
          content: 'За что ты благодарен сегодня?',
          delay: 500,
          awaitInput: true,
          inputPlaceholder: 'Я благодарен за...',
          saveAs: 'gratitude',
          multiline: true,
        },
      ],
    },
    {
      id: 'complete',
      messages: [
        {
          type: 'therapist-text',
          content: 'Спокойной ночи!',
          delay: 500,
        },
        {
          type: 'quote',
          content: 'Не позволяй прошлому мучить тебя, а будущему — пугать. Живи настоящим.',
          options: { author: 'Марк Аврелий' },
          delay: 1000,
        },
        {
          type: 'system',
          content: 'Рефлексия сохранена ✓',
          delay: 2000,
        },
      ],
      onComplete: (data) => {
        const reflections = JSON.parse(localStorage.getItem('evening-reflections') || '[]');
        reflections.unshift({
          date: new Date().toISOString(),
          good_things: data.good_things,
          gratitude: data.gratitude,
          isQuick: true,
        });
        localStorage.setItem('evening-reflections', JSON.stringify(reflections.slice(0, 30)));
      },
    },
  ],
};
