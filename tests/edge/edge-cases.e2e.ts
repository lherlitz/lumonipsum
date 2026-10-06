import { describe, test } from '@e2e-dev/web';
import { expect } from 'e2e';
import { installClipboard, readClipboard } from '../utils/clipboard';
import { blurParagraphInput } from '../utils/paragraph-input';

describe('Edge Cases', () => {
  test('First Time Visit', async ({ app, screen }) => {
    await app.open('/');

    await expect(screen.getByRole('main')).toBeVisible();
    await expect(screen.getByRole('heading', 'LUMON IPSUM GENERATOR')).toBeVisible();
    await expect(screen.getByTestId('mdr-numbers')).toBeVisible();
  });

  test('Page Refresh', { requires: ['browser'] }, async ({ app, screen, browser }) => {
    await app.open('/');

    const paragraphInput = screen.getByTestId('paragraphs-input');
    await paragraphInput.fill('7');
    await blurParagraphInput(browser);

    await browser.reload();

    await expect(paragraphInput).toHaveValue('3');
  });

  test('Rapid Generation Clicks', async ({ app, screen }) => {
    await app.open('/');

    const generateButton = screen.getByTestId('generate-button');
    for (let i = 0; i < 5; i++) {
      await generateButton.click();
    }

    await expect(screen.getByTestId('generated-text')).toBeVisible();
    await expect(screen.getByTestId('generated-paragraph')).toHaveCount(3);

    const texts = await screen.getByTestId('generated-paragraph').allTextContents();
    expect(new Set(texts).size).toBe(texts.length);
  });

  test('JavaScript Error Handling', async ({ app, screen }) => {
    await app.open('/');

    await screen.getByTestId('generate-button').click();
    await expect(screen.getByTestId('generated-text')).toBeVisible();
    await expect(screen.getByRole('main')).toBeVisible();
  });

  test('Large Text Volume', { requires: ['browser'] }, async ({ app, agent, screen, browser }) => {
    await installClipboard(browser);
    await app.open('/');

    const paragraphInput = screen.getByTestId('paragraphs-input');
    await paragraphInput.fill('10');
    await blurParagraphInput(browser);
    await screen.getByTestId('generate-button').click();
    await expect(screen.getByTestId('generated-text')).toBeVisible();
    await expect(screen.getByTestId('generated-paragraph')).toHaveCount(10);

    const box = await screen.getByTestId('generated-text').boundingBox();
    const viewportWidth = await browser.evaluate(() => window.innerWidth);
    expect(box).not.toBeNull();
    expect(box?.width).toBeLessThanOrEqual(viewportWidth);

    const paragraphs = await screen.getByTestId('generated-paragraph').allTextContents();
    await agent.act('copy the generated text');
    expect(await readClipboard(browser)).toBe(paragraphs.join('\n\n'));
    await expect(screen.getByRole('button', { name: /copy/i })).toBeVisible();
  });
});
