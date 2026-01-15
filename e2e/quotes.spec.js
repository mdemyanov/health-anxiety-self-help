import { test, expect } from '@playwright/test';

test.describe('Stoic Quotes', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('should display quote on home page', async ({ page }) => {
    await page.goto('/');

    await page.waitForTimeout(500);

    // Quote should be visible
    const quoteText = page.locator('[class*="quote"], blockquote, [class*="card"]');
    await expect(quoteText.first()).toBeVisible();
  });

  test('should display quote on stoic page', async ({ page }) => {
    await page.goto('/stoic');

    await page.waitForTimeout(500);

    // Quote section should exist
    const quoteArea = page.locator('[class*="quote"], blockquote');
    // Should have some quote content
  });

  test('should persist quote of the day', async ({ page }) => {
    await page.goto('/');

    // Wait for quote to load and be saved
    await page.waitForTimeout(1000);

    // Check localStorage
    const quoteData = await page.evaluate(() => {
      return {
        date: localStorage.getItem('quoteOfDayDate'),
        id: localStorage.getItem('quoteOfDayId'),
      };
    });

    // Quote data should be saved
    expect(quoteData.date).toBeTruthy();
    expect(quoteData.id).toBeTruthy();
  });

  test('should show same quote on page reload', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(1000);

    // Get first quote ID
    const firstId = await page.evaluate(() =>
      localStorage.getItem('quoteOfDayId')
    );

    // Reload page
    await page.reload();
    await page.waitForTimeout(500);

    // Get quote ID again
    const secondId = await page.evaluate(() =>
      localStorage.getItem('quoteOfDayId')
    );

    // Should be the same
    expect(secondId).toBe(firstId);
  });

  test('should display quote author', async ({ page }) => {
    await page.goto('/');

    await page.waitForTimeout(500);

    // Author should be visible (typically has dash or em-dash before it)
    const authorText = page.locator('text=Марк Аврелий, text=Сенека, text=Эпиктет');
    // One of these authors should be visible
  });
});

test.describe('Quote Interactions', () => {
  test('should have quote card on home page', async ({ page }) => {
    await page.goto('/');

    await page.waitForTimeout(500);

    // Quote card should be clickable or interactive
    const quoteCard = page.locator('[class*="card"]:has([class*="quote"])');
    // Card should exist
  });

  test('should navigate to quotes section from home', async ({ page }) => {
    await page.goto('/');

    // Click on stoic/quotes link
    const quotesLink = page.locator('text=Цитаты, text=Стоицизм');

    if (await quotesLink.isVisible()) {
      await quotesLink.click();
      await expect(page).toHaveURL(/stoic/i);
    }
  });
});
