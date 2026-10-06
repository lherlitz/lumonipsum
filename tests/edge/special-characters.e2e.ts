import { describe, test } from '@e2e-dev/web';
import { expect } from 'e2e';

describe('Edge Cases', () => {
  test('Special Characters in Generated Text', async ({ app, screen }) => {
    await app.open('/');

    const generateButton = screen.getByRole('button', 'Generate text');
    let checkedParagraphs = 0;

    for (let i = 0; i < 5; i++) {
      await generateButton.click();
      const paragraphs = screen.getByTestId('generated-paragraph');
      await expect(paragraphs.first()).toBeVisible();
      const texts = await paragraphs.allTextContents();
      for (const text of texts) {
        expect(text).toBeTruthy();
        expect(text).not.toContain('\uFFFD');
        expect(text).not.toMatch(/<script\b/i);
        checkedParagraphs++;
      }
    }

    expect(checkedParagraphs).toBeGreaterThan(0);
  });
});
