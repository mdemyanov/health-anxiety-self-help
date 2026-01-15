export const stopPauseFlow = {
  id: 'stop-pause',
  title: 'СТОП-пауза',

  steps: [
    {
      id: 'intro',
      messages: [
        {
          type: 'therapist-text',
          content: 'Сделаем паузу. Техника СТОП поможет прервать цикл тревоги.',
          delay: 0,
        },
      ],
    },
    {
      id: 'S',
      messages: [
        {
          type: 'therapist-text',
          content: 'Первый шаг — С (Стоп).',
          delay: 500,
        },
        {
          type: 'therapist-text',
          content: 'Остановись. Прекрати то, что ты делаешь. Замри на мгновение.',
          delay: 1200,
        },
        {
          type: 'timer',
          options: { duration: 10 },
          delay: 1800,
          awaitCompletion: true,
        },
      ],
    },
    {
      id: 'T',
      messages: [
        {
          type: 'system',
          content: 'Таймер завершён ✓',
          delay: 0,
        },
        {
          type: 'therapist-text',
          content: 'Отлично! Следующий шаг — Т (Тело).',
          delay: 600,
        },
        {
          type: 'therapist-text',
          content: 'Обрати внимание на своё тело. Где ты чувствуешь напряжение? Расслабь плечи, разожми челюсть, расслабь руки.',
          delay: 1200,
        },
        {
          type: 'timer',
          options: { duration: 15 },
          delay: 2000,
          awaitCompletion: true,
        },
      ],
    },
    {
      id: 'O',
      messages: [
        {
          type: 'system',
          content: 'Таймер завершён ✓',
          delay: 0,
        },
        {
          type: 'therapist-text',
          content: 'Хорошо! Теперь — О (Осознание).',
          delay: 600,
        },
        {
          type: 'therapist-text',
          content: 'Осознай свои мысли. Просто наблюдай за ними, не оценивая. Мысли приходят и уходят.',
          delay: 1200,
        },
        {
          type: 'timer',
          options: { duration: 15 },
          delay: 2000,
          awaitCompletion: true,
        },
      ],
    },
    {
      id: 'P',
      messages: [
        {
          type: 'system',
          content: 'Таймер завершён ✓',
          delay: 0,
        },
        {
          type: 'therapist-text',
          content: 'Последний шаг — П (Продолжай).',
          delay: 600,
        },
        {
          type: 'therapist-text',
          content: 'Теперь можешь продолжить свой день с новым осознанием.',
          delay: 1200,
        },
        {
          type: 'therapist-text',
          content: 'Выбери одно маленькое действие, которое сделаешь прямо сейчас.',
          delay: 1800,
        },
      ],
    },
    {
      id: 'complete',
      messages: [
        {
          type: 'therapist-text',
          content: 'Ты справился! СТОП-пауза завершена.',
          delay: 500,
        },
      ],
    },
  ],
};
