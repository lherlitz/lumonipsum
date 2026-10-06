import { describe, test } from '@e2e-dev/web';
import { expect } from 'e2e';
import { installClipboard, readClipboard } from '../utils/clipboard';
import { blurParagraphInput } from '../utils/paragraph-input';

describe('Core Functionality', () => {
  test('Text Generation', async ({ app, screen }) => {
    await app.open('/');

    await screen.getByTestId('generate-button').click();

    await expect(screen.getByTestId('generated-text')).toBeVisible();
    await expect(screen.getByRole('button', 'Copy generated text to clipboard')).toBeVisible();
    await expect(screen.getByTestId('mdr-numbers')).not.toBeVisible();
    await expect(screen.getByTestId('generated-paragraph')).toHaveCount(3);
  });

  test('Generate Single Paragraph', { requires: ['browser'] }, async ({ app, screen, browser }) => {
    await app.open('/');

    const paragraphInput = screen.getByTestId('paragraphs-input');
    await paragraphInput.fill('1');
    await blurParagraphInput(browser);

    await screen.getByTestId('generate-button').click();

    await expect(screen.getByTestId('generated-text')).toBeVisible();
    await expect(screen.getByTestId('generated-paragraph')).toHaveCount(1);
    await expect(screen.getByRole('button', 'Copy generated text to clipboard')).toBeVisible();
  });

  test('Generate Maximum Paragraphs', { requires: ['browser'] }, async ({ app, screen, browser }) => {
    await app.open('/');

    const paragraphInput = screen.getByTestId('paragraphs-input');
    await paragraphInput.fill('10');
    await blurParagraphInput(browser);

    await screen.getByTestId('generate-button').click();

    await expect(screen.getByTestId('generated-text')).toBeVisible();
    await expect(screen.getByTestId('generated-paragraph')).toHaveCount(10);
    await expect(screen.getByRole('button', 'Copy generated text to clipboard')).toBeVisible();
  });

  test('Text Regeneration Clears Previous', async ({ app, screen }) => {
    await app.open('/');

    const generateButton = screen.getByTestId('generate-button');
    await generateButton.click();
    await expect(screen.getByTestId('generated-text')).toBeVisible();

    const initialParagraphs = await screen.getByTestId('generated-paragraph').allTextContents();

    await generateButton.click();
    await expect(screen.getByTestId('generated-text')).toBeVisible();

    const newParagraphs = await screen.getByTestId('generated-paragraph').allTextContents();
    expect(newParagraphs).not.toEqual(initialParagraphs);

    await expect(screen.getByRole('button', 'Copy generated text to clipboard')).toBeVisible();
  });

  test('Copy Generated Text', { requires: ['browser'] }, async ({ app, screen, browser, agent }) => {
    await installClipboard(browser);
    await app.open('/');

    await screen.getByTestId('generate-button').click();
    await expect(screen.getByTestId('generated-text')).toBeVisible();

    const paragraphs = await screen.getByTestId('generated-paragraph').allTextContents();

    await agent.act('copy the generated text');

    expect(await readClipboard(browser)).toBe(paragraphs.join('\n\n'));
    await expect(screen.getByRole('button', { name: /copy/i })).toBeVisible();
  });
});
