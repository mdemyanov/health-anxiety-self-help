export const morningFlow = {
  id: 'morning',
  title: 'Утренняя практика',

  steps: [
    {
      id: 'welcome',
      messages: [
        {
          type: 'therapist-text',
          content: 'Доброе утро! Давай начнём день осознанно.',
          delay: 0,
        },
        {
          type: 'therapist-text',
          content: 'Эта 5-минутная практика поможет настроиться на день.',
          delay: 800,
        },
      ],
    },
    {
      id: 'memento',
      messages: [
        {
          type: 'therapist-text',
          content: 'Memento Mori — помни о смерти.',
          delay: 500,
        },
        {
          type: 'quote',
          content: 'Пусть каждый твой поступок будет таким, словно он последний в твоей жизни.',
          options: {
            author: 'Марк Аврелий',
          },
          delay: 1200,
        },
        {
          type: 'therapist-text',
          content: 'Это не мрачное напоминание, а призыв жить полноценно.',
          delay: 2200,
        },
      ],
    },
    {
      id: 'premeditatio',
      messages: [
        {
          type: 'therapist-text',
          content: 'Premeditatio Malorum — представь возможные трудности.',
          delay: 500,
        },
        {
          type: 'therapist-question',
          content: 'Что может пойти не так сегодня? Как ты справишься?',
          delay: 1200,
          awaitInput: true,
          inputPlaceholder: 'Сегодня может...',
          saveAs: 'premeditatio',
          multiline: true,
        },
      ],
    },
    {
      id: 'acceptance',
      messages: [
        {
          type: 'therapist-text',
          content: 'Теперь примем то, что вне нашего контроля.',
          delay: 500,
        },
        {
          type: 'quote',
          content: 'Не требуй, чтобы дела шли так, как ты хочешь. Желай, чтобы они шли так, как идут, и будешь счастлив.',
          options: {
            author: 'Эпиктет',
          },
          delay: 1000,
        },
      ],
    },
    {
      id: 'dichotomy',
      messages: [
        {
          type: 'therapist-question',
          content: 'Что сегодня в твоей власти? На чём сосредоточишь энергию?',
          delay: 500,
          awaitInput: true,
          inputPlaceholder: 'В моей власти...',
          saveAs: 'dichotomy',
          multiline: true,
        },
      ],
    },
    {
      id: 'intention',
      messages: [
        {
          type: 'therapist-text',
          content: 'Теперь самое важное — намерение дня.',
          delay: 500,
        },
        {
          type: 'therapist-question',
          content: 'Какое одно главное намерение у тебя на сегодня?',
          delay: 1000,
          awaitInput: true,
          inputPlaceholder: 'Моё намерение...',
          saveAs: 'intention',
          multiline: true,
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
          content: 'Ты готов к новому дню!',
          delay: 800,
        },
        {
          type: 'therapist-text',
          content: 'Помни о своём намерении в течение дня.',
          delay: 1500,
        },
      ],
    },
  ],
};
