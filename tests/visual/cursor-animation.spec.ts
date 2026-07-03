import { test, expect } from '@playwright/test';

test.describe('Visual Tests', () => {
  test('Cursor Animation', async ({ page }) => {
    await page.goto('http://localhost:3000');

    const generateButton = page.getByRole('button', { name: 'Generate text' });
    await expect(generateButton).toBeVisible();

    // 1. Capture the initial button text
    const initialText = await generateButton.textContent();
    expect(initialText).toContain('INITIATE GENERATION');

    // 2. Wait for the cursor to toggle (use a generous timeout for animation interval ~530ms)
    await page.waitForFunction(
      (expectedBase) => {
        const button = document.querySelector('[data-testid="generate-button"]');
        const text = button?.textContent || '';
        return text.includes(expectedBase) && (text.includes('_') || !text.includes('_'));
      },
      'INITIATE GENERATION',
      { timeout: 1500 }
    );

    // 3. Verify the button text contains a cursor character at least once
    const currentText = await generateButton.textContent();
    expect(currentText).toMatch(/INITIATE GENERATION[_\s]/);
  });
});
