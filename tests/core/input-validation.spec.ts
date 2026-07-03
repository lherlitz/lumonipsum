import { test, expect } from '@playwright/test';
import { failOnConsoleErrors, assertNoConsoleErrors } from '../utils/console-errors';

test.describe('Core Functionality', () => {
  test('Input Validation - Valid Values', async ({ page }) => {
    failOnConsoleErrors(page);
    await page.goto('http://localhost:3000');

    const paragraphInput = page.getByTestId('paragraphs-input');
    const generateButton = page.getByTestId('generate-button');

    // Type 5 in paragraph input and generate
    await paragraphInput.fill('5');
    await paragraphInput.blur();
    await generateButton.click();
    await expect(page.getByTestId('generated-text')).toBeVisible();
    await expect(page.getByTestId('generated-paragraph')).toHaveCount(5);

    // Clear and type 10
    await paragraphInput.fill('10');
    await paragraphInput.blur();
    await generateButton.click();
    await expect(page.getByTestId('generated-paragraph')).toHaveCount(10);
    assertNoConsoleErrors(page);
  });

  test('Input Validation - Invalid Values', async ({ page }) => {
    failOnConsoleErrors(page);
    await page.goto('http://localhost:3000');

    const paragraphInput = page.getByTestId('paragraphs-input');

    // Type 11 (above max)
    await paragraphInput.fill('11');
    await paragraphInput.blur();
    await expect(page.getByText('Please enter a number between 1 and 10')).toBeVisible();
    await expect(paragraphInput).toHaveAttribute('aria-invalid', 'true');

    // Clear and type 0
    await paragraphInput.fill('0');
    await paragraphInput.blur();
    await expect(page.getByText('Please enter a number between 1 and 10')).toBeVisible();

    // Clear and type -5
    await paragraphInput.focus();
    await page.keyboard.press('Control+a');
    await page.keyboard.type('-5');
    await paragraphInput.blur();
    await expect(page.getByText('Please enter a number between 1 and 10')).toBeVisible();

    // Clear and type abc
    await paragraphInput.focus();
    await page.keyboard.press('Control+a');
    await page.keyboard.type('abc');
    await paragraphInput.blur();
    await expect(page.getByText('Please enter a number between 1 and 10')).toBeVisible();
    assertNoConsoleErrors(page);
  });

  test('Input State Synchronization', async ({ page }) => {
    failOnConsoleErrors(page);
    await page.goto('http://localhost:3000');

    const paragraphInput = page.getByTestId('paragraphs-input');
    const incrementButton = page.getByRole('button', { name: 'Increase paragraphs' });
    const decrementButton = page.getByRole('button', { name: 'Decrease paragraphs' });

    // Type 7 directly in input field
    await paragraphInput.fill('7');
    await paragraphInput.blur();

    // Click increment button
    await incrementButton.click();
    await expect(paragraphInput).toHaveValue('8');

    // Click decrement button twice
    await decrementButton.click();
    await decrementButton.click();
    await expect(paragraphInput).toHaveValue('6');
    assertNoConsoleErrors(page);
  });
});
