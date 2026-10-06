import { describe, test } from '@e2e-dev/web';
import { expect } from 'e2e';

describe('Visual Tests', () => {
  test('Terminal Aesthetic', { requires: ['browser'] }, async ({ app, screen, browser }) => {
    await app.open('/');

    await expect(screen.getByRole('main')).toBeVisible();

    const bodyColor = await browser.evaluate(() => getComputedStyle(document.body).backgroundColor);
    expect(bodyColor).toBe('rgb(14, 26, 38)');

    await expect(browser.locator('.terminal-screen')).toBeVisible();

    const terminalStyle = await browser.evaluate(() => {
      const terminal = document.querySelector('.terminal-screen');
      if (!terminal) return { color: '', fontFamily: '' };
      const style = getComputedStyle(terminal);
      return { color: style.color, fontFamily: style.fontFamily };
    });
    expect(terminalStyle.color).toBe('rgb(175, 203, 214)');
    expect(terminalStyle.fontFamily).toContain('monospace');

    await expect(browser.locator('[class*="animate-pulse"]')).toHaveCount(2);
  });

  test('Mobile Responsive Layout', { requires: ['browser'] }, async ({ app, screen, browser }) => {
    await browser.setViewport({ width: 375, height: 667 });
    await app.open('/');

    await expect(screen.getByRole('main')).toBeVisible();
    await expect(screen.getByTestId('generate-button')).toBeVisible();
    await expect(screen.getByTestId('generate-button')).toBeEnabled();

    const widths = await browser.evaluate(() => ({
      body: document.body.scrollWidth,
      viewport: window.innerWidth,
    }));
    expect(widths.body).toBeLessThanOrEqual(widths.viewport + 1);
  });

  test('Tablet Responsive Layout', { requires: ['browser'] }, async ({ app, screen, browser }) => {
    await browser.setViewport({ width: 768, height: 1024 });
    await app.open('/');

    await expect(screen.getByRole('main')).toBeVisible();
    await expect(screen.getByTestId('generate-button')).toBeVisible();
  });

  test('Desktop Responsive Layout', { requires: ['browser'] }, async ({ app, screen, browser }) => {
    await browser.setViewport({ width: 1280, height: 800 });
    await app.open('/');

    await expect(screen.getByRole('main')).toBeVisible();
    await expect(browser.locator('.max-w-4xl')).toBeVisible();

    const box = await browser.locator('.max-w-4xl').boundingBox();
    expect(box).not.toBeNull();
    expect(box?.width).toBeLessThanOrEqual(1280);
  });
});
