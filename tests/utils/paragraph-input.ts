import type { Browser } from '@e2e-dev/web';

export async function blurParagraphInput(browser: Browser) {
  await browser.evaluate(() => {
    const input = document.querySelector('[data-testid="paragraphs-input"]');
    if (input instanceof HTMLElement) input.blur();
    return null;
  });
}
