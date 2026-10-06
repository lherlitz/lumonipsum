import { describe, test } from '@e2e-dev/web';
import { expect } from 'e2e';

describe('Visual Tests', () => {
  test('Cursor Animation', { requires: ['browser'] }, async ({ app, screen, browser }) => {
    await app.open('/');

    const generateButton = screen.getByRole('button', 'Generate text');
    await expect(generateButton).toBeVisible();
    await expect(generateButton).toContainText('INITIATE GENERATION');

    const cursorOpacity = () =>
      browser.evaluate(() => {
        const cursor = document.querySelector('[data-testid="generate-cursor"]');
        return cursor ? getComputedStyle(cursor).opacity : '';
      });

    await expect.poll(cursorOpacity).toBe('1');
    await expect.poll(cursorOpacity).toBe('0');
  });
});
