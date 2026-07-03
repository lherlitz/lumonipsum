import { test, expect } from '@playwright/test';
import { failOnConsoleErrors, assertNoConsoleErrors } from '../utils/console-errors';

test.describe('Edge Cases', () => {
  test('First Time Visit', async ({ context }) => {
    const page = await context.newPage();
    failOnConsoleErrors(page);
    await page.goto('http://localhost:3000');

    await expect(page.locator('main')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'LUMON IPSUM GENERATOR' })).toBeVisible();
    await expect(page.getByTestId('mdr-numbers')).toBeVisible();
    assertNoConsoleErrors(page);
    await page.close();
  });

  test('Page Refresh', async ({ page }) => {
    failOnConsoleErrors(page);
    await page.goto('http://localhost:3000');

    const paragraphInput = page.getByTestId('paragraphs-input');
    await paragraphInput.fill('7');
    await paragraphInput.blur();

    await page.reload();

    await expect(paragraphInput).toHaveValue('3');
    assertNoConsoleErrors(page);
  });

  test('Rapid Generation Clicks', async ({ page }) => {
    failOnConsoleErrors(page);
    await page.goto('http://localhost:3000');

    const generateButton = page.getByTestId('generate-button');
    await generateButton.click();
    await generateButton.click();
    await generateButton.click();
    await generateButton.click();
    await generateButton.click();

    await expect(page.getByTestId('generated-text')).toBeVisible();
    await expect(page.getByTestId('generated-paragraph')).toHaveCount(3);

    // Verify no duplicate paragraphs (all text contents should be unique within one generation)
    const texts = await page.getByTestId('generated-paragraph').allTextContents();
    expect(new Set(texts).size).toBe(texts.length);
    assertNoConsoleErrors(page);
  });

  test('JavaScript Error Handling', async ({ page }) => {
    failOnConsoleErrors(page);
    await page.goto('http://localhost:3000');

    await page.getByTestId('generate-button').click();
    await expect(page.getByTestId('generated-text')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
    assertNoConsoleErrors(page);
  });

  test('Large Text Volume', async ({ page }) => {
    failOnConsoleErrors(page);
    await page.goto('http://localhost:3000');

    const paragraphInput = page.getByTestId('paragraphs-input');
    await paragraphInput.fill('10');
    await paragraphInput.blur();

    await page.getByTestId('generate-button').click();
    await expect(page.getByTestId('generated-text')).toBeVisible();
    await expect(page.getByTestId('generated-paragraph')).toHaveCount(10);

    // Verify container does not overflow horizontally
    const generatedText = page.getByTestId('generated-text');
    const box = await generatedText.boundingBox();
    expect(box).not.toBeNull();
    if (box) {
      const viewportWidth = await page.evaluate(() => window.innerWidth);
      expect(box.width).toBeLessThanOrEqual(viewportWidth);
    }

    // Verify copy still works
    await page.getByRole('button', { name: /copy/i }).click();
    await expect(page.getByRole('button', { name: /copied|copy/i })).toBeVisible();
    assertNoConsoleErrors(page);
  });
});
