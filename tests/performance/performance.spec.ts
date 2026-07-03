import { test, expect } from '@playwright/test';
import { failOnConsoleErrors, assertNoConsoleErrors } from '../utils/console-errors';

test.describe('Performance Tests', () => {
  test('Initial Page Load Performance', async ({ page }) => {
    failOnConsoleErrors(page);

    await page.goto('http://localhost:3000');

    const timing = await page.evaluate(async () => {
      await new Promise<void>((resolve) => {
        if (document.readyState === 'complete') {
          resolve();
        } else {
          window.addEventListener('load', () => resolve());
        }
      });
      const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      return nav ? nav.loadEventEnd - nav.startTime : null;
    });

    expect(timing).not.toBeNull();
    expect(timing).toBeLessThan(3000);

    // Verify no layout shifts after initial render
    const cls = await page.evaluate(() => {
      let value = 0;
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as PerformanceEntry & { hadRecentInput: boolean }).hadRecentInput) {
            value += (entry as unknown as { value: number }).value;
          }
        }
      }).observe({ type: 'layout-shift', buffered: true });
      return value;
    });

    await page.waitForTimeout(1000);
    expect(cls).toBeLessThan(0.1);
    assertNoConsoleErrors(page);
  });

  test('Text Generation Speed', async ({ page }) => {
    failOnConsoleErrors(page);
    await page.goto('http://localhost:3000');

    const generateButton = page.getByTestId('generate-button');
    const startTime = Date.now();
    await generateButton.click();

    await expect(page.getByTestId('generated-text')).toBeVisible({ timeout: 5000 });
    const generationTime = Date.now() - startTime;
    expect(generationTime).toBeLessThan(3000);
    assertNoConsoleErrors(page);
  });

  test('Memory Management', async ({ page }) => {
    failOnConsoleErrors(page);
    await page.goto('http://localhost:3000');

    const generateButton = page.getByTestId('generate-button');

    // Generate text 50+ times
    for (let i = 0; i < 50; i++) {
      await generateButton.click();
      await page.waitForTimeout(50);
    }

    await expect(page.locator('main')).toBeVisible();
    await expect(page.getByTestId('generated-text')).toBeVisible();
    assertNoConsoleErrors(page);
  });
});
