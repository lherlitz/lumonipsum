import type { Browser } from '@e2e-dev/web';

export async function installClipboard(browser: Browser) {
  await browser.addInitScript(() => {
    const pageWindow = globalThis as typeof globalThis & { __copied?: string };
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText(text: string) {
          pageWindow.__copied = text;
          return Promise.resolve();
        },
        readText() {
          return Promise.resolve(pageWindow.__copied ?? '');
        },
      },
    });
  });
}

export async function readClipboard(browser: Browser) {
  return browser.evaluate(() => {
    return (globalThis as typeof globalThis & { __copied?: string }).__copied ?? '';
  });
}
