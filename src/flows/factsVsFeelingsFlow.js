export const factsVsFeelingsFlow = {
  id: 'facts-vs-feelings',
  title: 'Факты vs Чувства',
  saveKey: 'facts-vs-feelings-entries',

  steps: [
    {
      id: 'intro',
      messages: [
        {
          type: 'therapist-text',
          content: 'Сейчас мы разделим факты и чувства.',
          delay: 0,
        },
        {
          type: 'therapist-text',
          content: 'Часто мы путаем свои интерпретации с реальностью. Эта техника поможет увидеть разницу.',
          delay: 800,
        },
        {
          type: 'quote',
          content: 'Не вещи беспокоят нас, а наши суждения о вещах.',
          options: { author: 'Эпиктет' },
          delay: 1600,
        },
      ],
    },
    {
      id: 'situation',
      messages: [
        {
          type: 'therapist-question',
          content: 'Опиши ситуацию, которая тебя беспокоит.',
          delay: 500,
          awaitInput: true,
          inputPlaceholder: 'Например: совещание прошло плохо, клиент недоволен, сотрудник опоздал...',
          saveAs: 'situation',
          multiline: true,
        },
      ],
    },
    {
      id: 'feelings',
      messages: [
        {
          type: 'therapist-question',
          content: 'Что ты чувствуешь по поводу этой ситуации? Какие эмоции возникают?',
          delay: 500,
          awaitInput: true,
          inputPlaceholder: 'Я чувствую тревогу, злость, разочарование...',
          saveAs: 'feelings',
          multiline: true,
        },
      ],
    },
    {
      id: 'thoughts',
      messages: [
        {
          type: 'therapist-question',
          content: 'Какие мысли приходят в голову? Как ты интерпретируешь ситуацию?',
          delay: 500,
          awaitInput: true,
          inputPlaceholder: 'Я думаю, что это значит...',
          saveAs: 'thoughts',
          multiline: true,
        },
      ],
    },
    {
      id: 'facts-only',
      messages: [
        {
          type: 'therapist-text',
          content: 'Теперь самое важное. Давай выделим только факты.',
          delay: 500,
        },
        {
          type: 'quote',
          content: 'Правила для фактов:',
          options: {
            items: [
              'Это можно записать на камеру?',
              'Все свидетели согласятся с этим?',
              'Это не содержит оценочных слов (плохо, ужасно, провал)?',
              'Это не предположение о чужих мыслях?',
            ],
          },
          delay: 1000,
        },
        {
          type: 'therapist-question',
          content: 'Перепиши ситуацию, оставив только объективные факты. Без интерпретаций.',
          delay: 2000,
          awaitInput: true,
          inputPlaceholder: 'Только факты: что, когда, кто сказал дословно...',
          saveAs: 'factsOnly',
          multiline: true,
        },
      ],
    },
    {
      id: 'compare',
      messages: [
        {
          type: 'therapist-text',
          content: 'Давай сравним.',
          delay: 500,
        },
        {
          type: 'comparison',
          options: {
            type: 'text',
            before: { label: 'Твои мысли', valueKey: 'thoughts' },
            after: { label: 'Только факты', valueKey: 'factsOnly' },
          },
          delay: 1000,
        },
        {
          type: 'therapist-text',
          content: 'Видишь разницу? Многое из того, что казалось реальным — это интерпретация, а не факт.',
          delay: 2500,
        },
      ],
    },
    {
      id: 'alternative',
      messages: [
        {
          type: 'therapist-question',
          content: 'Какие ещё есть объяснения этих фактов? Может быть, не такие негативные?',
          delay: 500,
          awaitInput: true,
          inputPlaceholder: 'Другие возможные объяснения...',
          saveAs: 'alternative',
          multiline: true,
        },
      ],
    },
    {
      id: 'feeling-check',
      messages: [
        {
          type: 'therapist-text',
          content: 'Как изменились твои чувства после разделения фактов и интерпретаций?',
          delay: 500,
        },
        {
          type: 'slider',
          options: { min: 0, max: 100, unit: '%', initialValue: 50, label: 'Уровень тревоги' },
          delay: 1000,
          awaitCompletion: true,
          saveAs: 'anxietyLevel',
        },
      ],
    },
    {
      id: 'complete',
      messages: [
        {
          type: 'therapist-text',
          content: 'Отлично! Ты отделил факты от чувств.',
          delay: 500,
        },
        {
          type: 'quote',
          content: 'Если тебя что-то внешнее огорчает — дело не в этой вещи, а в твоём суждении о ней.',
          options: { author: 'Марк Аврелий' },
          delay: 1200,
        },
        {
          type: 'therapist-text',
          content: 'Эта техника помогает не принимать свои мысли за реальность и сохранять объективность.',
          delay: 2200,
        },
        {
          type: 'system',
          content: 'Запись сохранена ✓',
          delay: 3000,
        },
      ],
      onComplete: (data) => {
        const entries = JSON.parse(localStorage.getItem('facts-vs-feelings-entries') || '[]');
        entries.unshift({
          id: Date.now(),
          date: new Date().toISOString(),
          situation: data.situation,
          feelings: data.feelings,
          thoughts: data.thoughts,
          factsOnly: data.factsOnly,
          alternative: data.alternative,
          anxietyLevel: data.anxietyLevel,
        });
        localStorage.setItem('facts-vs-feelings-entries', JSON.stringify(entries));
      },
    },
  ],
};
