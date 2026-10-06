import { describe, test } from '@e2e-dev/web';
import { expect } from 'e2e';

describe('Edge Cases', () => {
  test('Browser Back Navigation', { requires: ['browser'] }, async ({ app, screen, browser }) => {
    await app.open('/');

    await screen.getByRole('button', 'Generate text').click();
    await expect(screen.getByTestId('generated-text')).toBeVisible();

    await browser.evaluate(() => {
      history.pushState({}, '', '/?ref=forward');
      return null;
    });
    await browser.evaluate(() => {
      history.back();
      return null;
    });

    await expect(browser).toHaveURL('http://localhost:3000/');
    await expect(screen.getByRole('heading', 'LUMON IPSUM GENERATOR')).toBeVisible();
  });
});
