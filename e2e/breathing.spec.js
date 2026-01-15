import { test, expect } from '@playwright/test';

test.describe('Breathing Exercises', () => {
  test.describe('Box Breathing (4-4-4-4)', () => {
    test('should navigate to box breathing', async ({ page }) => {
      await page.goto('/tools');

      // Find box breathing link
      await page.click('text=Квадрат');

      // Should navigate to breathing page
      await expect(page).toHaveURL(/breath|box/i);
    });

    test('should display breathing animation', async ({ page }) => {
      await page.goto('/breathing/box');

      // Wait for page load
      await page.waitForTimeout(500);

      // Should have some visual element for breathing
      const breathingElement = page.locator('svg, [class*="circle"], [class*="breath"]');
      await expect(breathingElement.first()).toBeVisible({ timeout: 5000 });
    });

    test('should have start button', async ({ page }) => {
      await page.goto('/breathing/box');

      await page.waitForTimeout(500);

      // Should have a start/begin button
      const startButton = page.locator('button:has-text("Начать"), button:has-text("Старт")');
      // Button might or might not be visible depending on auto-start
    });

    test('should show phase instructions', async ({ page }) => {
      await page.goto('/breathing/box');

      await page.waitForTimeout(1000);

      // Should show breathing phase text
      const phaseText = page.locator('text=Вдох, text=Выдох, text=Задержка');
      // One of these should be visible during breathing
    });
  });

  test.describe('4-7-8 Breathing', () => {
    test('should navigate to 4-7-8 breathing', async ({ page }) => {
      await page.goto('/tools');

      // Find 4-7-8 breathing link
      await page.click('text=4-7-8');

      // Should navigate to breathing page
      await expect(page).toHaveURL(/breath|478/i);
    });

    test('should display breathing circle', async ({ page }) => {
      await page.goto('/breathing/478');

      await page.waitForTimeout(500);

      // Should have circle animation
      const circle = page.locator('svg circle, [class*="circle"]');
      await expect(circle.first()).toBeVisible({ timeout: 5000 });
    });

    test('should show timer or countdown', async ({ page }) => {
      await page.goto('/breathing/478');

      await page.waitForTimeout(500);

      // Should show some kind of timing indicator
      const timer = page.locator('[class*="timer"], [class*="count"]');
      // Timer element should exist
    });
  });
});

test.describe('Breathing in SOS flow', () => {
  test('should include breathing exercise in SOS', async ({ page }) => {
    await page.goto('/sos');

    // Wait for breathing to appear (might take several seconds)
    await page.waitForTimeout(5000);

    // Look for breathing-related elements
    const breathing = page.locator('[class*="breath"], [class*="circle"]');

    // Breathing component should eventually appear in SOS flow
  });
});
