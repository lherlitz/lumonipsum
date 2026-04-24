import { test, expect } from '@playwright/test';

test.describe('Core Functionality', () => {
  test('Input Validation - Valid Values', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    // Clear input field
    const paragraphInput = page.locator('#paragraphs');
    await paragraphInput.fill('');
    
    // Type 5 in paragraph input
    await paragraphInput.fill('5');
    await paragraphInput.blur();
    
    // Click generate button
    const generateButton = page.locator('button').filter({ hasText: 'INITIATE' }).first();
    await generateButton.click();
    await page.waitForTimeout(1000);
    
    // Copy button should be visible
    await expect(page.getByRole('button', { name: 'COPY' })).toBeVisible();
    
    // Clear and type 10
    await paragraphInput.fill('10');
    await paragraphInput.blur();
    await generateButton.click();
    await page.waitForTimeout(1000);
    
    // Copy button should be visible
    await expect(page.getByRole('button', { name: 'COPY' })).toBeVisible();
  });

  test('Input Validation - Invalid Values', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    const paragraphInput = page.locator('#paragraphs');
    
    // Type 11 (above max)
    await paragraphInput.fill('11');
    await paragraphInput.blur();
    
    // Verify error message appears
    await expect(page.getByText('Please enter a number between 1 and 10')).toBeVisible();
    
    // Verify input shows error state (red border)
    await expect(paragraphInput).toHaveAttribute('aria-invalid', 'true');
    
    // Clear and type 0
    await paragraphInput.fill('0');
    await paragraphInput.blur();
    await expect(page.getByText('Please enter a number between 1 and 10')).toBeVisible();
    
    // Clear and type -5 (using keyboard since fill doesn't work with number inputs)
    await paragraphInput.focus();
    await page.keyboard.press('Control+a');
    await page.keyboard.type('-5');
    await paragraphInput.blur();
    await expect(page.getByText('Please enter a number between 1 and 10')).toBeVisible();
  });

  test('Input State Synchronization', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    const paragraphInput = page.locator('#paragraphs');
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
  });
});