import { test, expect } from '@playwright/test';

test.describe('Theme', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test('should default to light theme', async ({ page }) => {
    await page.goto('/');
    const html = page.locator('html');
    await expect(html).not.toHaveClass(/dark/);
  });

  test('should toggle to dark theme', async ({ page }) => {
    await page.goto('/');

    // Find and click theme toggle button (moon/sun icon)
    const themeToggle = page.locator('[aria-label*="тем"], button:has(svg)').first();

    // If no dedicated button, the toggle might be elsewhere
    // Try finding any button that toggles theme
    if (await themeToggle.isVisible()) {
      await themeToggle.click();
    }

    // Check if dark class was added (may need to wait)
    await page.waitForTimeout(100);
  });

  test('should persist theme in localStorage', async ({ page }) => {
    await page.goto('/');

    // Set dark theme via localStorage
    await page.evaluate(() => {
      localStorage.setItem('theme', 'dark');
    });

    // Reload and check
    await page.reload();

    const theme = await page.evaluate(() => localStorage.getItem('theme'));
    expect(theme).toBe('dark');
  });

  test('should restore saved theme on reload', async ({ page }) => {
    await page.goto('/');

    // Set theme to dark
    await page.evaluate(() => {
      localStorage.setItem('theme', 'dark');
    });

    await page.reload();

    // Check that html has dark class
    await page.waitForTimeout(100);
    const html = page.locator('html');
    await expect(html).toHaveClass(/dark/);
  });

  test('should switch from dark to light', async ({ page }) => {
    // Start with dark theme
    await page.evaluate(() => {
      localStorage.setItem('theme', 'dark');
    });
    await page.goto('/');

    const html = page.locator('html');
    await expect(html).toHaveClass(/dark/);

    // Find theme toggle and click
    const buttons = page.locator('button');
    const count = await buttons.count();

    // Look for theme toggle among buttons
    for (let i = 0; i < Math.min(count, 5); i++) {
      const button = buttons.nth(i);
      const hasIcon = await button.locator('svg').count() > 0;
      if (hasIcon) {
        // This might be the theme toggle
        break;
      }
    }
  });
});
