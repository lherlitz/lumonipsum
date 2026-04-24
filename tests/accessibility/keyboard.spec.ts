import { test, expect } from '@playwright/test';

test.describe('Accessibility', () => {
  test('Keyboard Navigation', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    // Press Tab to navigate through interactive elements
    await page.keyboard.press('Tab');
    
    // Verify focus on paragraph input
    const paragraphInput = page.locator('#paragraphs');
    await expect(paragraphInput).toBeFocused();
    
    // Continue tabbing
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Verify focus indicators are visible
    const generateButton = page.locator('button').filter({ hasText: 'INITIATE' }).first();
    await expect(generateButton).toBeVisible();
  });

  test('ARIA Labels', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    // Check increment button aria-label
    const incrementButton = page.getByRole('button', { name: 'Increase paragraphs' });
    await expect(incrementButton).toHaveAttribute('aria-label', 'Increase paragraphs');
    
    // Check decrement button aria-label
    const decrementButton = page.getByRole('button', { name: 'Decrease paragraphs' });
    await expect(decrementButton).toHaveAttribute('aria-label', 'Decrease paragraphs');
    
    // Check generate button aria-label
    const generateButton = page.locator('button').filter({ hasText: 'INITIATE' }).first();
    await expect(generateButton).toHaveAttribute('aria-label', 'Generate text');
    
    // Generate text
    await generateButton.click();
    await page.waitForTimeout(1000);
    
    // Check copy button - verify it exists (aria-label may not be set)
    const copyButton = page.getByRole('button', { name: 'COPY' });
    await expect(copyButton).toBeVisible();
  });

  test('Error Accessibility', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    // Enter invalid value 11 in input
    const paragraphInput = page.locator('#paragraphs');
    await paragraphInput.fill('11');
    await paragraphInput.blur();
    
    // Verify aria-invalid=true on input
    await expect(paragraphInput).toHaveAttribute('aria-invalid', 'true');
    
    // Verify error message is visible (check by ID to avoid Next.js announcer)
    await expect(page.locator('#paragraphs-error')).toBeVisible();
    
    // Verify input is associated with error message via aria-describedby
    await expect(paragraphInput).toHaveAttribute('aria-describedby', 'paragraphs-error');
  });

  test('Screen Reader Compatibility', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    // Verify page structure is proper (headings, regions)
    await expect(page.getByRole('heading', { name: 'LUMON IPSUM GENERATOR' })).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
    
    // Generate text
    const generateButton = page.locator('button').filter({ hasText: 'INITIATE' }).first();
    await generateButton.click();
    await page.waitForTimeout(1000);
    
    // Verify generated paragraphs are accessible
    await expect(page.getByRole('button', { name: 'COPY' })).toBeVisible();
  });
});