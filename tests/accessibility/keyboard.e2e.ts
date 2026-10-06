import { describe, test } from '@e2e-dev/web';
import { expect } from 'e2e';

describe('Accessibility', () => {
  test('Keyboard Navigation', { requires: ['browser'] }, async ({ app, screen, browser }) => {
    await app.open('/');

    const paragraphInput = screen.getByTestId('paragraphs-input');
    await browser.keyboard.press('Tab');
    await expect(paragraphInput).toBeFocused();

    const userAgent = await browser.evaluate(() => navigator.userAgent);
    const chromium = userAgent.includes('Chrome');
    if (chromium) {
      await browser.keyboard.press('Tab');
      await expect(screen.getByRole('button', 'Increase paragraphs')).toBeFocused();

      await browser.keyboard.press('Tab');
      await expect(screen.getByRole('button', 'Decrease paragraphs')).toBeFocused();

      await browser.keyboard.press('Tab');
      await expect(screen.getByTestId('generate-button')).toBeFocused();

      await screen.getByTestId('generate-button').click();
      await expect(screen.getByTestId('generated-text')).toBeVisible();
      await browser.keyboard.press('Tab');
      await expect(screen.getByRole('button', { name: /copy/i })).toBeFocused();
    }
  });

  test('ARIA Labels', async ({ app, screen }) => {
    await app.open('/');

    await expect(screen.getByRole('button', 'Increase paragraphs')).toHaveAttribute(
      'aria-label',
      'Increase paragraphs',
    );
    await expect(screen.getByRole('button', 'Decrease paragraphs')).toHaveAttribute(
      'aria-label',
      'Decrease paragraphs',
    );

    const generateButton = screen.getByTestId('generate-button');
    await expect(generateButton).toHaveAttribute('aria-label', 'Generate text');

    await generateButton.click();
    await expect(screen.getByTestId('generated-text')).toBeVisible();
    await expect(screen.getByRole('button', 'Copy generated text to clipboard')).toBeVisible();
  });

  test('Error Accessibility', { requires: ['browser'] }, async ({ app, screen, browser }) => {
    await app.open('/');

    const paragraphInput = screen.getByTestId('paragraphs-input');
    await paragraphInput.fill('11');
    await browser.evaluate(() => {
      const input = document.querySelector('[data-testid="paragraphs-input"]');
      if (input instanceof HTMLElement) input.blur();
    });

    await expect(paragraphInput).toHaveAttribute('aria-invalid', 'true');
    await expect(browser.locator('#paragraphs-error')).toBeVisible();
    await expect(paragraphInput).toHaveAttribute('aria-describedby', 'paragraphs-error');
  });

  test('Screen Reader Compatibility', async ({ app, screen }) => {
    await app.open('/');

    await expect(screen.getByRole('heading', 'LUMON IPSUM GENERATOR')).toBeVisible();
    await expect(screen.getByRole('main')).toBeVisible();

    await screen.getByTestId('generate-button').click();
    await expect(screen.getByTestId('generated-text')).toBeVisible();
    await expect(screen.getByTestId('generated-paragraph').first()).toBeVisible();
  });
});
