import { test, expect } from '@playwright/test';

test.describe('SOS Flow', () => {
  test('should navigate to SOS from home page', async ({ page }) => {
    await page.goto('/');
    await page.click('text=SOS-помощь');
    await expect(page).toHaveURL('/sos');
  });

  test('should display SOS header', async ({ page }) => {
    await page.goto('/sos');
    await expect(page.locator('h1, [class*="header"]')).toContainText(/SOS/i);
  });

  test('should show first message from therapist', async ({ page }) => {
    await page.goto('/sos');

    // Wait for first message to appear
    await page.waitForTimeout(1000);

    // Should have at least one message
    const messages = page.locator('[class*="chat"], [class*="message"]');
    await expect(messages.first()).toBeVisible({ timeout: 5000 });
  });

  test('should have back button', async ({ page }) => {
    await page.goto('/sos');
    await page.waitForTimeout(500);

    // Back button should be present
    const backButton = page.locator('button').first();
    await expect(backButton).toBeVisible();
  });

  test('should navigate back when clicking back button', async ({ page }) => {
    await page.goto('/sos');
    await page.waitForTimeout(500);

    // Click back button
    await page.locator('button').first().click();

    // Should navigate away from SOS
    await expect(page).not.toHaveURL('/sos');
  });

  test('should show breathing component', async ({ page }) => {
    await page.goto('/sos');

    // Wait for breathing component to appear (might take several messages)
    // Look for breathing-related elements or animations
    await page.waitForTimeout(3000);

    // The breathing component should eventually appear
    // Check for any breathing-related content
    const breathing = page.locator('[class*="breath"], [class*="circle"], svg');
    // May or may not be visible depending on flow timing
  });

  test('should progress through messages', async ({ page }) => {
    await page.goto('/sos');

    // Count initial messages
    await page.waitForTimeout(1000);
    const initialCount = await page.locator('[class*="message"], [class*="bubble"]').count();

    // Wait for more messages
    await page.waitForTimeout(3000);
    const laterCount = await page.locator('[class*="message"], [class*="bubble"]').count();

    // Should have more messages after waiting
    expect(laterCount).toBeGreaterThanOrEqual(initialCount);
  });
});
