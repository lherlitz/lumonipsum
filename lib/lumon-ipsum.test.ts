import { generateLumonIpsum } from './lumon-ipsum';

// Import phrases for testing
const lumonPhrases = [
  "Please enjoy each number equally.",
  "The work is mysterious and important.",
  "Music Dance Experience",
  "Praise Kier",
  "Remember the three tempers: Woe, Frolic, and Dread",
  "You have found peace in your work",
  "Your outie loves you very much",
  "The refinement process is sacred",
  "A handshake is available upon request",
  "May you find peace in the numbers",
  "The data must be refined",
  "Your work will be sorted and filed",
  "A clean cut is crucial to success",
  "We serve Kier",
  "Through Kier, all things are possible",
  "Page 197 slaps.",
  "Hell is just the product of a morbid human imagination. The bad news is whatever humans can imagine they can usually create.",
  "The surest way to tame a prisoner is to let him believe he's free",
  "Tame thy tempers.",
  "Render not my creation in miniature.",
  "And I shall whisper to ye dutiful through the ages. In your noblest thoughts and epiphanies shall be my voice. You are my mouth, and through ye, I will whisper on when I am 10 centuries demised.",
  "The remembered man does not decay.",
  "Let not weakness live in your veins.",
  "Be content in my words, and dally not in the scholastic pursuits of lesser men.",
  "Come now, children of my industry, and know the children of my blood.",
  "And all in Lumon's care shall revel in the bounty of the incentives spur.",
  "What a funny speech you gave at the party.I was cross with you after. I threw a tin of candies.",
  "I'm Duly Swamped.",
  "Go lick a boot, Mark!"
];

describe('generateLumonIpsum', () => {
  const mockRandom = jest.spyOn(Math, 'random');

  afterEach(() => {
    mockRandom.mockRestore();
  });

  describe('paragraph count validation', () => {
    it('should generate 1 paragraph when input is 0', () => {
      const result = generateLumonIpsum(0);
      expect(result).toHaveLength(1);
    });

    it('should generate 1 paragraph when input is 1', () => {
      const result = generateLumonIpsum(1);
      expect(result).toHaveLength(1);
    });

    it('should generate 10 paragraphs when input is 10', () => {
      const result = generateLumonIpsum(10);
      expect(result).toHaveLength(10);
    });

    it('should generate 10 paragraphs when input is 11', () => {
      const result = generateLumonIpsum(11);
      expect(result).toHaveLength(10);
    });

    it('should generate 5 paragraphs when input is 5', () => {
      const result = generateLumonIpsum(5);
      expect(result).toHaveLength(5);
    });
  });

  describe('sentence generation logic', () => {
    beforeEach(() => {
      mockRandom.mockReturnValue(0.5);
    });

    it('should generate a paragraph with deterministic output when random is mocked', () => {
      // Mock random to control sentence count (4 sentences), and force Lumon phrases
      mockRandom.mockReturnValue(0.1); // sentenceCount = floor(0.1*3)+4 = 4
      // For each sentence, random < 0.3 -> Lumon phrase

      const result = generateLumonIpsum(1);
      expect(result).toHaveLength(1);
      expect(typeof result[0]).toBe('string');
      expect(result[0].split(' ').length).toBeGreaterThan(0);
    });

    it('should include Lumon phrases in output', () => {
      // Mock to force Lumon phrases
      mockRandom.mockReturnValue(0.0); // < 0.3 for Lumon

      const result = generateLumonIpsum(1);
      const paragraph = result[0];
      const hasLumonPhrase = lumonPhrases.some(phrase => paragraph.includes(phrase));
      expect(hasLumonPhrase).toBe(true);
    });

    it('should generate sentences with proper structure', () => {
      // Mock for generated sentence
      // mockRandom.mockImplementation(() => 0.5); // > 0.3 for sentence, length 8-18

      const result = generateLumonIpsum(1);
      const paragraph = result[0];
      expect(paragraph).toMatch(/^[A-Z]/); // Starts with capital
      expect(paragraph).toMatch(/[.!?]$/); // Ends with punctuation
      const sentences = paragraph.split(/[.!?]\s+/).filter(s => s.length > 0);
      expect(sentences.length).toBeGreaterThanOrEqual(4);
      expect(sentences.length).toBeLessThanOrEqual(7);
    });

    it('should handle edge case with minimum random values', () => {
      mockRandom.mockReturnValue(0); // sentenceCount=4, length=8, no filler, no Lumon

      const result = generateLumonIpsum(1);
      expect(result).toHaveLength(1);
      const paragraph = result[0];
      const sentences = paragraph.split(' ');
      expect(sentences.length).toBeGreaterThan(0);
    });

    it('should handle edge case with maximum random values', () => {
      mockRandom.mockReturnValue(0.99); // sentenceCount=6, length=17, filler, Lumon

      const result = generateLumonIpsum(1);
      expect(result).toHaveLength(1);
    });
  });

  describe('output format', () => {
    it('should return an array of strings', () => {
      const result = generateLumonIpsum(3);
      expect(Array.isArray(result)).toBe(true);
      result.forEach(paragraph => {
        expect(typeof paragraph).toBe('string');
      });
    });

    it('should generate non-empty paragraphs', () => {
      const result = generateLumonIpsum(2);
      result.forEach(paragraph => {
        expect(paragraph.length).toBeGreaterThan(0);
      });
    });
  });
});