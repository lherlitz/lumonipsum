import { generateLumonIpsum } from './lumon-ipsum';

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
      // Mock to force Lumon phrases and pick first phrase
      mockRandom.mockImplementation(() => 0.0); // < 0.3 for Lumon, 0 for first phrase

      const result = generateLumonIpsum(1);
      const paragraph = result[0];
      expect(paragraph).toContain("Please enjoy each number equally.");
    });

    it('should generate sentences with proper structure', () => {
      // Mock for generated sentence
      mockRandom.mockImplementation(() => 0.5); // > 0.3 for sentence, length 8-18

      const result = generateLumonIpsum(1);
      const paragraph = result[0];
      expect(paragraph).toMatch(/^[A-Z]/); // Starts with capital
      expect(paragraph.endsWith('.')).toBe(true); // Ends with .
      const sentences = paragraph.split('. ');
      expect(sentences.length).toBeGreaterThanOrEqual(4);
      expect(sentences.length).toBeLessThanOrEqual(6);
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