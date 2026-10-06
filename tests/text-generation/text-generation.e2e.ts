import { describe, test } from '@e2e-dev/web';
import { expect } from 'e2e';
import { blurParagraphInput } from '../utils/paragraph-input';

describe('Text Generation Tests', () => {
  test('Generate Exactly One Paragraph', { requires: ['browser'] }, async ({ app, screen, browser }) => {
    await app.open('/');

    await screen.getByTestId('paragraphs-input').fill('1');
    await blurParagraphInput(browser);
    await screen.getByTestId('generate-button').click();
    await expect(screen.getByTestId('generated-text')).toBeVisible();

    const paragraphs = screen.getByTestId('generated-paragraph');
    await expect(paragraphs).toHaveCount(1);
    const text = await paragraphs.first().textContent();
    expect(text).toBeTruthy();
    expect(text.split(/[.!?]+/).filter(Boolean).length).toBeGreaterThan(0);
  });

  test('Generate Five Paragraphs', async ({ app, screen }) => {
    await app.open('/');

    await screen.getByTestId('paragraphs-input').fill('5');
    await screen.getByTestId('generate-button').click();
    await expect(screen.getByTestId('generated-paragraph')).toHaveCount(5);
  });

  test('Generate Ten Paragraphs', async ({ app, screen }) => {
    await app.open('/');

    await screen.getByTestId('paragraphs-input').fill('10');
    await screen.getByTestId('generate-button').click();
    await expect(screen.getByTestId('generated-paragraph')).toHaveCount(10);
  });

  test('Sentence Structure', async ({ app, screen }) => {
    await app.open('/');

    await screen.getByTestId('generate-button').click();
    await expect(screen.getByTestId('generated-text')).toBeVisible();

    const paragraphs = screen.getByTestId('generated-paragraph');
    const count = await paragraphs.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const text = await paragraphs.nth(i).textContent();
      expect(text).toBeTruthy();
      const sentences = text.split(/[.!?]+/).filter(Boolean);
      expect(sentences.length).toBeGreaterThan(0);
      for (const sentence of sentences) {
        expect(sentence.trim()[0]).toMatch(/[A-Z]/);
      }
    }
  });

  test('Text Randomness', async ({ app, screen }) => {
    await app.open('/');

    await screen.getByTestId('generate-button').click();
    await expect(screen.getByTestId('generated-text')).toBeVisible();
    const first = await screen.getByTestId('generated-paragraph').allTextContents();

    await screen.getByTestId('generate-button').click();
    await expect(screen.getByTestId('generated-text')).toBeVisible();
    const second = await screen.getByTestId('generated-paragraph').allTextContents();

    expect(first).not.toEqual(second);
  });

  test('Paragraph Count Clamping', { requires: ['browser'] }, async ({ app, screen, browser }) => {
    await app.open('/');

    const paragraphInput = screen.getByTestId('paragraphs-input');
    const generateButton = screen.getByTestId('generate-button');

    await paragraphInput.fill('0');
    await blurParagraphInput(browser);
    await expect(screen.getByTestId('generated-paragraph')).toHaveCount(0);
    await generateButton.click();
    await expect(screen.getByTestId('generated-paragraph')).toHaveCount(1);

    await browser.reload();
    await paragraphInput.fill('15');
    await blurParagraphInput(browser);
    await expect(screen.getByTestId('generated-paragraph')).toHaveCount(0);
    await generateButton.click();
    await expect(screen.getByTestId('generated-paragraph')).toHaveCount(10);
  });
});
