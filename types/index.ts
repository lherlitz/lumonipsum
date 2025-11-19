export interface MDRNumbersProps {
  className?: string;
}

export interface StructuredDataProps {
  url?: string;
}

export interface GeneratorState {
  paragraphs: number;
  generatedText: string[];
  copied: boolean;
  showCursor: boolean;
}

export interface Position {
  x: number;
  y: number;
}