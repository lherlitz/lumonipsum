import { test, expect } from '@playwright/test';

test.describe('Edge Cases', () => {
  test('Special Characters in Generated Text', async ({ page }) => {
    await page.goto('http://localhost:3000');

    const generateButton = page.getByRole('button', { name: 'Generate text' });

    let checkedParagraphs = 0;
    // 1. Generate text multiple times and inspect content for invalid characters
    for (let i = 0; i < 5; i++) {
      await generateButton.click();
      const paragraphs = page.locator('[data-testid="generated-paragraph"]');
      await expect(paragraphs.first()).toBeVisible();
      const count = await paragraphs.count();
      for (let j = 0; j < count; j++) {
        const text = await paragraphs.nth(j).textContent();
        expect(text).toBeTruthy();
        // 2. Verify no broken replacement characters
        expect(text).not.toContain('\uFFFD');
        // 3. Verify no HTML tags leaked into rendered text (React escapes output)
        expect(text).not.toMatch(/<script\b/i);
        checkedParagraphs++;
      }
    }

    expect(checkedParagraphs).toBeGreaterThan(0);
  });
});
