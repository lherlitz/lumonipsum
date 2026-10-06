import { describe, test } from '@e2e-dev/web';
import { expect } from 'e2e';

describe('Core Functionality', () => {
  test('Clipboard Error Handling', { requires: ['browser'] }, async ({ app, screen, browser }) => {
    await app.open('/');

    await screen.getByRole('button', 'Generate text').click();
    await expect(screen.getByRole('button', 'Copy generated text to clipboard')).toBeVisible();

    await browser.evaluate(() => {
      Object.defineProperty(navigator, 'clipboard', {
        configurable: true,
        value: {
          writeText() {
            return Promise.reject(new Error('Clipboard denied'));
          },
        },
      });
    });

    await screen.getByRole('button', 'Copy generated text to clipboard').click();

    await expect(
      screen.getByText('Copy failed. Please select the text and press Ctrl+C / Cmd+C.'),
    ).toBeVisible();
    await expect(screen.getByRole('button', 'Copy failed')).toBeVisible();
    await expect(screen.getByRole('button', 'Copy failed')).toBeDisabled();
  });
});
