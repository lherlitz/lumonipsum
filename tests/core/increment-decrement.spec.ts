import { test, expect } from '@playwright/test';

test.describe('Core Functionality', () => {
  test('Increment Paragraph Count', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    // 1. Find and click the increment button
    const incrementButton = page.getByRole('button', { name: 'Increase paragraphs' });
    await incrementButton.click();
    
    // 2. Verify the paragraph count updates to 4
    const paragraphInput = page.locator('#paragraphs');
    await expect(paragraphInput).toHaveValue('4');
    
    // 3. Click increment again
    await incrementButton.click();
    
    // 4. Verify count updates to 5
    await expect(paragraphInput).toHaveValue('5');
  });

  test('Decrement Paragraph Count', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    // 1. Find and click the decrement button
    const decrementButton = page.getByRole('button', { name: 'Decrease paragraphs' });
    await decrementButton.click();
    
    // 2. Verify the paragraph count updates to 2
    const paragraphInput = page.locator('#paragraphs');
    await expect(paragraphInput).toHaveValue('2');
  });

  test('Minimum Paragraph Count Enforcement', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    const decrementButton = page.getByRole('button', { name: 'Decrease paragraphs' });
    const paragraphInput = page.locator('#paragraphs');
    
    // 2. Click decrement button multiple times
    for (let i = 0; i < 5; i++) {
      await decrementButton.click();
    }
    
    // 3. Verify paragraph count stays at 1
    await expect(paragraphInput).toHaveValue('1');
    
    // 4. Verify no error message is displayed (check for paragraph error specifically)
    const errorMessage = page.locator('#paragraphs-error');
    await expect(errorMessage).not.toBeVisible();
  });

  test('Maximum Paragraph Count Enforcement', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    const incrementButton = page.getByRole('button', { name: 'Increase paragraphs' });
    const paragraphInput = page.locator('#paragraphs');
    
    // 2. Click increment button 10+ times
    for (let i = 0; i < 12; i++) {
      await incrementButton.click();
    }
    
    // 3. Verify paragraph count stays at 10
    await expect(paragraphInput).toHaveValue('10');
    
    // 4. Verify no error message is displayed (check for paragraph error specifically)
    const errorMessage = page.locator('#paragraphs-error');
    await expect(errorMessage).not.toBeVisible();
  });
});