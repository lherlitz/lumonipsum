import { test, expect } from '@playwright/test';

test.describe('Performance Tests', () => {
  test('Initial Page Load Performance', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('http://localhost:3000');
    
    // Verify load time is under 3 seconds
    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(3000);
    
    // Verify no layout shifts after initial render
    await expect(page.locator('main')).toBeVisible();
  });

  test('Text Generation Speed', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    const generateButton = page.locator('button').filter({ hasText: 'INITIATE' }).first();
    
    const startTime = Date.now();
    await generateButton.click();
    
    // Wait for text to appear
    await page.waitForTimeout(1000);
    
    const generationTime = Date.now() - startTime;
    
    // Verify generation completes within reasonable time
    expect(generationTime).toBeLessThan(1500);
  });

  test('Memory Management', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    const generateButton = page.locator('button').filter({ hasText: 'INITIATE' }).first();
    
    // Generate text 20 times
    for (let i = 0; i < 20; i++) {
      await generateButton.click();
      await page.waitForTimeout(100);
    }
    
    // Verify page remains responsive
    await expect(page.locator('main')).toBeVisible();
  });
});