import { test, expect } from '@playwright/test';

test.describe('Core Functionality', () => {
  test('Input Validation - Decimal Values', async ({ page }) => {
    await page.goto('http://localhost:3000');

    const paragraphInput = page.locator('#paragraphs');

    // 1. Clear input field
    await paragraphInput.fill('');

    // 2. Type 3.5
    await paragraphInput.fill('3.5');

    // 3. Verify an error message appears because 3.5 is not a valid integer
    await expect(page.getByText('Please enter a number between 1 and 10')).toBeVisible();
    await expect(paragraphInput).toHaveAttribute('aria-invalid', 'true');

    // 4. Correct the input to a valid integer
    await paragraphInput.fill('3');
    await paragraphInput.blur();
    await expect(paragraphInput).toHaveValue('3');

    // 5. Generate text
    await page.getByRole('button', { name: 'Generate text' }).click();

    // 6. Verify exactly 3 paragraphs are generated
    await expect(page.locator('[data-testid="generated-paragraph"]')).toHaveCount(3);
  });
});
