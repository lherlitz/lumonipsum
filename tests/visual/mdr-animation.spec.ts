import { test, expect } from '@playwright/test';

test.describe('Visual Tests', () => {
  test('MDR Numbers Animation', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // 1. Verify MDR numbers container is present and populated before generation
    const mdrContainer = page.locator('[data-testid="mdr-numbers"]');
    await expect(mdrContainer).toBeVisible();
    await expect(mdrContainer.locator('span').first()).toBeVisible();

    // 2. Verify the container uses animation-related styles (CSS transition)
    const firstSpan = mdrContainer.locator('span').first();
    await expect(firstSpan).toHaveCSS('transition', /opacity/);

    // 3. Generate text
    await page.getByRole('button', { name: 'Generate text' }).click();

    // 4. Verify MDR numbers disappear after text generation
    await expect(mdrContainer).not.toBeVisible();
    await expect(page.locator('[data-testid="generated-text"]')).toBeVisible();
  });
});
