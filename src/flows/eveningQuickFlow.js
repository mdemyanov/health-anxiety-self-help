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
          type: 'therapist-text',
          content: 'Назови 3 хорошие вещи, которые произошли сегодня.',
          delay: 500,
        },
        {
          type: 'repeated-input',
          options: {
            count: 3,
            placeholder: 'Напиши одну хорошую вещь...',
            statusHintTemplate: 'Напиши ещё {remaining}',
          },
          delay: 800,
          awaitCompletion: true,
          saveAs: 'good_things',
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
