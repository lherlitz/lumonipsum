import { existsSync } from 'node:fs';
import type { E2EConfig } from 'e2e';
import { github } from '@e2e-dev/github';
import { web } from '@e2e-dev/web';
import { xai } from '@ai-sdk/xai';

if (existsSync('.env.local')) {
  process.loadEnvFile('.env.local');
}

const app = {
  url: 'http://localhost:3000',
  command: {
    executable: 'npm',
    args: ['run', 'dev'],
    reuseExisting: !process.env.CI,
    startupTimeout: 120_000,
    log: '.e2e/logs/app.log',
  },
};

const desktop = [
  { name: 'chromium', engine: web({ browser: 'chromium' as const }), app },
  { name: 'firefox', engine: web({ browser: 'firefox' as const }), app },
  { name: 'webkit', engine: web({ browser: 'webkit' as const }), app },
];

const sized = [
  {
    name: 'mobile-chrome',
    engine: web({
      browser: 'chromium',
      viewport: { width: 393, height: 851 },
    }),
    app,
  },
  {
    name: 'mobile-safari',
    engine: web({
      browser: 'webkit',
      viewport: { width: 390, height: 844 },
    }),
    app,
  },
  {
    name: 'tablet',
    engine: web({
      browser: 'webkit',
      viewport: { width: 834, height: 1194 },
    }),
    app,
  },
];

export default {
  tests: 'tests/**/*.e2e.ts',
  retries: process.env.CI ? 2 : 0,
  ...(process.env.CI ? { workers: 4 } : {}),
  reporters: ['list', github()],
  trace: process.env.CI ? 'on-first-retry' : 'on',
  video: 'retain-on-failure',
  targets: process.env.CI ? desktop : [...desktop, ...sized],
  agents: {
    default: {
      model: xai('grok-4.7'),
      system: 'You are a thorough QA agent. Verify every outcome.',
      context:
        'This is the Lumon Ipsum generator. The paragraph field sits beside the text "PARAGRAPHS REQUESTED". Increase and decrease are the buttons "Increase paragraphs" and "Decrease paragraphs". Valid counts are integers from 1 to 10. An invalid count shows the alert "Please enter a number between 1 and 10". Generate is the button "INITIATE GENERATION", accessible name "Generate text". Copy is the button "Copy generated text to clipboard" until it succeeds, then "Text copied to clipboard".',
    },
  },
} satisfies E2EConfig;
