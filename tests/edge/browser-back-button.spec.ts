import { test, expect } from '@playwright/test';

test.describe('Edge Cases', () => {
  test('Browser Back Navigation', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // 1. Generate some text
    await page.getByRole('button', { name: 'Generate text' }).click();
    await expect(page.locator('[data-testid="generated-text"]')).toBeVisible();

    // 2. Push another history entry so there is a previous page to return to
    await page.evaluate(() => { history.pushState({}, '', '/?ref=forward'); });

    // 3. Click browser back button
    await page.evaluate(() => { history.back(); });

    // 4. Verify the page URL returns to the original state and still renders correctly
    await expect(page).toHaveURL('http://localhost:3000/');
    await expect(page.getByRole('heading', { name: 'LUMON IPSUM GENERATOR' })).toBeVisible();
  });
});
