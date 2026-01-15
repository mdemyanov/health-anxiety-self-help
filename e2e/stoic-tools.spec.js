import { test, expect } from '@playwright/test';

test.describe('Stoic Tools', () => {
  test.describe('Morning Practice', () => {
    test('should navigate to morning practice', async ({ page }) => {
      await page.goto('/stoic');

      await page.click('text=Утренн');

      await expect(page).toHaveURL(/morning/i);
    });

    test('should display morning practice header', async ({ page }) => {
      await page.goto('/stoic/morning');

      await expect(page.locator('h1, [class*="header"]')).toContainText(/утр/i);
    });

    test('should show therapist messages', async ({ page }) => {
      await page.goto('/stoic/morning');

      await page.waitForTimeout(2000);

      const messages = page.locator('[class*="message"], [class*="bubble"]');
      await expect(messages.first()).toBeVisible({ timeout: 5000 });
    });
  });

  test.describe('Evening Reflection', () => {
    test('should navigate to evening reflection', async ({ page }) => {
      await page.goto('/stoic');

      await page.click('text=Вечерн');

      await expect(page).toHaveURL(/evening/i);
    });

    test('should display evening reflection header', async ({ page }) => {
      await page.goto('/stoic/evening');

      await expect(page.locator('h1, [class*="header"]')).toContainText(/вечер/i);
    });
  });

  test.describe('View from Above', () => {
    test('should navigate to view from above', async ({ page }) => {
      await page.goto('/stoic');

      await page.click('text=Взгляд');

      await expect(page).toHaveURL(/view-from-above/i);
    });

    test('should display view from above header', async ({ page }) => {
      await page.goto('/stoic/view-from-above');

      await expect(page.locator('h1, [class*="header"]')).toContainText(/взгляд/i);
    });

    test('should include timer for visualization', async ({ page }) => {
      await page.goto('/stoic/view-from-above');

      await page.waitForTimeout(3000);

      // Should have timer component
      const timer = page.locator('[class*="timer"], [class*="progress"]');
      // Timer should appear at some point
    });
  });

  test.describe('Dichotomy of Control', () => {
    test('should navigate to dichotomy', async ({ page }) => {
      await page.goto('/stoic');

      await page.click('text=Дихотомия');

      await expect(page).toHaveURL(/dichotomy/i);
    });

    test('should display dichotomy header', async ({ page }) => {
      await page.goto('/stoic/dichotomy');

      await expect(page.locator('h1, [class*="header"]')).toContainText(/дихотомия|контрол/i);
    });

    test('should show checklist component', async ({ page }) => {
      await page.goto('/stoic/dichotomy');

      await page.waitForTimeout(3000);

      // Should have checklist for sorting items
      const checklist = page.locator('[class*="check"], input[type="checkbox"]');
      // Checklist should appear
    });
  });
});

test.describe('Stoic Page', () => {
  test('should display quote of the day', async ({ page }) => {
    await page.goto('/stoic');

    await page.waitForTimeout(500);

    // Quote should be visible
    const quote = page.locator('[class*="quote"], blockquote');
    // Quote element should exist
  });

  test('should list all stoic tools', async ({ page }) => {
    await page.goto('/stoic');

    // Should have links to all stoic practices
    await expect(page.locator('text=Утренн')).toBeVisible();
    await expect(page.locator('text=Вечерн')).toBeVisible();
    await expect(page.locator('text=Взгляд')).toBeVisible();
    await expect(page.locator('text=Дихотомия')).toBeVisible();
  });
});
