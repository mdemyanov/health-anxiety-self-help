export const eveningFlow = {
  id: 'evening',
  title: 'Вечерняя рефлексия',

  steps: [
    {
      id: 'welcome',
      messages: [
        {
          type: 'therapist-text',
          content: 'Добрый вечер! Давай подведём итоги дня.',
          delay: 0,
        },
      ],
    },
    {
      id: 'intention-review',
      messages: [
        {
          type: 'therapist-text',
          content: 'Вспомни своё утреннее намерение.',
          delay: 500,
        },
      ],
      onEnter: () => {
        const intentionData = localStorage.getItem('daily-intention');
        if (intentionData) {
          const { text, date } = JSON.parse(intentionData);
          const intentionDate = new Date(date).toDateString();
          const today = new Date().toDateString();
          if (intentionDate === today) {
            return {
              additionalMessages: [
                {
                  type: 'quote',
                  content: text,
                  options: { author: 'Твоё намерение на сегодня' },
                  delay: 1000,
                },
              ],
            };
          }
        }
        return {
          additionalMessages: [
            {
              type: 'therapist-text',
              content: 'Похоже, ты не заполнял утреннюю практику сегодня. Ничего страшного — продолжим рефлексию.',
              delay: 1000,
            },
          ],
        };
      },
    },
    {
      id: 'what-went-well',
      messages: [
        {
          type: 'therapist-question',
          content: 'Что хорошего произошло сегодня? Назови 3 вещи.',
          delay: 500,
          awaitInput: true,
          inputPlaceholder: 'Сегодня было хорошо...',
          saveAs: 'what_went_well',
          multiline: true,
        },
      ],
    },
    {
      id: 'what-learned',
      messages: [
        {
          type: 'therapist-question',
          content: 'Чему ты научился сегодня?',
          delay: 500,
          awaitInput: true,
          inputPlaceholder: 'Я научился...',
          saveAs: 'what_learned',
          multiline: true,
        },
      ],
    },
    {
      id: 'what-could-improve',
      messages: [
        {
          type: 'therapist-question',
          content: 'Что можно было сделать лучше?',
          delay: 500,
          awaitInput: true,
          inputPlaceholder: 'Можно было бы...',
          saveAs: 'what_could_improve',
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
      id: 'letting-go',
      messages: [
        {
          type: 'therapist-text',
          content: 'Теперь отпусти день.',
          delay: 500,
        },
        {
          type: 'quote',
          content: 'Не позволяй прошлому мучить тебя, а будущему — пугать. Живи настоящим.',
          options: {
            author: 'Марк Аврелий',
          },
          delay: 1200,
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
          type: 'therapist-text',
          content: 'Ты сделал всё, что мог сегодня. Завтра — новый день.',
          delay: 1200,
        },
        {
          type: 'system',
          content: 'Рефлексия сохранена ✓',
          delay: 2000,
        },
      ],
      onComplete: (data) => {
        const reflections = JSON.parse(localStorage.getItem('evening-reflections') || '[]');
        const intentionData = localStorage.getItem('daily-intention');
        let morningIntention = null;
        if (intentionData) {
          const { text, date } = JSON.parse(intentionData);
          if (new Date(date).toDateString() === new Date().toDateString()) {
            morningIntention = text;
          }
        }
        reflections.unshift({
          date: new Date().toISOString(),
          what_went_well: data.what_went_well,
          what_learned: data.what_learned,
          what_could_improve: data.what_could_improve,
          gratitude: data.gratitude,
          morningIntention,
        });
        // Keep only last 30 entries
        localStorage.setItem('evening-reflections', JSON.stringify(reflections.slice(0, 30)));
      },
    },
  ],
};
