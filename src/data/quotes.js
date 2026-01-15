export const quotes = [
  { id: 1, text: "Не позволяй будущему тревожить тебя. Ты встретишь его с тем же разумом, который служит тебе сейчас.", author: "Марк Аврелий" },
  { id: 2, text: "Не вещи беспокоят нас, а наши суждения о вещах.", author: "Эпиктет" },
  { id: 3, text: "Мы страдаем чаще в воображении, чем в реальности.", author: "Сенека" },
  { id: 4, text: "Единственное, что ты должен защищать и хранить — это свой разум.", author: "Марк Аврелий" },
  { id: 5, text: "Трудности укрепляют ум, как труд укрепляет тело.", author: "Сенека" },
  { id: 6, text: "Очень скоро ты забудешь всё; и всё, в свою очередь, забудет тебя.", author: "Марк Аврелий" },
  { id: 7, text: "Утром, когда тебе не хочется вставать, скажи себе: я просыпаюсь, чтобы делать работу человека.", author: "Марк Аврелий" },
  { id: 8, text: "Из всего, что существует, одни вещи зависят от нас, другие — нет.", author: "Эпиктет" },
  { id: 9, text: "Болезнь — препятствие для тела, но не для воли, если она сама того не захочет.", author: "Эпиктет" },
  { id: 10, text: "Требуй от себя не успеха, а лишь того, чтобы действовать правильно.", author: "Эпиктет" },
  { id: 11, text: "Судьба ведёт согласного, несогласного тащит.", author: "Сенека" },
  { id: 12, text: "Пока мы откладываем жизнь, она проходит.", author: "Сенека" },
  { id: 13, text: "Если тебя что-то внешнее огорчает — дело не в этой вещи, а в твоём суждении о ней.", author: "Марк Аврелий" },
  { id: 14, text: "Счастье твоей жизни зависит от качества твоих мыслей.", author: "Марк Аврелий" },
  { id: 15, text: "Не тот беден, кто мало имеет, а тот, кто желает большего.", author: "Сенека" },
];

export function getRandomQuote() {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

export function getQuoteOfDay() {
  const today = new Date().toDateString();
  const savedDate = localStorage.getItem('quoteOfDayDate');
  const savedQuoteId = localStorage.getItem('quoteOfDayId');

  if (savedDate === today && savedQuoteId) {
    const quote = quotes.find(q => q.id === parseInt(savedQuoteId));
    if (quote) return quote;
  }

  const quote = getRandomQuote();
  localStorage.setItem('quoteOfDayDate', today);
  localStorage.setItem('quoteOfDayId', String(quote.id));
  return quote;
}
