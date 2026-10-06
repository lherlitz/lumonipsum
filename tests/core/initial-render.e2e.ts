import { describe, test } from '@e2e-dev/web';
import { expect } from 'e2e';

describe('Core Functionality', () => {
  test('Initial Page Load', async ({ app, screen }) => {
    await app.open('/');

    await expect(screen.getByRole('main')).toBeVisible();
    await expect(screen.getByRole('heading', 'LUMON IPSUM GENERATOR')).toBeVisible();
    await expect(screen.getByText('PROTOCOL.GENERATE.TEXT')).toBeVisible();
    await expect(screen.getByTestId('paragraphs-input')).toHaveValue('3');

    const generateButton = screen.getByTestId('generate-button');
    await expect(generateButton).toBeVisible();
    await expect(generateButton).toContainText('INITIATE GENERATION');

    await expect(screen.getByTestId('mdr-numbers')).toBeVisible();
    await expect(screen.getByText('COMPLIANCE STATUS: VERIFIED')).toBeVisible();
    await expect(screen.getByText('PLEASE ENJOY ALL PARAGRAPHS EQUALLY')).toBeVisible();
  });
});
