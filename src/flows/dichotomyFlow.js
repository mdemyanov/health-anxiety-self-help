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
          type: 'quote',
          content: 'Из всего существующего одно находится в нашей власти, другое — нет.',
          options: {
            author: 'Эпиктет',
          },
          delay: 800,
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
              'Мои мысли и отношение',
              'Мои действия и реакции',
              'Мои решения и выбор',
              'Как я забочусь о себе',
              'К кому обращаюсь за помощью',
              'Как трачу своё время',
            ],
            secondaryTitle: 'Не в моей власти',
            secondaryColor: 'var(--apple-red)',
            secondaryItems: [
              'Результаты медицинских обследований',
              'Мнения и действия других людей',
              'Прошлое и будущее',
              'Погода и внешние обстоятельства',
              'Ощущения в теле',
              'Когда придёт тревога',
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
          content: 'Если да — сосредоточь энергию на действиях.',
          delay: 1200,
        },
        {
          type: 'therapist-text',
          content: 'Если нет — практикуй принятие и отпусти.',
          delay: 1800,
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
          content: 'Помни: мудрость в том, чтобы различать эти две категории и действовать соответственно.',
          delay: 1500,
        },
      ],
    },
  ],
};
