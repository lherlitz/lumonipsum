import { describe, test } from '@e2e-dev/web';
import { expect } from 'e2e';

describe('Visual Tests', () => {
  test('MDR Numbers Animation', { requires: ['browser'] }, async ({ app, screen, browser }) => {
    await app.open('/');

    const mdr = browser.locator('[data-testid="mdr-numbers"]');
    await expect(mdr).toBeVisible();
    await expect(browser.locator('[data-testid="mdr-numbers"] span').first()).toBeVisible();

    const transition = await browser.evaluate(() => {
      const span = document.querySelector('[data-testid="mdr-numbers"] span');
      return span ? getComputedStyle(span).transition : '';
    });
    expect(transition).toMatch(/opacity/);

    await screen.getByRole('button', 'Generate text').click();
    await expect(screen.getByTestId('mdr-numbers')).not.toBeVisible();
    await expect(screen.getByTestId('generated-text')).toBeVisible();
  });
});
