import { test, expect } from '@playwright/test';
import { failOnConsoleErrors, assertNoConsoleErrors } from '../utils/console-errors';

test.describe('Browser Compatibility', () => {
  test('Chromium smoke test - generate and copy', async ({ page, browserName }) => {
    test.skip(browserName !== 'chromium', 'Chromium-specific smoke test');
    failOnConsoleErrors(page);
    await page.goto('http://localhost:3000');
    await expect(page.locator('main')).toBeVisible();

    await page.getByTestId('generate-button').click();
    await expect(page.getByTestId('generated-text')).toBeVisible();
    await expect(page.getByRole('button', { name: 'COPY' })).toBeVisible();
    assertNoConsoleErrors(page);
  });

  test('WebKit smoke test - generate and copy', async ({ page, browserName }) => {
    test.skip(browserName !== 'webkit', 'WebKit-specific smoke test');
    failOnConsoleErrors(page);
    await page.goto('http://localhost:3000');
    await expect(page.locator('main')).toBeVisible();

    await page.getByTestId('generate-button').click();
    await expect(page.getByTestId('generated-text')).toBeVisible();
    await expect(page.getByRole('button', { name: 'COPY' })).toBeVisible();
    assertNoConsoleErrors(page);
  });

  test('Firefox smoke test - generate and copy', async ({ page, browserName }) => {
    test.skip(browserName !== 'firefox', 'Firefox-specific smoke test');
    failOnConsoleErrors(page);
    await page.goto('http://localhost:3000');
    await expect(page.locator('main')).toBeVisible();

    await page.getByTestId('generate-button').click();
    await expect(page.getByTestId('generated-text')).toBeVisible();
    await expect(page.getByRole('button', { name: 'COPY' })).toBeVisible();
    assertNoConsoleErrors(page);
  });
});