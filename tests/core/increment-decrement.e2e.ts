import { describe, test } from '@e2e-dev/web';
import { expect } from 'e2e';

describe('Core Functionality', () => {
  test('Increment Paragraph Count', async ({ app, screen }) => {
    await app.open('/');

    const incrementButton = screen.getByRole('button', 'Increase paragraphs');
    const paragraphInput = screen.getByTestId('paragraphs-input');

    await incrementButton.click();
    await expect(paragraphInput).toHaveValue('4');

    await incrementButton.click();
    await expect(paragraphInput).toHaveValue('5');
  });

  test('Decrement Paragraph Count', async ({ app, screen }) => {
    await app.open('/');

    await screen.getByRole('button', 'Decrease paragraphs').click();
    await expect(screen.getByTestId('paragraphs-input')).toHaveValue('2');
  });

  test('Minimum Paragraph Count Enforcement', async ({ app, agent, screen }) => {
    await app.open('/');

    await agent.act('decrease the paragraph count until it will not go any lower');

    await expect(screen.getByTestId('paragraphs-input')).toHaveValue('1');
    await expect(screen.getByText('Please enter a number between 1 and 10')).not.toBeVisible();
  });

  test('Maximum Paragraph Count Enforcement', async ({ app, agent, screen }) => {
    await app.open('/');

    await agent.act('increase the paragraph count to 10');

    await expect(screen.getByTestId('paragraphs-input')).toHaveValue('10');
    await screen.getByRole('button', 'Increase paragraphs').click();
    await expect(screen.getByTestId('paragraphs-input')).toHaveValue('10');
    await expect(screen.getByText('Please enter a number between 1 and 10')).not.toBeVisible();
  });
});
