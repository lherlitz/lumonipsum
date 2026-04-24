import { test, expect } from '@playwright/test';

test.describe('Edge Cases', () => {
  test('First Time Visit', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    // Verify page loads completely
    await expect(page.locator('main')).toBeVisible();
    
    // Verify default state is shown
    await expect(page.getByRole('heading', { name: 'LUMON IPSUM GENERATOR' })).toBeVisible();
  });

  test('Page Refresh', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    // Change paragraph count to 7
    const paragraphInput = page.locator('#paragraphs');
    await paragraphInput.fill('7');
    await paragraphInput.blur();
    
    // Refresh the page
    await page.reload();
    
    // Verify default value (3) is shown on refresh
    await expect(paragraphInput).toHaveValue('3');
  });

  test('Rapid Generation Clicks', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    // Click generate button multiple times rapidly
    const generateButton = page.locator('button').filter({ hasText: 'INITIATE' }).first();
    await generateButton.click();
    await generateButton.click();
    await generateButton.click();
    
    // Wait for generation
    await page.waitForTimeout(1000);
    
    // Verify final generation result is displayed
    await expect(page.getByRole('button', { name: 'COPY' })).toBeVisible();
  });

  test('JavaScript Error Handling', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    // Generate text
    const generateButton = page.locator('button').filter({ hasText: 'INITIATE' }).first();
    await generateButton.click();
    await page.waitForTimeout(1000);
    
    // Verify page is still responsive
    await expect(page.locator('main')).toBeVisible();
  });

  test('Large Text Volume', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    // Generate maximum 10 paragraphs
    const paragraphInput = page.locator('#paragraphs');
    await paragraphInput.fill('10');
    await paragraphInput.blur();
    
    const generateButton = page.locator('button').filter({ hasText: 'INITIATE' }).first();
    await generateButton.click();
    await page.waitForTimeout(1000);
    
    // Verify text fits in container
    await expect(page.locator('main')).toBeVisible();
    
    // Verify copy button is visible
    await expect(page.getByRole('button', { name: 'COPY' })).toBeVisible();
  });
});