import { describe, test } from '@e2e-dev/web';
import { expect } from 'e2e';

describe('SEO Tests', () => {
  test('Page Metadata', { requires: ['browser'] }, async ({ app, browser }) => {
    await app.open('/');

    expect(await browser.title()).toBe('Lumon Ipsum Generator | Severance-themed Lorem Ipsum Text');
    await expect(browser.locator('meta[name="description"]')).toHaveAttribute(
      'content',
      'Generate Severance-themed placeholder text for your design projects. Corporate-approved Lorem Ipsum with Lumon Industries flavor. Please enjoy all paragraphs equally.',
    );
  });

  test('Semantic HTML', async ({ app, screen }) => {
    await app.open('/');

    await expect(screen.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(screen.getByRole('main')).toBeVisible();
  });
});
