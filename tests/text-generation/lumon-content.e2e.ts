import { describe, test } from '@e2e-dev/web';
import { expect } from 'e2e';

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
  'You are not your job. You are not how much money you have in the bank.',
];

const knownTerms = [
  'data',
  'numbers',
  'refinement',
  'department',
  'severance',
  'Kier',
  'protocol',
  'compliance',
  'corporate',
];

describe('Text Generation Tests', () => {
  test('Lumon Phrases Inclusion and Terminology', async ({ app, screen }) => {
    await app.open('/');

    const generateButton = screen.getByRole('button', 'Generate text');
    let foundPhrase = false;
    let foundTerm = false;
    let combinedText = '';

    for (let i = 0; i < 10 && !(foundPhrase && foundTerm); i++) {
      await generateButton.click();
      const paragraphs = screen.getByTestId('generated-paragraph');
      await expect(paragraphs.first()).toBeVisible();
      const texts = await paragraphs.allTextContents();
      combinedText += ` ${texts.join(' ')}`;
      foundPhrase = knownPhrases.some((phrase) => combinedText.includes(phrase));
      foundTerm = knownTerms.some((term) => combinedText.toLowerCase().includes(term.toLowerCase()));
    }

    expect(foundPhrase).toBe(true);
    expect(foundTerm).toBe(true);
  });
});
