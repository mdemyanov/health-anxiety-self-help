export const tripleColumnFlow = {
  id: 'triple-column',
  title: 'Три колонки',
  saveKey: 'triple-column-entries',

  steps: [
    {
      id: 'intro',
      messages: [
        {
          type: 'therapist-text',
          content: 'Сейчас мы используем "Технику трёх колонок" из книги Дэвида Бёрнса.',
          delay: 0,
        },
        {
          type: 'therapist-text',
          content: 'Это один из самых мощных инструментов КПТ: мы запишем мысль, найдём искажение и сформулируем рациональный ответ.',
          delay: 800,
        },
      ],
    },
    {
      id: 'automatic-thought',
      messages: [
        {
          type: 'therapist-text',
          content: 'Колонка 1: Автоматическая мысль',
          delay: 500,
        },
        {
          type: 'therapist-question',
          content: 'Какая негативная мысль тебя беспокоит? Запиши её точно так, как она звучит в голове.',
          delay: 1000,
          awaitInput: true,
          inputPlaceholder: 'Например: я никогда не справлюсь с этим проектом, меня уволят, команда меня не уважает...',
          saveAs: 'automaticThought',
          multiline: true,
        },
      ],
    },
    {
      id: 'distortion',
      messages: [
        {
          type: 'therapist-text',
          content: 'Колонка 2: Когнитивное искажение',
          delay: 500,
        },
        {
          type: 'therapist-text',
          content: 'Давай определим, какие ловушки мышления здесь присутствуют.',
          delay: 1000,
        },
        {
          type: 'checklist',
          options: {
            title: 'Отметь искажения в своей мысли',
            color: 'var(--apple-orange)',
            items: [
              'Чёрно-белое мышление — "всё или ничего"',
              'Сверхобобщение — "всегда", "никогда"',
              'Негативный фильтр — фокус только на плохом',
              'Обесценивание позитивного — "это не считается"',
              'Чтение мыслей — "он думает, что я..."',
              'Предсказание будущего — "точно будет плохо"',
              'Катастрофизация — "это конец всему"',
              'Эмоциональное обоснование — "чувствую = правда"',
              'Долженствования — "я должен", "они должны"',
              'Навешивание ярлыков — "я неудачник"',
            ],
          },
          delay: 1500,
          saveAs: 'distortions',
        },
      ],
    },
    {
      id: 'explain-distortion',
      messages: [
        {
          type: 'therapist-question',
          content: 'Объясни своими словами: почему эта мысль — искажение, а не факт?',
          delay: 500,
          awaitInput: true,
          inputPlaceholder: 'Это искажение, потому что...',
          saveAs: 'distortionExplanation',
          multiline: true,
        },
      ],
    },
    {
      id: 'rational-response',
      messages: [
        {
          type: 'therapist-text',
          content: 'Колонка 3: Рациональный ответ',
          delay: 500,
        },
        {
          type: 'quote',
          content: 'Вопросы для размышления:',
          options: {
            items: [
              'Какие есть факты за и против этой мысли?',
              'Как бы я посмотрел на это через год?',
              'Что бы сказал мой наставник?',
              'Какова вероятность худшего сценария?',
              'Что я скажу себе, если справлюсь?',
            ],
          },
          delay: 1000,
        },
        {
          type: 'therapist-question',
          content: 'Сформулируй более реалистичную, сбалансированную мысль.',
          delay: 2000,
          awaitInput: true,
          inputPlaceholder: 'Более реалистичный взгляд...',
          saveAs: 'rationalResponse',
          multiline: true,
        },
      ],
    },
    {
      id: 'belief-rating',
      messages: [
        {
          type: 'therapist-text',
          content: 'Насколько ты теперь веришь в изначальную негативную мысль?',
          delay: 500,
        },
        {
          type: 'slider',
          options: { min: 0, max: 100, unit: '%', initialValue: 50, leftLabel: 'Совсем не верю', rightLabel: 'Полностью верю' },
          delay: 1000,
          awaitCompletion: true,
          saveAs: 'beliefRating',
        },
      ],
    },
    {
      id: 'complete',
      messages: [
        {
          type: 'therapist-text',
          content: 'Отлично! Ты разобрал мысль на три колонки.',
          delay: 500,
        },
        {
          type: 'comparison',
          options: {
            type: 'text',
            before: { label: 'Автоматическая мысль', valueKey: 'automaticThought' },
            after: { label: 'Рациональный ответ', valueKey: 'rationalResponse' },
          },
          delay: 1000,
        },
        {
          type: 'quote',
          content: 'Счастье твоей жизни зависит от качества твоих мыслей.',
          options: { author: 'Марк Аврелий' },
          delay: 2500,
        },
        {
          type: 'therapist-text',
          content: 'Регулярная практика этой техники постепенно меняет автоматические мысли.',
          delay: 3500,
        },
        {
          type: 'system',
          content: 'Запись сохранена ✓',
          delay: 4300,
        },
      ],
      onComplete: (data) => {
        const entries = JSON.parse(localStorage.getItem('triple-column-entries') || '[]');
        entries.unshift({
          id: Date.now(),
          date: new Date().toISOString(),
          automaticThought: data.automaticThought,
          distortions: data.distortions,
          distortionExplanation: data.distortionExplanation,
          rationalResponse: data.rationalResponse,
          beliefRating: data.beliefRating,
        });
        localStorage.setItem('triple-column-entries', JSON.stringify(entries));
      },
    },
  ],
};
