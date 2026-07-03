import { test, expect } from '@playwright/test';
import { failOnConsoleErrors, assertNoConsoleErrors } from '../utils/console-errors';

test.describe('Accessibility', () => {
  test('Keyboard Navigation', async ({ page, browserName }) => {
    failOnConsoleErrors(page);
    await page.goto('http://localhost:3000');

    const paragraphInput = page.getByTestId('paragraphs-input');

    // Tab order: input → increment → decrement → generate
    await page.keyboard.press('Tab');
    await expect(paragraphInput).toBeFocused();

    // WebKit/Firefox may not focus buttons on Tab by default; skip strict focus assertions there
    if (browserName === 'chromium') {
      await page.keyboard.press('Tab');
      await expect(page.getByRole('button', { name: 'Increase paragraphs' })).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(page.getByRole('button', { name: 'Decrease paragraphs' })).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(page.getByTestId('generate-button')).toBeFocused();

      // Generate text and verify copy button is reachable via Tab
      await page.getByTestId('generate-button').click();
      await expect(page.locator('[data-testid="generated-text"]')).toBeVisible();
      await page.keyboard.press('Tab');
      await expect(page.getByRole('button', { name: /copy/i })).toBeFocused();
    }
    assertNoConsoleErrors(page);
  });

  test('ARIA Labels', async ({ page }) => {
    failOnConsoleErrors(page);
    await page.goto('http://localhost:3000');

    await expect(page.getByRole('button', { name: 'Increase paragraphs' })).toHaveAttribute('aria-label', 'Increase paragraphs');
    await expect(page.getByRole('button', { name: 'Decrease paragraphs' })).toHaveAttribute('aria-label', 'Decrease paragraphs');

    const generateButton = page.getByTestId('generate-button');
    await expect(generateButton).toHaveAttribute('aria-label', 'Generate text');

    await generateButton.click();
    await expect(page.locator('[data-testid="generated-text"]')).toBeVisible();

    const copyButton = page.getByRole('button', { name: 'Copy generated text to clipboard' });
    await expect(copyButton).toBeVisible();
    assertNoConsoleErrors(page);
  });

  test('Error Accessibility', async ({ page }) => {
    failOnConsoleErrors(page);
    await page.goto('http://localhost:3000');

    const paragraphInput = page.getByTestId('paragraphs-input');
    await paragraphInput.fill('11');
    await paragraphInput.blur();

    await expect(paragraphInput).toHaveAttribute('aria-invalid', 'true');
    await expect(page.locator('#paragraphs-error')).toBeVisible();
    await expect(paragraphInput).toHaveAttribute('aria-describedby', 'paragraphs-error');
    assertNoConsoleErrors(page);
  });

  test('Screen Reader Compatibility', async ({ page }) => {
    failOnConsoleErrors(page);
    await page.goto('http://localhost:3000');

    await expect(page.getByRole('heading', { name: 'LUMON IPSUM GENERATOR' })).toBeVisible();
    await expect(page.locator('main')).toBeVisible();

    await page.getByTestId('generate-button').click();
    await expect(page.locator('[data-testid="generated-text"]')).toBeVisible();
    await expect(page.getByTestId('generated-paragraph').first()).toBeVisible();
    assertNoConsoleErrors(page);
  });
});
