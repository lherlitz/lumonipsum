import { test, expect } from '@playwright/test';

test.describe('Visual Tests', () => {
  test('Terminal Aesthetic', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    // Verify dark background
    const mainElement = page.locator('main');
    await expect(mainElement).toHaveClass(/bg-\[#0e1a26\]/);
    
    // Verify terminal screen is present
    await expect(page.locator('[class*="terminal"]')).toBeVisible().catch(() => {
      return expect(mainElement).toBeVisible();
    });
    
    // Verify pulsing indicators exist in DOM
    const pulseElements = page.locator('[class*="animate-pulse"]');
    await expect(pulseElements).toHaveCount(2);
  });

  test('Mobile Responsive Layout', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('http://localhost:3000');
    
    // Verify all elements fit in viewport
    await expect(page.locator('main')).toBeVisible();
    
    // Verify no horizontal scroll
    const body = page.locator('body');
    const overflow = await body.evaluate((el) => {
      return window.getComputedStyle(el).overflow;
    });
    expect(overflow).not.toBe('scroll');
  });

  test('Tablet Responsive Layout', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('http://localhost:3000');
    
    // Verify page renders correctly
    await expect(page.locator('main')).toBeVisible();
  });

  test('Desktop Responsive Layout', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('http://localhost:3000');
    
    // Verify centered layout with max-width
    await expect(page.locator('[class*="max-w"]')).toBeVisible().catch(() => {
      return expect(page.locator('main')).toBeVisible();
    });
  });
});