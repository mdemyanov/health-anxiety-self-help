import { describe, it, expect, vi, beforeEach } from 'vitest';
import { quotes, getRandomQuote, getQuoteOfDay } from '../quotes';

describe('quotes data', () => {
  describe('quotes array', () => {
    it('should contain 15 quotes', () => {
      expect(quotes).toHaveLength(15);
    });

    it('should have unique IDs', () => {
      const ids = quotes.map((q) => q.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(quotes.length);
    });

    it('should have required fields on each quote', () => {
      quotes.forEach((quote) => {
        expect(quote).toHaveProperty('id');
        expect(quote).toHaveProperty('text');
        expect(quote).toHaveProperty('author');
        expect(typeof quote.id).toBe('number');
        expect(typeof quote.text).toBe('string');
        expect(typeof quote.author).toBe('string');
      });
    });

    it('should have non-empty text and author', () => {
      quotes.forEach((quote) => {
        expect(quote.text.length).toBeGreaterThan(0);
        expect(quote.author.length).toBeGreaterThan(0);
      });
    });

    it('should have IDs from 1 to 15', () => {
      const ids = quotes.map((q) => q.id).sort((a, b) => a - b);
      expect(ids).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
    });

    it('should contain quotes from Stoic philosophers', () => {
      const authors = new Set(quotes.map((q) => q.author));
      expect(authors.has('Марк Аврелий')).toBe(true);
      expect(authors.has('Сенека')).toBe(true);
      expect(authors.has('Эпиктет')).toBe(true);
    });
  });

  describe('getRandomQuote', () => {
    it('should return a quote from the quotes array', () => {
      const quote = getRandomQuote();
      expect(quotes).toContainEqual(quote);
    });

    it('should return an object with id, text, and author', () => {
      const quote = getRandomQuote();
      expect(quote).toHaveProperty('id');
      expect(quote).toHaveProperty('text');
      expect(quote).toHaveProperty('author');
    });

    it('should return different quotes on multiple calls (statistical)', () => {
      const results = new Set();
      // Call 50 times and expect at least 2 different results
      for (let i = 0; i < 50; i++) {
        results.add(getRandomQuote().id);
      }
      expect(results.size).toBeGreaterThan(1);
    });
  });

  describe('getQuoteOfDay', () => {
    beforeEach(() => {
      localStorage.clear();
      vi.clearAllMocks();
    });

    it('should return a quote', () => {
      const quote = getQuoteOfDay();
      expect(quote).toHaveProperty('id');
      expect(quote).toHaveProperty('text');
      expect(quote).toHaveProperty('author');
    });

    it('should save quote date and id to localStorage', () => {
      const quote = getQuoteOfDay();
      const savedDate = localStorage.getItem('quoteOfDayDate');
      const savedId = localStorage.getItem('quoteOfDayId');

      expect(savedDate).toBe(new Date().toDateString());
      expect(savedId).toBe(String(quote.id));
    });

    it('should return same quote on same day', () => {
      const firstQuote = getQuoteOfDay();
      const secondQuote = getQuoteOfDay();

      expect(firstQuote.id).toBe(secondQuote.id);
      expect(firstQuote.text).toBe(secondQuote.text);
    });

    it('should use saved quote if date matches', () => {
      // Manually set a quote for today
      const today = new Date().toDateString();
      localStorage.setItem('quoteOfDayDate', today);
      localStorage.setItem('quoteOfDayId', '5');

      const quote = getQuoteOfDay();
      expect(quote.id).toBe(5);
    });

    it('should generate new quote if date does not match', () => {
      // Set a quote for yesterday
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      localStorage.setItem('quoteOfDayDate', yesterday);
      localStorage.setItem('quoteOfDayId', '1');

      const quote = getQuoteOfDay();

      // Should have updated the date
      expect(localStorage.getItem('quoteOfDayDate')).toBe(
        new Date().toDateString()
      );
    });

    it('should handle invalid saved quote ID', () => {
      const today = new Date().toDateString();
      localStorage.setItem('quoteOfDayDate', today);
      localStorage.setItem('quoteOfDayId', '999'); // Invalid ID

      const quote = getQuoteOfDay();

      // Should get a valid quote
      expect(quotes).toContainEqual(quote);
    });
  });
});
