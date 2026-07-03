import { test, expect } from '@playwright/test';
import { failOnConsoleErrors, assertNoConsoleErrors } from '../utils/console-errors';


test.describe('Core Functionality', () => {
  test('Clipboard Error Handling', async ({ page }) => {
    failOnConsoleErrors(page);
    await page.goto('http://localhost:3000');

    // 1. Generate text
    await page.getByRole('button', { name: 'Generate text' }).click();
    await expect(page.getByRole('button', { name: 'Copy generated text to clipboard' })).toBeVisible();

    // 2. Mock clipboard failure
    await page.evaluate(() => {
      Object.defineProperty(navigator, 'clipboard', {
        value: {
          writeText: function () { return Promise.reject(new Error('Clipboard denied')); }
        },
        configurable: true
      });
    });

    // 3. Click copy button
    await page.getByRole('button', { name: 'Copy generated text to clipboard' }).click();

    // 4. Verify error message appears
    await expect(page.getByText('Copy failed. Please select the text and press Ctrl+C / Cmd+C.')).toBeVisible();

    // 5. Verify copy button shows ERROR and is disabled
    await expect(page.getByRole('button', { name: 'Copy failed' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Copy failed' })).toBeDisabled();
    assertNoConsoleErrors(page);
  });
});
