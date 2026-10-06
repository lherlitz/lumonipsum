import { describe, test } from '@e2e-dev/web';
import { expect } from 'e2e';
import { blurParagraphInput } from '../utils/paragraph-input';

describe('Core Functionality', () => {
  test('Input Validation - Decimal Values', { requires: ['browser'] }, async ({ app, screen, browser }) => {
    await app.open('/');

    const paragraphInput = screen.getByTestId('paragraphs-input');

    await paragraphInput.fill('');
    await paragraphInput.pressSequentially('3.5');
    await expect(screen.getByText('Please enter a number between 1 and 10')).toBeVisible();
    await expect(paragraphInput).toHaveAttribute('aria-invalid', 'true');

    await paragraphInput.fill('3');
    await blurParagraphInput(browser);
    await expect(paragraphInput).toHaveValue('3');

    await screen.getByRole('button', 'Generate text').click();
    await expect(screen.getByTestId('generated-paragraph')).toHaveCount(3);
  });
});
