import { test, expect } from '@playwright/test';

test.describe('Compatibility Tests', () => {
  test('Page Loads Without Errors', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    // Verify page loads
    await expect(page.locator('main')).toBeVisible();
    
    // Test core functionality
    const generateButton = page.locator('button').filter({ hasText: 'INITIATE' }).first();
    await generateButton.click();
    await page.waitForTimeout(1000);
    
    // Test copy
    const copyButton = page.getByRole('button', { name: 'COPY' });
    await expect(copyButton).toBeVisible();
  });
});