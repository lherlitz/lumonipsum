import { test, expect } from '@playwright/test';
import { failOnConsoleErrors, assertNoConsoleErrors } from '../utils/console-errors';

test.describe('Core Functionality', () => {
  test('Initial Page Load', async ({ page }) => {
    failOnConsoleErrors(page);
    await page.goto('http://localhost:3000');

    // Verify main, heading, subtitle
    await expect(page.locator('main')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'LUMON IPSUM GENERATOR' })).toBeVisible();
    await expect(page.getByText('PROTOCOL.GENERATE.TEXT')).toBeVisible();

    // Verify default paragraph count
    const paragraphInput = page.getByTestId('paragraphs-input');
    await expect(paragraphInput).toHaveValue('3');

    // Verify generate button
    const generateButton = page.getByTestId('generate-button');
    await expect(generateButton).toBeVisible();
    await expect(generateButton).toContainText('INITIATE GENERATION');

    // Verify MDR numbers animation container is present
    await expect(page.getByTestId('mdr-numbers')).toBeVisible();

    // Verify footer text
    await expect(page.getByText('COMPLIANCE STATUS: VERIFIED')).toBeVisible();
    await expect(page.getByText('PLEASE ENJOY ALL PARAGRAPHS EQUALLY')).toBeVisible();
    assertNoConsoleErrors(page);
  });
});