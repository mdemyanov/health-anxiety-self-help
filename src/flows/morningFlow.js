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
          content: 'Эта практика поможет настроиться на продуктивный день и снизить тревогу заранее.',
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
          content: 'Это не мрачное напоминание, а призыв ценить время и фокусироваться на важном.',
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
          content: 'Какие сложности могут возникнуть сегодня? Как ты справишься?',
          delay: 1200,
          awaitInput: true,
          inputPlaceholder: 'Сегодня может быть сложно... Я справлюсь, потому что...',
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
          content: 'Судьба ведёт того, кто хочет, и тащит того, кто не хочет.',
          options: {
            author: 'Сенека',
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
          inputPlaceholder: 'В моей власти сегодня...',
          saveAs: 'dichotomy',
          multiline: true,
        },
      ],
    },
    {
      id: 'priorities',
      messages: [
        {
          type: 'therapist-text',
          content: 'Какие 3 главные задачи ты хочешь выполнить сегодня?',
          delay: 500,
        },
        {
          type: 'repeated-input',
          options: {
            count: 3,
            placeholder: 'Напиши одну задачу...',
            statusHintTemplate: 'Напиши ещё {remaining}',
          },
          delay: 800,
          awaitCompletion: true,
          saveAs: 'priorities',
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
          content: 'Каким руководителем ты хочешь быть сегодня?',
          delay: 1000,
          awaitInput: true,
          inputPlaceholder: 'Сегодня я хочу быть...',
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
          type: 'quote',
          content: 'Утром, когда тебе не хочется вставать, скажи себе: я просыпаюсь, чтобы делать работу человека.',
          options: {
            author: 'Марк Аврелий',
          },
          delay: 1500,
        },
      ],
    },
  ],
};
