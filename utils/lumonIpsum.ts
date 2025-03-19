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
  "Page 197 slaps."
];

const fillerWords = [
  "data", "numbers", "work", "refinement", "procedure", "protocol", 
  "department", "wellness", "severance", "corporate", "efficiency",
  "compliance", "standard", "process", "directive"
];

const generateSentence = (): string => {
  const words = [];
  const length = Math.floor(Math.random() * 10) + 8; // 8-18 words
  
  for (let i = 0; i < length; i++) {
    if (Math.random() < 0.15) { // 15% chance to use a filler word
      words.push(fillerWords[Math.floor(Math.random() * fillerWords.length)]);
    } else {
      const commonWords = [
        "the", "be", "to", "of", "and", "a", "in", "that", "have", "for",
        "not", "on", "with", "as", "you", "do", "at", "this", "but", "by"
      ];
      words.push(commonWords[Math.floor(Math.random() * commonWords.length)]);
    }
  }

  // Capitalize first letter
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  return words.join(" ") + ".";
};

const generateParagraph = (): string => {
  const sentences = [];
  const sentenceCount = Math.floor(Math.random() * 3) + 3; // 3-5 sentences
  
  for (let i = 0; i < sentenceCount; i++) {
    if (Math.random() < 0.3) { // 30% chance to include a Lumon phrase
      sentences.push(lumonPhrases[Math.floor(Math.random() * lumonPhrases.length)]);
    } else {
      sentences.push(generateSentence());
    }
  }
  
  return sentences.join(" ");
};

export const generateLumonIpsum = (paragraphs: number): string[] => {
  const result: string[] = [];
  const clampedParagraphs = Math.min(Math.max(paragraphs, 1), 10);
  
  for (let i = 0; i < clampedParagraphs; i++) {
    result.push(generateParagraph());
  }
  
  return result;
}; 