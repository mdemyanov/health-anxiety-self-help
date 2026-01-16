export const doubleStandardFlow = {
  id: 'double-standard',
  title: 'Двойной стандарт',
  saveKey: 'double-standard-entries',

  steps: [
    {
      id: 'intro',
      messages: [
        {
          type: 'therapist-text',
          content: 'Привет! Сейчас мы используем технику "Двойной стандарт".',
          delay: 0,
        },
        {
          type: 'therapist-text',
          content: 'Мы часто критикуем себя гораздо жёстче, чем других людей. Давай это проверим.',
          delay: 800,
        },
      ],
    },
    {
      id: 'self-criticism',
      messages: [
        {
          type: 'therapist-question',
          content: 'За что ты сейчас критикуешь себя? Опиши самокритичную мысль.',
          delay: 500,
          awaitInput: true,
          inputPlaceholder: 'Например: я плохой руководитель, я не справляюсь с командой, я подвёл инвесторов...',
          saveAs: 'selfCriticism',
          multiline: true,
        },
      ],
    },
    {
      id: 'situation',
      messages: [
        {
          type: 'therapist-question',
          content: 'Какая ситуация вызвала эту мысль?',
          delay: 500,
          awaitInput: true,
          inputPlaceholder: 'Например: проект сорвал дедлайн, потеряли клиента, конфликт в команде...',
          saveAs: 'situation',
          multiline: true,
        },
      ],
    },
    {
      id: 'imagine-friend',
      messages: [
        {
          type: 'therapist-text',
          content: 'А теперь представь: к тебе приходит твой коллега — такой же руководитель — с точно такой же проблемой.',
          delay: 500,
        },
        {
          type: 'therapist-text',
          content: 'Он описывает ту же ситуацию и говорит: "Я плохой руководитель".',
          delay: 1200,
        },
        {
          type: 'quote',
          content: 'Относись к себе так, как отнёсся бы к хорошему другу.',
          options: { author: 'Дэвид Бёрнс' },
          delay: 2000,
        },
      ],
    },
    {
      id: 'response-to-friend',
      messages: [
        {
          type: 'therapist-question',
          content: 'Что бы ты сказал этому коллеге? Как бы поддержал его?',
          delay: 500,
          awaitInput: true,
          inputPlaceholder: 'Я бы сказал ему...',
          saveAs: 'friendResponse',
          multiline: true,
        },
      ],
    },
    {
      id: 'notice-difference',
      messages: [
        {
          type: 'therapist-text',
          content: 'Заметь разницу. Ты наверняка был гораздо мягче и конструктивнее с воображаемым коллегой, чем с собой.',
          delay: 500,
        },
        {
          type: 'therapist-text',
          content: 'Почему ты заслуживаешь меньше сочувствия, чем другие?',
          delay: 1200,
        },
      ],
    },
    {
      id: 'apply-to-self',
      messages: [
        {
          type: 'therapist-question',
          content: 'Теперь примени этот же сострадательный ответ к себе. Перепиши свою самокритику в поддерживающую форму.',
          delay: 500,
          awaitInput: true,
          inputPlaceholder: 'Более справедливый взгляд на себя...',
          saveAs: 'compassionateResponse',
          multiline: true,
        },
      ],
    },
    {
      id: 'action',
      messages: [
        {
          type: 'therapist-question',
          content: 'Что ты можешь сделать прямо сейчас — не из самокритики, а из заботы о себе и своём деле?',
          delay: 500,
          awaitInput: true,
          inputPlaceholder: 'Мой следующий шаг...',
          saveAs: 'action',
          multiline: true,
        },
      ],
    },
    {
      id: 'complete',
      messages: [
        {
          type: 'therapist-text',
          content: 'Отлично! Ты только что применил к себе тот же стандарт, что и к другим.',
          delay: 500,
        },
        {
          type: 'quote',
          content: 'Истинный царь тот, кто умеет царствовать над собой.',
          options: { author: 'Сенека' },
          delay: 1200,
        },
        {
          type: 'therapist-text',
          content: 'Самокритика редко помогает стать лучше. А вот честный, но сострадательный взгляд — помогает.',
          delay: 2200,
        },
        {
          type: 'system',
          content: 'Запись сохранена ✓',
          delay: 3000,
        },
      ],
      onComplete: (data) => {
        const entries = JSON.parse(localStorage.getItem('double-standard-entries') || '[]');
        entries.unshift({
          id: Date.now(),
          date: new Date().toISOString(),
          selfCriticism: data.selfCriticism,
          situation: data.situation,
          friendResponse: data.friendResponse,
          compassionateResponse: data.compassionateResponse,
          action: data.action,
        });
        localStorage.setItem('double-standard-entries', JSON.stringify(entries));
      },
    },
  ],
};
