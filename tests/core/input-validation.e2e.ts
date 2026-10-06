import { describe, test } from '@e2e-dev/web';
import { expect } from 'e2e';
import { blurParagraphInput } from '../utils/paragraph-input';

const invalidMessage = 'Please enter a number between 1 and 10';

describe('Core Functionality', () => {
  test('Input Validation - Valid Values', { requires: ['browser'] }, async ({ app, screen, browser }) => {
    await app.open('/');

    const paragraphInput = screen.getByTestId('paragraphs-input');
    const generateButton = screen.getByTestId('generate-button');

    await paragraphInput.fill('5');
    await blurParagraphInput(browser);
    await generateButton.click();
    await expect(screen.getByTestId('generated-text')).toBeVisible();
    await expect(screen.getByTestId('generated-paragraph')).toHaveCount(5);

    await paragraphInput.fill('10');
    await blurParagraphInput(browser);
    await generateButton.click();
    await expect(screen.getByTestId('generated-paragraph')).toHaveCount(10);
  });

  test('Input Validation - Invalid Values', { timeout: 180_000 }, async ({ app, agent, screen }) => {
    await app.open('/');

    for (const value of ['11', '0', '-5', 'abc']) {
      await agent.act('set the paragraph count to {value}', { params: { value } });
      await expect(screen.getByText(invalidMessage)).toBeVisible();
      await expect(screen.getByTestId('paragraphs-input')).toHaveAttribute('aria-invalid', 'true');
    }
  });

  test('Input State Synchronization', async ({ app, agent, screen }) => {
    await app.open('/');

    await agent.act('set the paragraph count to 7, then increase it once and decrease it twice');

    await expect(screen.getByTestId('paragraphs-input')).toHaveValue('6');
  });
});
