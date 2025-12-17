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

const fillerWords = [
  "data", "numbers", "work", "refinement", "procedure", "protocol",
  "department", "wellness", "severance", "corporate", "efficiency",
  "compliance", "standard", "process", "directive", "goat", "egg",
  "woe", "frolic", "dread", "malice"
];

const commonWords = [
  "the", "be", "to", "of", "and", "a", "in", "that", "have", "for",
  "not", "on", "with", "as", "you", "do", "at", "this", "but", "by"
];

const generateSentence = (): string => {
  const words = [];
  const length = Math.floor(Math.random() * 10) + 8; // 8-18 words

  for (let i = 0; i < length; i++) {
    if (Math.random() < 0.15) { // 15% chance to use a filler word
      words.push(fillerWords[Math.floor(Math.random() * fillerWords.length)]);
    } else {
      words.push(commonWords[Math.floor(Math.random() * commonWords.length)]);
    }
  }

  // Capitalize first letter
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  return words.join(" ") + ".";
};

const generateParagraph = (): string => {
  const sentences = [];
  const sentenceCount = Math.floor(Math.random() * 3) + 4; // 4-6 sentences

  for (let i = 0; i < sentenceCount; i++) {
    if (Math.random() < 0.3) { // 30% chance to include a Lumon phrase
      let phrase = lumonPhrases[Math.floor(Math.random() * lumonPhrases.length)];
      if (!/[.!?]$/.test(phrase)) {
        phrase += '.';
      }
      sentences.push(phrase);
    } else {
      sentences.push(generateSentence());
    }
  }

  return sentences.join(" ");
};

export const generateLumonIpsum = (paragraphs: number): string[] => {
  const result: string[] = [];
  // Ensure paragraphs is an integer and clamp to valid range
  const clampedParagraphs = Math.min(Math.max(Math.floor(paragraphs), 1), 10);

  for (let i = 0; i < clampedParagraphs; i++) {
    result.push(generateParagraph());
  }

  return result;
};