import { Page, expect } from '@playwright/test';

export function failOnConsoleErrors(page: Page): void {
  const errors: string[] = [];

  page.on('pageerror', (error) => {
    const message = error.message;
    // Ignore React dev-only eval CSP warning and known Next.js dev warnings
    if (message.includes('eval() is not supported')) return;
    errors.push(`pageerror: ${message}`);
  });

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      const text = msg.text();
      if (text.includes('eval() is not supported')) return;
      if (text.includes('Content-Security-Policy') && text.includes("'unsafe-eval'")) return;
      if (text.includes('[HMR]')) return;
      if (text.includes('[Vercel')) return;
      errors.push(`console.error: ${text}`);
    }
  });

  (page as unknown as { __consoleErrors?: string[] }).__consoleErrors = errors;
}

export function assertNoConsoleErrors(page: Page): void {
  expect((page as unknown as { __consoleErrors?: string[] }).__consoleErrors ?? []).toEqual([]);
}

declare module '@playwright/test' {
  interface Page {
    __consoleErrors?: string[];
  }
}
