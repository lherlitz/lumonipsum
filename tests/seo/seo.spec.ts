import { test, expect } from '@playwright/test';

test.describe('SEO Tests', () => {
  test('Page Metadata', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    // Check page title
    const title = await page.title();
    expect(title).toBeTruthy();
    
    // Verify title is meaningful
    expect(title.length).toBeGreaterThan(0);
  });

  test('Semantic HTML', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    // Verify h1 heading exists
    await expect(page.locator('h1')).toBeVisible();
    
    // Verify main tag or role=main is used
    await expect(page.locator('main')).toBeVisible();
  });
});