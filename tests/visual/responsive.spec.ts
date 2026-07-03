import { test, expect } from '@playwright/test';
import { failOnConsoleErrors, assertNoConsoleErrors } from '../utils/console-errors';

test.describe('Visual Tests', () => {
  test('Terminal Aesthetic', async ({ page }) => {
    failOnConsoleErrors(page);
    await page.goto('http://localhost:3000');

    const mainElement = page.locator('main');
    await expect(mainElement).toBeVisible();

    // Verify background color matches archive (#0e1a26)
    const bodyColor = await page.evaluate(() => window.getComputedStyle(document.body).backgroundColor);
    expect(bodyColor).toBe('rgb(14, 26, 38)');

    // Verify terminal screen is present
    const terminal = page.locator('.terminal-screen');
    await expect(terminal).toBeVisible();

    // Verify text color and font family are terminal-like
    const terminalColor = await terminal.evaluate((el) => window.getComputedStyle(el).color);
    expect(terminalColor).toBe('rgb(175, 203, 214)');
    const fontFamily = await terminal.evaluate((el) => window.getComputedStyle(el).fontFamily);
    expect(fontFamily).toContain('monospace');

    // Verify pulsing indicators exist in DOM
    await expect(page.locator('[class*="animate-pulse"]')).toHaveCount(2);
    assertNoConsoleErrors(page);
  });

  test('Mobile Responsive Layout', async ({ page }) => {
    failOnConsoleErrors(page);
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('http://localhost:3000');

    await expect(page.locator('main')).toBeVisible();
    await expect(page.getByTestId('generate-button')).toBeVisible();
    await expect(page.getByTestId('generate-button')).toBeEnabled();

    // Verify no horizontal overflow
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 1);
    assertNoConsoleErrors(page);
  });

  test('Tablet Responsive Layout', async ({ page }) => {
    failOnConsoleErrors(page);
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('http://localhost:3000');

    await expect(page.locator('main')).toBeVisible();
    await expect(page.getByTestId('generate-button')).toBeVisible();
    assertNoConsoleErrors(page);
  });

  test('Desktop Responsive Layout', async ({ page }) => {
    failOnConsoleErrors(page);
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('http://localhost:3000');

    await expect(page.locator('main')).toBeVisible();

    // Verify centered max-width container
    const container = page.locator('.max-w-4xl');
    await expect(container).toBeVisible();

    const boundingBox = await container.boundingBox();
    expect(boundingBox).not.toBeNull();
    if (boundingBox) {
      expect(boundingBox.width).toBeLessThanOrEqual(1280);
    }
    assertNoConsoleErrors(page);
  });
});
