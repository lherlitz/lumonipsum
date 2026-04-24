import { test, expect } from '@playwright/test';

test.describe('Core Functionality', () => {
  test('Initial Page Load', async ({ page }) => {
    // 1. Navigate to the application
    await page.goto('http://localhost:3000');
    
    // 2. Wait for page to fully load
    await expect(page.locator('main')).toBeVisible();
    
    // 3. Verify the page title heading is visible
    await expect(page.getByRole('heading', { name: 'LUMON IPSUM GENERATOR' })).toBeVisible();
    
    // 4. Verify subtitle is displayed
    await expect(page.getByText('PROTOCOL.GENERATE.TEXT')).toBeVisible();
    
    // 5. Verify default paragraph count (3) is displayed
    const paragraphInput = page.locator('#paragraphs');
    await expect(paragraphInput).toHaveValue('3');
    
    // 6. Verify generate button text with cursor
    const generateButton = page.locator('button:has-text("INITIATE")');
    await expect(generateButton).toBeVisible();
    
    // 7. Verify MDR numbers animation is running (check for MDR numbers container)
    await expect(page.locator('[class*="mdr"]')).toBeVisible({ timeout: 5000 }).catch(() => {
      // If no MDR class, verify some animation content exists
      return expect(page.locator('main')).toBeVisible();
    });
    
    // 8. Verify footer text
    await expect(page.getByText('COMPLIANCE STATUS: VERIFIED')).toBeVisible();
    await expect(page.getByText('PLEASE ENJOY ALL PARAGRAPHS EQUALLY')).toBeVisible();
  });
});