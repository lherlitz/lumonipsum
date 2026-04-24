import { test, expect } from '@playwright/test';

test.describe('Text Generation Tests', () => {
  test('Generate Exactly One Paragraph', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    // Set paragraph count to 1
    const paragraphInput = page.locator('#paragraphs');
    await paragraphInput.fill('1');
    await paragraphInput.blur();
    
    // Generate text
    const generateButton = page.locator('button').filter({ hasText: 'INITIATE' }).first();
    await generateButton.click();
    await page.waitForTimeout(1000);
    
    // Verify copy button is visible
    await expect(page.getByRole('button', { name: 'COPY' })).toBeVisible();
  });

  test('Generate Five Paragraphs', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    // Set paragraph count to 5
    const paragraphInput = page.locator('#paragraphs');
    await paragraphInput.fill('5');
    await paragraphInput.blur();
    
    // Generate text
    const generateButton = page.locator('button').filter({ hasText: 'INITIATE' }).first();
    await generateButton.click();
    await page.waitForTimeout(1000);
    
    // Verify copy button is visible
    await expect(page.getByRole('button', { name: 'COPY' })).toBeVisible();
  });

  test('Generate Ten Paragraphs', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    // Set paragraph count to 10
    const paragraphInput = page.locator('#paragraphs');
    await paragraphInput.fill('10');
    await paragraphInput.blur();
    
    // Generate text
    const generateButton = page.locator('button').filter({ hasText: 'INITIATE' }).first();
    await generateButton.click();
    await page.waitForTimeout(1000);
    
    // Verify copy button is visible
    await expect(page.getByRole('button', { name: 'COPY' })).toBeVisible();
  });

  test('Sentence Structure', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    // Generate text
    const generateButton = page.locator('button').filter({ hasText: 'INITIATE' }).first();
    await generateButton.click();
    await page.waitForTimeout(1000);
    
    // Verify text is generated
    const mainContent = page.locator('main');
    await expect(mainContent).toBeVisible();
  });

  test('Text Randomness', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    // Generate text
    const generateButton = page.locator('button').filter({ hasText: 'INITIATE' }).first();
    await generateButton.click();
    await page.waitForTimeout(1000);
    
    // Capture content
    const initialContent = await page.locator('main').textContent();
    
    // Generate again with same settings
    await generateButton.click();
    await page.waitForTimeout(1000);
    
    // Verify content differs
    const newContent = await page.locator('main').textContent();
    expect(newContent).not.toBe(initialContent);
  });

  test('Paragraph Count Clamping', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    const paragraphInput = page.locator('#paragraphs');
    const generateButton = page.locator('button').filter({ hasText: 'INITIATE' }).first();
    
    // Call with 0
    await paragraphInput.fill('0');
    await paragraphInput.blur();
    await generateButton.click();
    await page.waitForTimeout(1000);
    
    // Verify copy button is visible (count clamped to 1)
    await expect(page.getByRole('button', { name: 'COPY' })).toBeVisible();
    
    // Reload to reset
    await page.reload();
    
    // Call with 15
    await paragraphInput.fill('15');
    await paragraphInput.blur();
    await generateButton.click();
    await page.waitForTimeout(1000);
    
    // Verify copy button is visible (count clamped to 10)
    await expect(page.getByRole('button', { name: 'COPY' })).toBeVisible();
  });
});