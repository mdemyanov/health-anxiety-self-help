export const dichotomyFlow = {
  id: 'dichotomy',
  title: 'Дихотомия контроля',

  steps: [
    {
      id: 'intro',
      messages: [
        {
          type: 'therapist-text',
          content: 'Давай разберёмся, что в твоей власти, а что нет.',
          delay: 0,
        },
        {
          type: 'therapist-text',
          content: 'Это главный принцип стоиков — и один из самых полезных инструментов для руководителя.',
          delay: 800,
        },
        {
          type: 'quote',
          content: 'Из всего существующего одно находится в нашей власти, другое — нет.',
          options: {
            author: 'Эпиктет',
          },
          delay: 1600,
        },
      ],
    },
    {
      id: 'exercise',
      messages: [
        {
          type: 'therapist-text',
          content: 'Отметь, какие вещи ты можешь контролировать, а какие нет.',
          delay: 500,
        },
        {
          type: 'checklist',
          options: {
            title: 'В моей власти',
            color: 'var(--apple-green)',
            items: [
              'Мои решения и действия',
              'Качество моей работы',
              'Как я реагирую на ситуации',
              'С кем и как я общаюсь',
              'Как распределяю своё время',
              'Забота о здоровье и отдыхе',
            ],
            secondaryTitle: 'Не в моей власти',
            secondaryColor: 'var(--apple-red)',
            secondaryItems: [
              'Решения инвесторов и клиентов',
              'Рыночная ситуация и экономика',
              'Действия конкурентов',
              'Мнения и реакции других людей',
              'Прошлые ошибки',
              'Результаты, которые ещё не известны',
            ],
          },
          delay: 1000,
        },
      ],
    },
    {
      id: 'custom',
      messages: [
        {
          type: 'therapist-question',
          content: 'Что тебя беспокоит сейчас?',
          delay: 500,
          awaitInput: true,
          inputPlaceholder: 'Меня беспокоит...',
          saveAs: 'worry',
          multiline: true,
        },
      ],
    },
    {
      id: 'reflect',
      messages: [
        {
          type: 'therapist-text',
          content: 'Подумай: это в твоей власти или нет?',
          delay: 500,
        },
        {
          type: 'therapist-text',
          content: 'Если да — сосредоточь энергию на действиях. Что конкретно ты можешь сделать?',
          delay: 1200,
        },
        {
          type: 'therapist-text',
          content: 'Если нет — практикуй принятие. Тревога о неконтролируемом только истощает ресурсы.',
          delay: 2000,
        },
      ],
    },
    {
      id: 'action',
      messages: [
        {
          type: 'therapist-question',
          content: 'Какой один шаг ты можешь сделать прямо сейчас в том, что в твоей власти?',
          delay: 500,
          awaitInput: true,
          inputPlaceholder: 'Я могу...',
          saveAs: 'action',
          multiline: true,
        },
      ],
    },
    {
      id: 'summary',
      messages: [
        {
          type: 'quote',
          content: 'Не требуй, чтобы всё происходило так, как ты хочешь. Желай, чтобы всё происходило так, как происходит, и будешь счастлив.',
          options: {
            author: 'Эпиктет',
          },
          delay: 500,
        },
        {
          type: 'therapist-text',
          content: 'Мудрость руководителя — в умении различать эти две категории и направлять энергию туда, где она имеет значение.',
          delay: 1500,
        },
      ],
    },
  ],
};
