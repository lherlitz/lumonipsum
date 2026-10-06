import { describe, test } from '@e2e-dev/web';
import { expect } from 'e2e';

describe('Browser Compatibility', () => {
  test('Generate and copy controls', async ({ app, screen }) => {
    await app.open('/');

    await expect(screen.getByRole('main')).toBeVisible();
    await screen.getByTestId('generate-button').click();
    await expect(screen.getByTestId('generated-text')).toBeVisible();
    await expect(screen.getByRole('button', 'Copy generated text to clipboard')).toBeVisible();
  });
});
