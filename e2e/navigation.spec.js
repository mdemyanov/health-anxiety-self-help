import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should load home page', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL('/');
  });

  test('should display SOS button on home page', async ({ page }) => {
    await page.goto('/');
    const sosButton = page.getByText('SOS-помощь');
    await expect(sosButton).toBeVisible();
  });

  test('should navigate to Tools page via TabBar', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Инструменты');
    await expect(page).toHaveURL('/tools');
  });

  test('should navigate to Stoic page via TabBar', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Стоицизм');
    await expect(page).toHaveURL('/stoic');
  });

  test('should navigate to Diary page via TabBar', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Дневник');
    await expect(page).toHaveURL('/diary');
  });

  test('should navigate back to Home from Tools', async ({ page }) => {
    await page.goto('/tools');
    await page.click('text=Главная');
    await expect(page).toHaveURL('/');
  });

  test('should handle deep link to SOS', async ({ page }) => {
    await page.goto('/sos');
    await expect(page.locator('h1, [class*="header"]')).toContainText(/SOS/i);
  });

  test('should handle deep link to ABC diary', async ({ page }) => {
    await page.goto('/tools/abc-diary');
    await expect(page).toHaveURL('/tools/abc-diary');
  });

  test('should have back button on chat tool pages', async ({ page }) => {
    await page.goto('/sos');
    // Wait for page to load
    await page.waitForTimeout(500);
    // Back button should exist (usually an icon/arrow)
    const backButton = page.locator('button').first();
    await expect(backButton).toBeVisible();
  });
});
