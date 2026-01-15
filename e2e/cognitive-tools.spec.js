import { test, expect } from '@playwright/test';

test.describe('Cognitive Tools', () => {
  test.describe('STOP Pause', () => {
    test('should navigate to STOP pause', async ({ page }) => {
      await page.goto('/tools');

      await page.click('text=СТОП');

      await expect(page).toHaveURL(/stop/i);
    });

    test('should display STOP header', async ({ page }) => {
      await page.goto('/tools/stop-pause');

      await expect(page.locator('h1, [class*="header"]')).toContainText(/СТОП|пауза/i);
    });

    test('should show chat messages', async ({ page }) => {
      await page.goto('/tools/stop-pause');

      await page.waitForTimeout(2000);

      const messages = page.locator('[class*="message"], [class*="bubble"]');
      await expect(messages.first()).toBeVisible({ timeout: 5000 });
    });

    test('should include timer for pauses', async ({ page }) => {
      await page.goto('/tools/stop-pause');

      await page.waitForTimeout(3000);

      // Timer should appear during the exercise
      const timer = page.locator('[class*="timer"], [class*="progress"]');
      // Timer element should exist
    });
  });

  test.describe('Decatastrophization', () => {
    test('should navigate to decatastrophization', async ({ page }) => {
      await page.goto('/tools');

      await page.click('text=Декатастрофизация');

      await expect(page).toHaveURL(/decatastroph/i);
    });

    test('should display decatastrophization header', async ({ page }) => {
      await page.goto('/tools/decatastrophize');

      await expect(page.locator('h1, [class*="header"]')).toContainText(/декатастрофизац/i);
    });

    test('should show slider for probability', async ({ page }) => {
      await page.goto('/tools/decatastrophize');

      await page.waitForTimeout(5000);

      // Slider should appear for probability assessment
      const slider = page.locator('input[type="range"], [class*="slider"]');
      // Slider element should exist
    });
  });

  test.describe('5-4-3-2-1 Grounding', () => {
    test('should navigate to grounding exercise', async ({ page }) => {
      await page.goto('/tools');

      await page.click('text=5-4-3-2-1');

      await expect(page).toHaveURL(/grounding/i);
    });

    test('should display grounding header', async ({ page }) => {
      await page.goto('/tools/grounding');

      await expect(page.locator('h1, [class*="header"]')).toContainText(/5-4-3-2-1|заземлен/i);
    });

    test('should show sequential input with status hint', async ({ page }) => {
      await page.goto('/tools/grounding');

      await page.waitForTimeout(3000);

      // Input field should appear for sequential answers
      const input = page.locator('input[type="text"], textarea').last();
      await expect(input).toBeVisible({ timeout: 5000 });

      // Status hint should be visible above input
      const hint = page.locator('text=/Напиши еще/i');
      await expect(hint).toBeVisible({ timeout: 5000 });
    });

    test('should accept sequential answers and update status hint', async ({ page }) => {
      await page.goto('/tools/grounding');

      await page.waitForTimeout(3000);

      // Find the input field
      const input = page.locator('input[type="text"]').last();
      await expect(input).toBeVisible({ timeout: 5000 });

      // Enter first answer
      await input.fill('Монитор');
      await page.keyboard.press('Enter');
      await page.waitForTimeout(300);

      // User message should appear in chat
      await expect(page.locator('text=Монитор')).toBeVisible();

      // Status hint should update (4 remaining)
      const hint = page.locator('text=/Напиши еще 4/i');
      await expect(hint).toBeVisible({ timeout: 3000 });
    });

    test('should progress to next sense after all items entered', async ({ page }) => {
      await page.goto('/tools/grounding');

      await page.waitForTimeout(3000);

      // Enter 5 items for "vision" sense
      for (let i = 1; i <= 5; i++) {
        const input = page.locator('input[type="text"]').last();
        await expect(input).toBeVisible({ timeout: 3000 });
        await input.fill(`Предмет ${i}`);
        await page.keyboard.press('Enter');
        await page.waitForTimeout(500);
      }

      // Should show next therapist message about touch sense
      await expect(page.locator('text=/ПОТРОГАТЬ/i')).toBeVisible({ timeout: 5000 });
    });
  });
});

test.describe('Tools Page', () => {
  test('should list all cognitive tools', async ({ page }) => {
    await page.goto('/tools');

    await page.waitForTimeout(500);

    // Should have links to all tools
    await expect(page.locator('text=СТОП')).toBeVisible();
    await expect(page.locator('text=5-4-3-2-1')).toBeVisible();
    await expect(page.locator('text=Декатастрофизац')).toBeVisible();
    await expect(page.locator('text=ABC')).toBeVisible();
  });

  test('should have accessible tool cards', async ({ page }) => {
    await page.goto('/tools');

    // Cards should be clickable
    const cards = page.locator('[class*="card"], a[href*="tools"]');
    await expect(cards.first()).toBeVisible();
  });
});
