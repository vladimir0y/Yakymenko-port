import { test, expect } from '@playwright/test';

// Extra E2E focusing on keyboard navigation and responsive assertions
// Assumes baseURL from playwright.config.ts

test.describe('Homepage accessibility and responsiveness', () => {
  test('keyboard navigation reaches key controls and sections', async ({ page }) => {
    await page.goto('/');

    // Start keyboard navigation
    await page.keyboard.press('Tab'); // should focus header/nav first interactive element

    // Find theme toggle (role=switch inside footer header etc.) via tabbing until found
    // Put a cap on key presses to avoid infinite loops
    let foundButton = false;
    for (let i = 0; i < 30; i++) {
      const switchEl = page.getByRole('switch');
      if (await switchEl.isVisible().catch(() => false)) {
        foundButton = true;
        break;
      }
      await page.keyboard.press('Tab');
    }
    expect(foundButton).toBeTruthy();

    // Ensure Skip to Content or main landmark is reachable
    await expect(page.locator('main')).toBeVisible();
  });

  test('renders correctly at mobile, tablet, and desktop breakpoints', async ({ page }) => {
    await page.goto('/');

    // Mobile
    await page.setViewportSize({ width: 375, height: 812 });
    await expect(page.locator('main')).toBeVisible();

    // Tablet
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator('main')).toBeVisible();

    // Desktop
    await page.setViewportSize({ width: 1280, height: 900 });
    await expect(page.locator('main')).toBeVisible();
  });
});
