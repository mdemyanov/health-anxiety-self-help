export const sosQuickFlow = {
  id: 'sos-quick',
  title: 'Быстрая помощь',

  steps: [
    {
      id: 'welcome',
      messages: [
        {
          type: 'therapist-text',
          content: 'Ты не один. Я здесь.',
          delay: 0,
        },
        {
          type: 'therapist-text',
          content: 'Сейчас сделаем короткую дыхательную практику — это займёт пару минут.',
          delay: 800,
        },
      ],
    },
    {
      id: 'breathing',
      messages: [
        {
          type: 'therapist-text',
          content: 'Дыши со мной. Вдох когда круг увеличивается, выдох когда уменьшается.',
          delay: 500,
        },
        {
          type: 'breathing',
          options: { pattern: '4-4', cycles: 4 },
          delay: 1000,
          awaitCompletion: true,
        },
      ],
    },
    {
      id: 'complete',
      messages: [
        {
          type: 'system',
          content: 'Дыхание завершено ✓',
          delay: 0,
        },
        {
          type: 'therapist-text',
          content: 'Ты справился!',
          delay: 600,
        },
        {
          type: 'quote',
          content: 'Не вещи беспокоят нас, а наши суждения о вещах.',
          options: { author: 'Эпиктет' },
          delay: 1200,
        },
        {
          type: 'therapist-text',
          content: 'Тревога временна. Она не определяет тебя.',
          delay: 2200,
        },
      ],
    },
  ],
};
