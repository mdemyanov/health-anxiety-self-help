export const decatastrophizeFlow = {
  id: 'decatastrophize',
  title: 'Декатастрофизация',

  steps: [
    {
      id: 'intro',
      messages: [
        {
          type: 'therapist-text',
          content: 'Давай разберём твой страх по шагам.',
          delay: 0,
        },
        {
          type: 'therapist-text',
          content: 'Эта техника поможет увидеть ситуацию более реалистично — будь то рабочий кризис, беспокойство о здоровье или семейные тревоги.',
          delay: 800,
        },
      ],
    },
    {
      id: 'fear',
      messages: [
        {
          type: 'therapist-question',
          content: 'Чего ты боишься? Опиши свой страх или тревожную мысль.',
          delay: 500,
          awaitInput: true,
          inputPlaceholder: 'Например: провал проекта, потеря клиента, проблемы со здоровьем...',
          saveAs: 'fear',
          multiline: true,
        },
      ],
    },
    {
      id: 'initial-probability',
      messages: [
        {
          type: 'therapist-text',
          content: 'Понял. Теперь оцени вероятность.',
          delay: 500,
        },
        {
          type: 'therapist-text',
          content: 'Насколько вероятно, что твой страх сбудется?',
          delay: 1000,
        },
        {
          type: 'slider',
          options: { min: 0, max: 100, unit: '%', initialValue: 50 },
          delay: 1500,
          awaitCompletion: true,
          saveAs: 'probability',
        },
      ],
    },
    {
      id: 'evidence-for',
      messages: [
        {
          type: 'therapist-question',
          content: 'Какие факты ПОДТВЕРЖДАЮТ твой страх?',
          delay: 500,
          awaitInput: true,
          inputPlaceholder: 'Факты за...',
          saveAs: 'evidence_for',
          multiline: true,
        },
      ],
    },
    {
      id: 'evidence-against',
      messages: [
        {
          type: 'therapist-question',
          content: 'А какие факты ОПРОВЕРГАЮТ твой страх?',
          delay: 500,
          awaitInput: true,
          inputPlaceholder: 'Факты против...',
          saveAs: 'evidence_against',
          multiline: true,
        },
      ],
    },
    {
      id: 'worst-case',
      messages: [
        {
          type: 'therapist-question',
          content: 'Каков ХУДШИЙ сценарий? Что самое плохое может случиться?',
          delay: 500,
          awaitInput: true,
          inputPlaceholder: 'В худшем случае...',
          saveAs: 'worst_case',
          multiline: true,
        },
      ],
    },
    {
      id: 'coping',
      messages: [
        {
          type: 'therapist-question',
          content: 'Если худший сценарий случится — как ты справишься? Какие у тебя есть ресурсы?',
          delay: 500,
          awaitInput: true,
          inputPlaceholder: 'Я смогу справиться, потому что...',
          saveAs: 'coping',
          multiline: true,
        },
      ],
    },
    {
      id: 'best-case',
      messages: [
        {
          type: 'therapist-question',
          content: 'А каков ЛУЧШИЙ сценарий?',
          delay: 500,
          awaitInput: true,
          inputPlaceholder: 'В лучшем случае...',
          saveAs: 'best_case',
          multiline: true,
        },
      ],
    },
    {
      id: 'realistic',
      messages: [
        {
          type: 'therapist-question',
          content: 'Каков РЕАЛИСТИЧНЫЙ сценарий? Что, скорее всего, произойдёт?',
          delay: 500,
          awaitInput: true,
          inputPlaceholder: 'Скорее всего...',
          saveAs: 'realistic',
          multiline: true,
        },
      ],
    },
    {
      id: 'reassess',
      messages: [
        {
          type: 'therapist-text',
          content: 'Теперь, после анализа, переоцени вероятность.',
          delay: 500,
        },
        {
          type: 'slider',
          options: { min: 0, max: 100, unit: '%', initialValue: 30 },
          delay: 1000,
          awaitCompletion: true,
          saveAs: 'new_probability',
        },
      ],
    },
    {
      id: 'result',
      messages: [
        {
          type: 'therapist-text',
          content: 'Посмотри на результат:',
          delay: 500,
        },
        {
          type: 'comparison',
          options: {
            type: 'numeric',
            before: { label: 'До анализа', valueKey: 'probability' },
            after: { label: 'После анализа', valueKey: 'new_probability' },
          },
          delay: 1000,
        },
        {
          type: 'quote',
          content: 'Мы страдаем чаще в воображении, чем в реальности.',
          options: { author: 'Сенека' },
          delay: 2500,
        },
      ],
    },
    {
      id: 'feedback',
      messages: [
        {
          type: 'therapist-text',
          content: 'Анализ помогает отделить реальные риски от воображаемых катастроф.',
          delay: 500,
        },
        {
          type: 'feedback',
          delay: 1000,
          saveAs: 'feedback',
          options: {
            moodLabel: 'Как ты себя сейчас чувствуешь?',
            ratingLabel: 'Насколько полезной была практика?',
          },
        },
      ],
    },
    {
      id: 'complete',
      messages: [
        {
          type: 'system',
          content: 'Запись сохранена ✓',
          delay: 500,
        },
      ],
      onComplete: (data) => {
        const entries = JSON.parse(localStorage.getItem('decatastrophize-entries') || '[]');
        entries.unshift({
          id: Date.now(),
          date: new Date().toISOString(),
          situation: data.situation,
          probability: data.probability,
          worst_case: data.worst_case,
          coping: data.coping,
          best_case: data.best_case,
          realistic: data.realistic,
          new_probability: data.new_probability,
          feedback: data.feedback,
        });
        localStorage.setItem('decatastrophize-entries', JSON.stringify(entries));
      },
    },
  ],
};
