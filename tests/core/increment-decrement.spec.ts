import { test, expect } from '@playwright/test';
import { failOnConsoleErrors, assertNoConsoleErrors } from '../utils/console-errors';

test.describe('Core Functionality', () => {
  test('Increment Paragraph Count', async ({ page }) => {
    failOnConsoleErrors(page);
    await page.goto('http://localhost:3000');

    const incrementButton = page.getByRole('button', { name: 'Increase paragraphs' });
    const paragraphInput = page.getByTestId('paragraphs-input');

    await incrementButton.click();
    await expect(paragraphInput).toHaveValue('4');

    await incrementButton.click();
    await expect(paragraphInput).toHaveValue('5');
    assertNoConsoleErrors(page);
  });

  test('Decrement Paragraph Count', async ({ page }) => {
    failOnConsoleErrors(page);
    await page.goto('http://localhost:3000');

    const decrementButton = page.getByRole('button', { name: 'Decrease paragraphs' });
    const paragraphInput = page.getByTestId('paragraphs-input');

    await decrementButton.click();
    await expect(paragraphInput).toHaveValue('2');
    assertNoConsoleErrors(page);
  });

  test('Minimum Paragraph Count Enforcement', async ({ page }) => {
    failOnConsoleErrors(page);
    await page.goto('http://localhost:3000');

    const decrementButton = page.getByRole('button', { name: 'Decrease paragraphs' });
    const paragraphInput = page.getByTestId('paragraphs-input');

    for (let i = 0; i < 5; i++) {
      await decrementButton.click();
    }

    await expect(paragraphInput).toHaveValue('1');
    await expect(page.locator('#paragraphs-error')).not.toBeVisible();
    assertNoConsoleErrors(page);
  });

  test('Maximum Paragraph Count Enforcement', async ({ page }) => {
    failOnConsoleErrors(page);
    await page.goto('http://localhost:3000');

    const incrementButton = page.getByRole('button', { name: 'Increase paragraphs' });
    const paragraphInput = page.getByTestId('paragraphs-input');

    for (let i = 0; i < 12; i++) {
      await incrementButton.click();
    }

    await expect(paragraphInput).toHaveValue('10');
    await expect(page.locator('#paragraphs-error')).not.toBeVisible();
    assertNoConsoleErrors(page);
  });
});
