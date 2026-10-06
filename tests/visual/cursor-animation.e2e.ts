import { describe, test } from '@e2e-dev/web';
import { expect } from 'e2e';

describe('Visual Tests', () => {
  test('Cursor Animation', async ({ app, screen }) => {
    await app.open('/');

    const generateButton = screen.getByRole('button', 'Generate text');
    await expect(generateButton).toBeVisible();
    await expect(generateButton).toContainText('INITIATE GENERATION');

    await expect
      .poll(async () => generateButton.textContent())
      .toMatch(/INITIATE GENERATION[_\s]/);
  });
});
