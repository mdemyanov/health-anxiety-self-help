export const groundingFlow = {
  id: 'grounding',
  title: 'Техника 5-4-3-2-1',

  steps: [
    {
      id: 'intro',
      messages: [
        {
          type: 'therapist-text',
          content: 'Давай выполним технику заземления 5-4-3-2-1.',
          delay: 0,
        },
        {
          type: 'therapist-text',
          content: 'Она поможет вернуться в настоящий момент через органы чувств.',
          delay: 800,
        },
      ],
    },
    {
      id: 'grounding-5',
      messages: [
        {
          type: 'therapist-text',
          content: 'Назови 5 вещей, которые ты ВИДИШЬ вокруг себя.',
          delay: 500,
        },
        {
          type: 'therapist-text',
          content: 'Не спеши. Внимательно осмотрись вокруг и назови конкретные предметы.',
          delay: 1200,
        },
        {
          type: 'repeated-input',
          options: {
            count: 5,
            placeholder: 'Я вижу...',
            statusHintTemplate: 'Напиши еще {remaining}',
          },
          delay: 1800,
          awaitCompletion: true,
          saveAs: 'grounding5',
        },
      ],
    },
    {
      id: 'grounding-4',
      messages: [
        {
          type: 'therapist-text',
          content: 'Отлично! Теперь назови 4 вещи, которые ты можешь ПОТРОГАТЬ.',
          delay: 500,
        },
        {
          type: 'repeated-input',
          options: {
            count: 4,
            placeholder: 'Я трогаю...',
            statusHintTemplate: 'Напиши еще {remaining}',
          },
          delay: 1000,
          awaitCompletion: true,
          saveAs: 'grounding4',
        },
      ],
    },
    {
      id: 'grounding-3',
      messages: [
        {
          type: 'therapist-text',
          content: 'Хорошо! Назови 3 звука, которые ты СЛЫШИШЬ.',
          delay: 500,
        },
        {
          type: 'repeated-input',
          options: {
            count: 3,
            placeholder: 'Я слышу...',
            statusHintTemplate: 'Напиши еще {remaining}',
          },
          delay: 1000,
          awaitCompletion: true,
          saveAs: 'grounding3',
        },
      ],
    },
    {
      id: 'grounding-2',
      messages: [
        {
          type: 'therapist-text',
          content: 'Молодец! Назови 2 запаха, которые ты ЧУВСТВУЕШЬ.',
          delay: 500,
        },
        {
          type: 'repeated-input',
          options: {
            count: 2,
            placeholder: 'Я чувствую запах...',
            statusHintTemplate: 'Напиши еще {remaining}',
          },
          delay: 1000,
          awaitCompletion: true,
          saveAs: 'grounding2',
        },
      ],
    },
    {
      id: 'grounding-1',
      messages: [
        {
          type: 'therapist-text',
          content: 'Почти готово! Назови 1 вкус, который ты ощущаешь или можешь представить.',
          delay: 500,
        },
        {
          type: 'repeated-input',
          options: {
            count: 1,
            placeholder: 'Я ощущаю вкус...',
            statusHintTemplate: 'Напиши еще {remaining}',
          },
          delay: 1000,
          awaitCompletion: true,
          saveAs: 'grounding1',
        },
      ],
    },
    {
      id: 'complete',
      messages: [
        {
          type: 'system',
          content: 'Заземление завершено ✓',
          delay: 0,
        },
        {
          type: 'therapist-text',
          content: 'Отлично! Ты вернулся в настоящий момент.',
          delay: 800,
        },
        {
          type: 'therapist-text',
          content: 'Используй эту технику каждый раз, когда чувствуешь, что тревога уносит тебя в мысли о будущем.',
          delay: 1500,
        },
      ],
    },
  ],
};
