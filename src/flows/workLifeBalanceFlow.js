export const workLifeBalanceFlow = {
  id: 'work-life-balance',
  title: 'Баланс работа-жизнь',

  steps: [
    {
      id: 'welcome',
      messages: [
        {
          type: 'therapist-text',
          content: 'Привет! Давай посмотрим на баланс между работой и жизнью.',
          delay: 0,
        },
        {
          type: 'therapist-text',
          content: 'Как руководитель, ты часто жертвуешь личным временем ради работы. Это нормально иногда, но не постоянно.',
          delay: 1000,
        },
      ],
    },
    {
      id: 'work-rating',
      messages: [
        {
          type: 'therapist-text',
          content: 'Оцени свою удовлетворённость в каждой сфере жизни.',
          delay: 500,
        },
        {
          type: 'therapist-text',
          content: 'Работа — насколько ты доволен профессиональной жизнью?',
          delay: 1200,
        },
        {
          type: 'slider',
          options: {
            min: 1,
            max: 10,
            unit: '',
            initialValue: 5,
          },
          delay: 1800,
          awaitCompletion: true,
          saveAs: 'work_rating',
        },
      ],
    },
    {
      id: 'family-rating',
      messages: [
        {
          type: 'therapist-text',
          content: 'Семья и отношения — сколько качественного времени ты уделяешь близким?',
          delay: 500,
        },
        {
          type: 'slider',
          options: {
            min: 1,
            max: 10,
            unit: '',
            initialValue: 5,
          },
          delay: 1200,
          awaitCompletion: true,
          saveAs: 'family_rating',
        },
      ],
    },
    {
      id: 'health-rating',
      messages: [
        {
          type: 'therapist-text',
          content: 'Здоровье — как ты заботишься о физическом и ментальном состоянии?',
          delay: 500,
        },
        {
          type: 'slider',
          options: {
            min: 1,
            max: 10,
            unit: '',
            initialValue: 5,
          },
          delay: 1200,
          awaitCompletion: true,
          saveAs: 'health_rating',
        },
      ],
    },
    {
      id: 'rest-rating',
      messages: [
        {
          type: 'therapist-text',
          content: 'Отдых и хобби — есть ли время для того, что приносит радость?',
          delay: 500,
        },
        {
          type: 'slider',
          options: {
            min: 1,
            max: 10,
            unit: '',
            initialValue: 5,
          },
          delay: 1200,
          awaitCompletion: true,
          saveAs: 'rest_rating',
        },
      ],
    },
    {
      id: 'focus-choice',
      messages: [
        {
          type: 'therapist-text',
          content: 'Теперь выбери одну сферу, на которой хочешь сфокусироваться на этой неделе.',
          delay: 500,
        },
        {
          type: 'checklist',
          options: {
            title: 'Область для фокуса',
            color: 'var(--apple-blue)',
            items: [
              'Работа — границы и эффективность',
              'Семья — качественное время вместе',
              'Здоровье — спорт, сон, питание',
              'Отдых — хобби и восстановление',
            ],
            showContinueButton: true,
          },
          delay: 1200,
          awaitCompletion: true,
          saveAs: 'focus_area',
        },
      ],
    },
    {
      id: 'obstacle',
      messages: [
        {
          type: 'therapist-question',
          content: 'Что мешает тебе уделять больше времени этой сфере?',
          delay: 500,
          awaitInput: true,
          inputPlaceholder: 'Мне мешает...',
          saveAs: 'obstacle',
          multiline: true,
        },
      ],
    },
    {
      id: 'dichotomy',
      messages: [
        {
          type: 'quote',
          content: 'Не то, что происходит с тобой, а как ты реагируешь — это в твоей власти.',
          options: { author: 'Эпиктет' },
          delay: 500,
        },
        {
          type: 'therapist-question',
          content: 'Что из этого в твоей власти изменить прямо сейчас?',
          delay: 1500,
          awaitInput: true,
          inputPlaceholder: 'В моей власти...',
          saveAs: 'in_control',
          multiline: true,
        },
      ],
    },
    {
      id: 'one-step',
      messages: [
        {
          type: 'therapist-text',
          content: 'Отлично! Теперь самое важное — один конкретный шаг.',
          delay: 500,
        },
        {
          type: 'therapist-question',
          content: 'Какое одно действие ты сделаешь на этой неделе для улучшения баланса?',
          delay: 1200,
          awaitInput: true,
          inputPlaceholder: 'На этой неделе я...',
          saveAs: 'one_step',
          multiline: true,
        },
      ],
    },
    {
      id: 'feedback',
      messages: [
        {
          type: 'therapist-text',
          content: 'Ты определился с приоритетом и конкретным шагом. Это уже большой прогресс!',
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
          type: 'quote',
          content: 'Богатство состоит не в обилии имущества, а в малочисленности желаний.',
          options: { author: 'Эпиктет' },
          delay: 500,
        },
        {
          type: 'system',
          content: 'План сохранён ✓',
          delay: 1200,
        },
      ],
      onComplete: (data) => {
        const entries = JSON.parse(localStorage.getItem('balance-entries') || '[]');
        entries.unshift({
          date: new Date().toISOString(),
          work_rating: data.work_rating,
          family_rating: data.family_rating,
          health_rating: data.health_rating,
          rest_rating: data.rest_rating,
          focus_area: data.focus_area,
          obstacle: data.obstacle,
          in_control: data.in_control,
          one_step: data.one_step,
          feedback: data.feedback,
        });
        localStorage.setItem('balance-entries', JSON.stringify(entries.slice(0, 20)));
      },
    },
  ],
};
