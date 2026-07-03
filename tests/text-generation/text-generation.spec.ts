import { test, expect } from '@playwright/test';
import { failOnConsoleErrors, assertNoConsoleErrors } from '../utils/console-errors';

test.describe('Text Generation Tests', () => {
  test('Generate Exactly One Paragraph', async ({ page }) => {
    failOnConsoleErrors(page);
    await page.goto('http://localhost:3000');

    await page.getByTestId('paragraphs-input').fill('1');
    await page.getByTestId('generate-button').click();
    await expect(page.getByTestId('generated-text')).toBeVisible();

    const paragraphs = page.getByTestId('generated-paragraph');
    await expect(paragraphs).toHaveCount(1);
    const text = await paragraphs.first().textContent();
    expect(text).toBeTruthy();
    expect(text!.split(/[.!?]+/).filter(Boolean).length).toBeGreaterThan(0);
    assertNoConsoleErrors(page);
  });

  test('Generate Five Paragraphs', async ({ page }) => {
    failOnConsoleErrors(page);
    await page.goto('http://localhost:3000');

    await page.getByTestId('paragraphs-input').fill('5');
    await page.getByTestId('generate-button').click();
    await expect(page.getByTestId('generated-paragraph')).toHaveCount(5);
    assertNoConsoleErrors(page);
  });

  test('Generate Ten Paragraphs', async ({ page }) => {
    failOnConsoleErrors(page);
    await page.goto('http://localhost:3000');

    await page.getByTestId('paragraphs-input').fill('10');
    await page.getByTestId('generate-button').click();
    await expect(page.getByTestId('generated-paragraph')).toHaveCount(10);
    assertNoConsoleErrors(page);
  });

  test('Sentence Structure', async ({ page }) => {
    failOnConsoleErrors(page);
    await page.goto('http://localhost:3000');

    await page.getByTestId('generate-button').click();
    await expect(page.getByTestId('generated-text')).toBeVisible();

    const paragraphs = page.getByTestId('generated-paragraph');
    const count = await paragraphs.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const text = await paragraphs.nth(i).textContent();
      expect(text).toBeTruthy();
      const sentences = text!.split(/[.!?]+/).filter(Boolean);
      expect(sentences.length).toBeGreaterThan(0);
      for (const sentence of sentences) {
        expect(sentence.trim()[0]).toMatch(/[A-Z]/);
      }
    }
    assertNoConsoleErrors(page);
  });

  test('Text Randomness', async ({ page }) => {
    failOnConsoleErrors(page);
    await page.goto('http://localhost:3000');

    await page.getByTestId('generate-button').click();
    await expect(page.getByTestId('generated-text')).toBeVisible();
    const first = await page.getByTestId('generated-paragraph').allTextContents();

    await page.getByTestId('generate-button').click();
    await expect(page.getByTestId('generated-text')).toBeVisible();
    const second = await page.getByTestId('generated-paragraph').allTextContents();

    expect(first).not.toEqual(second);
    assertNoConsoleErrors(page);
  });

  test('Paragraph Count Clamping', async ({ page }) => {
    failOnConsoleErrors(page);
    await page.goto('http://localhost:3000');

    const paragraphInput = page.getByTestId('paragraphs-input');
    const generateButton = page.getByTestId('generate-button');

    await paragraphInput.fill('0');
    await paragraphInput.blur();
    await expect(page.getByTestId('generated-paragraph')).toHaveCount(0);
    await generateButton.click();
    await expect(page.getByTestId('generated-paragraph')).toHaveCount(1);

    await page.reload();
    await paragraphInput.fill('15');
    await paragraphInput.blur();
    await expect(page.getByTestId('generated-paragraph')).toHaveCount(0);
    await generateButton.click();
    await expect(page.getByTestId('generated-paragraph')).toHaveCount(10);
    assertNoConsoleErrors(page);
  });
});
