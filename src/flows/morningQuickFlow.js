export const morningQuickFlow = {
  id: 'morning-quick',
  title: 'Утро (быстро)',

  steps: [
    {
      id: 'welcome',
      messages: [
        {
          type: 'therapist-text',
          content: 'Доброе утро! Быстрая настройка на день.',
          delay: 0,
        },
      ],
    },
    {
      id: 'priority',
      messages: [
        {
          type: 'therapist-question',
          content: 'Какая одна главная задача на сегодня?',
          delay: 500,
          awaitInput: true,
          inputPlaceholder: 'Сегодня самое важное...',
          saveAs: 'priority',
          multiline: true,
        },
      ],
    },
    {
      id: 'intention',
      messages: [
        {
          type: 'therapist-question',
          content: 'Каким ты хочешь быть сегодня? (одно слово или фраза)',
          delay: 500,
          awaitInput: true,
          inputPlaceholder: 'Сегодня я буду...',
          saveAs: 'intention',
        },
      ],
      onComplete: (data) => {
        if (data.intention) {
          localStorage.setItem('daily-intention', JSON.stringify({
            text: data.intention,
            date: new Date().toISOString(),
          }));
        }
      },
    },
    {
      id: 'complete',
      messages: [
        {
          type: 'system',
          content: 'Намерение сохранено ✓',
          delay: 0,
        },
        {
          type: 'therapist-text',
          content: 'Отличного дня!',
          delay: 600,
        },
        {
          type: 'quote',
          content: 'Утром, когда тебе не хочется вставать, скажи себе: я просыпаюсь, чтобы делать работу человека.',
          options: { author: 'Марк Аврелий' },
          delay: 1200,
        },
      ],
    },
  ],
};
