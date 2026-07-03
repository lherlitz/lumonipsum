import { test, expect } from '@playwright/test';

test.describe('Text Generation Tests', () => {
  test('Lumon Phrases Inclusion and Terminology', async ({ page }) => {
    await page.goto('http://localhost:3000');

    const generateButton = page.getByRole('button', { name: 'Generate text' });
    const knownPhrases = [
      'Please enjoy each number equally',
      'The work is mysterious and important',
      'Music Dance Experience',
      'Praise Kier',
      'Remember the three tempers',
      'You have found peace in your work',
      'Your outie loves you very much',
      'The refinement process is sacred',
      'A handshake is available upon request',
      'May you find peace in the numbers',
      'The data must be refined',
      'Your work will be sorted and filed',
      'A clean cut is crucial to success',
      'We serve Kier',
      'Through Kier, all things are possible',
      'Tame thy tempers',
      'Render not my creation in miniature',
      'The remembered man does not decay',
      'Let not weakness live in your veins',
      'We must be cut to heal',
      'I am sorry, Mark. I am not a person',
      'You are not your job. You are not how much money you have in the bank.'
    ];
    const knownTerms = ['data', 'numbers', 'refinement', 'department', 'severance', 'Kier', 'protocol', 'compliance', 'corporate'];

    let foundPhrase = false;
    let foundTerm = false;
    let combinedText = '';

    // 1. Generate text multiple times
    for (let i = 0; i < 10; i++) {
      await generateButton.click();
      const paragraphs = page.locator('[data-testid="generated-paragraph"]');
      await expect(paragraphs.first()).toBeVisible();
      const count = await paragraphs.count();
      for (let j = 0; j < count; j++) {
        const text = await paragraphs.nth(j).textContent();
        if (text) combinedText += ' ' + text;
      }
      if (!foundPhrase && knownPhrases.some((phrase) => combinedText.includes(phrase))) {
        foundPhrase = true;
      }
      if (!foundTerm && knownTerms.some((term) => combinedText.toLowerCase().includes(term.toLowerCase()))) {
        foundTerm = true;
      }
      if (foundPhrase && foundTerm) break;
    }

    // 2. Verify Lumon phrases appear at least once across multiple generations
    expect(foundPhrase, `Expected a known Lumon phrase in combined text: ${combinedText.slice(0, 200)}`).toBe(true);

    // 3. Verify Lumon-specific terminology appears
    expect(foundTerm, `Expected a known Lumon term in combined text: ${combinedText.slice(0, 200)}`).toBe(true);
  });
});
