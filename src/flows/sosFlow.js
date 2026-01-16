export const sosFlow = {
  id: 'sos',
  title: 'SOS-помощь',

  steps: [
    {
      id: 'welcome',
      messages: [
        {
          type: 'therapist-text',
          content: 'Ты не один. Я здесь, чтобы помочь.',
          delay: 0,
        },
        {
          type: 'therapist-text',
          content: 'Неважно, что вызвало тревогу — срочное совещание, сложное решение или беспокойство о здоровье. Мы справимся.',
          delay: 1000,
        },
        {
          type: 'therapist-text',
          content: 'Начнём с дыхания — это активирует парасимпатическую нервную систему и поможет телу успокоиться.',
          delay: 2000,
        },
      ],
    },
    {
      id: 'breathing',
      messages: [
        {
          type: 'therapist-text',
          content: 'Дыши со мной. Следуй за кругом: вдох когда он увеличивается, выдох когда уменьшается.',
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
      id: 'grounding-intro',
      messages: [
        {
          type: 'system',
          content: 'Дыхание завершено ✓',
          delay: 0,
        },
        {
          type: 'therapist-text',
          content: 'Отлично! Теперь давай заземлимся с помощью техники 5-4-3-2-1.',
          delay: 800,
        },
        {
          type: 'therapist-text',
          content: 'Эта техника поможет вернуться в настоящий момент — из мыслей о будущем или прошлом.',
          delay: 1500,
        },
      ],
    },
    {
      id: 'grounding-5',
      messages: [
        {
          type: 'therapist-text',
          content: 'Назови 5 вещей, которые ты ВИДИШЬ вокруг себя прямо сейчас.',
          delay: 500,
        },
        {
          type: 'repeated-input',
          options: {
            count: 5,
            placeholder: 'Я вижу...',
            statusHintTemplate: 'Напиши ещё {remaining}',
          },
          delay: 1000,
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
            statusHintTemplate: 'Напиши ещё {remaining}',
          },
          delay: 800,
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
            statusHintTemplate: 'Напиши ещё {remaining}',
          },
          delay: 800,
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
            statusHintTemplate: 'Напиши ещё {remaining}',
          },
          delay: 800,
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
            statusHintTemplate: 'Напиши ещё {remaining}',
          },
          delay: 800,
          awaitCompletion: true,
          saveAs: 'grounding1',
        },
      ],
    },
    {
      id: 'thoughts',
      messages: [
        {
          type: 'system',
          content: 'Заземление завершено ✓',
          delay: 0,
        },
        {
          type: 'therapist-text',
          content: 'Отлично! Теперь давай посмотрим на тревожные мысли.',
          delay: 800,
        },
        {
          type: 'therapist-text',
          content: 'Помни: мысль — это не факт. Это просто мысль.',
          delay: 1500,
        },
      ],
    },
    {
      id: 'dichotomy',
      messages: [
        {
          type: 'therapist-text',
          content: 'Раздели свои беспокойства на то, что ты можешь контролировать, и то, что нет.',
          delay: 500,
        },
        {
          type: 'checklist',
          options: {
            title: 'Могу контролировать',
            color: 'var(--apple-green)',
            items: [
              'Мои решения и действия',
              'Как я реагирую на ситуацию',
              'Качество моей подготовки',
              'К кому обращусь за помощью',
              'Как позабочусь о себе сегодня',
            ],
            secondaryTitle: 'Не могу контролировать',
            secondaryColor: 'var(--apple-red)',
            secondaryItems: [
              'Решения других людей',
              'Рыночная ситуация',
              'Прошлые ошибки',
              'Результаты, которые ещё не известны',
              'Мнение и реакции окружающих',
            ],
          },
          delay: 1000,
        },
      ],
    },
    {
      id: 'quote',
      messages: [
        {
          type: 'quote',
          content: 'Из всего существующего одно находится в нашей власти, другое — нет. В нашей власти — наши мнения, побуждения, желания. Не в нашей власти — тело, имущество, репутация.',
          options: { author: 'Эпиктет' },
          delay: 500,
        },
      ],
    },
    {
      id: 'complete',
      messages: [
        {
          type: 'therapist-text',
          content: 'Ты прошёл через это!',
          delay: 500,
        },
        {
          type: 'therapist-text',
          content: 'Помни: тревога временна. Она не определяет тебя и не предсказывает будущее.',
          delay: 1200,
        },
        {
          type: 'therapist-text',
          content: 'Каждый раз, когда ты это делаешь, ты тренируешь навык управления стрессом.',
          delay: 2000,
        },
      ],
    },
  ],
};
