export const viewFromAboveFlow = {
  id: 'view-from-above',
  title: 'Взгляд сверху',

  steps: [
    {
      id: 'intro',
      messages: [
        {
          type: 'therapist-text',
          content: 'Давай выполним медитацию "Взгляд сверху".',
          delay: 0,
        },
        {
          type: 'therapist-text',
          content: 'Эта практика поможет увидеть свои проблемы в масштабе вселенной.',
          delay: 800,
        },
        {
          type: 'therapist-text',
          content: 'Закрой глаза и следуй за моими указаниями.',
          delay: 1600,
        },
      ],
    },
    {
      id: 'room',
      messages: [
        {
          type: 'therapist-text',
          content: 'Представь себя сверху. Ты видишь комнату, в которой находишься.',
          delay: 500,
        },
        {
          type: 'timer',
          options: { duration: 15 },
          delay: 1200,
          awaitCompletion: true,
        },
      ],
    },
    {
      id: 'building',
      messages: [
        {
          type: 'therapist-text',
          content: 'Поднимись выше. Ты видишь всё здание целиком.',
          delay: 500,
        },
        {
          type: 'timer',
          options: { duration: 15 },
          delay: 1200,
          awaitCompletion: true,
        },
      ],
    },
    {
      id: 'city',
      messages: [
        {
          type: 'therapist-text',
          content: 'Ещё выше. Ты видишь весь город — улицы, дома, людей.',
          delay: 500,
        },
        {
          type: 'timer',
          options: { duration: 20 },
          delay: 1200,
          awaitCompletion: true,
        },
      ],
    },
    {
      id: 'country',
      messages: [
        {
          type: 'therapist-text',
          content: 'Поднимись ещё выше. Ты видишь всю страну — города, реки, леса.',
          delay: 500,
        },
        {
          type: 'timer',
          options: { duration: 20 },
          delay: 1200,
          awaitCompletion: true,
        },
      ],
    },
    {
      id: 'earth',
      messages: [
        {
          type: 'therapist-text',
          content: 'Теперь ты в космосе. Ты видишь Землю — голубой шар в бесконечности.',
          delay: 500,
        },
        {
          type: 'therapist-text',
          content: '7 миллиардов людей. Каждый со своими заботами и радостями.',
          delay: 1500,
        },
        {
          type: 'timer',
          options: { duration: 25 },
          delay: 2500,
          awaitCompletion: true,
        },
      ],
    },
    {
      id: 'universe',
      messages: [
        {
          type: 'therapist-text',
          content: 'Ещё дальше. Земля становится точкой среди миллиардов звёзд.',
          delay: 500,
        },
        {
          type: 'therapist-text',
          content: 'Бесконечная вселенная. Миллиарды галактик.',
          delay: 1500,
        },
        {
          type: 'timer',
          options: { duration: 20 },
          delay: 2500,
          awaitCompletion: true,
        },
      ],
    },
    {
      id: 'return',
      messages: [
        {
          type: 'therapist-text',
          content: 'Теперь медленно вернись обратно.',
          delay: 500,
        },
        {
          type: 'therapist-text',
          content: 'Галактика... Солнечная система... Земля... Страна... Город... Здание... Комната...',
          delay: 1200,
        },
        {
          type: 'therapist-text',
          content: 'Ты снова здесь, в своём теле.',
          delay: 2500,
        },
        {
          type: 'timer',
          options: { duration: 15 },
          delay: 3200,
          awaitCompletion: true,
        },
      ],
    },
    {
      id: 'complete',
      messages: [
        {
          type: 'therapist-text',
          content: 'Открой глаза.',
          delay: 500,
        },
        {
          type: 'quote',
          content: 'Посмотри на своё беспокойство с этой перспективы. Насколько оно значимо в масштабе вселенной?',
          delay: 1500,
        },
        {
          type: 'therapist-text',
          content: 'Практика завершена. Помни об этой перспективе, когда тревога накрывает.',
          delay: 3000,
        },
      ],
    },
  ],
};
