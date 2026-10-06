import { describe, test } from '@e2e-dev/web';
import { expect } from 'e2e';

describe('Performance Tests', () => {
  test('Initial Page Load Performance', { requires: ['browser'] }, async ({ app, browser }) => {
    await app.open('/');

    const timing = await browser.evaluate(() => {
      const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
      if (!nav) return null;
      return nav.loadEventEnd - nav.startTime;
    });

    expect(timing).not.toBeNull();
    expect(timing).toBeLessThan(3000);
  });

  test('Text Generation Speed', async ({ app, screen }) => {
    await app.open('/');

    const startTime = Date.now();
    await screen.getByTestId('generate-button').click();
    await expect(screen.getByTestId('generated-text')).toBeVisible({ timeout: 5000 });
    expect(Date.now() - startTime).toBeLessThan(3000);
  });

  test('Memory Management', async ({ app, screen }) => {
    await app.open('/');

    const generateButton = screen.getByTestId('generate-button');
    for (let i = 0; i < 50; i++) {
      await generateButton.click();
    }

    await expect(screen.getByRole('main')).toBeVisible();
    await expect(screen.getByTestId('generated-text')).toBeVisible();
  });
});
