import { test, expect } from '@playwright/test';
import { failOnConsoleErrors, assertNoConsoleErrors } from '../utils/console-errors';

test.describe('SEO Tests', () => {
  test('Page Metadata', async ({ page }) => {
    failOnConsoleErrors(page);
    await page.goto('http://localhost:3000');

    const title = await page.title();
    expect(title).toBe('Lumon Ipsum Generator | Severance-themed Lorem Ipsum Text');

    const description = page.locator('meta[name="description"]');
    await expect(description).toHaveAttribute(
      'content',
      'Generate Severance-themed placeholder text for your design projects. Corporate-approved Lorem Ipsum with Lumon Industries flavor. Please enjoy all paragraphs equally.'
    );
    assertNoConsoleErrors(page);
  });

  test('Semantic HTML', async ({ page }) => {
    failOnConsoleErrors(page);
    await page.goto('http://localhost:3000');

    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
    assertNoConsoleErrors(page);
  });
});
