'use client';

import { useState, useRef } from 'react';
import { generateLumonIpsum } from '@/lib/lumon-ipsum';
import { useCursorAnimation } from '@/hooks/use-cursor-animation';
import MDRNumbers from '@/features/mdr-numbers';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { TerminalScreen } from '@/ui/terminal-screen';
import { GeneratedText } from '@/ui/generated-text';

export default function Home() {
  const [paragraphs, setParagraphs] = useState<number>(3);
  const [generatedText, setGeneratedText] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [inputError, setInputError] = useState<string>('');
  const showCursor = useCursorAnimation();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleGenerate = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setGeneratedText([]);
    setTimeout(() => {
      const text = generateLumonIpsum(paragraphs);
      setGeneratedText(text);
    }, 500);
    setCopied(false);
    setCopyError(false);
    setInputError('');
    // Sync input value to current paragraphs value
    if (inputRef.current) {
      inputRef.current.value = paragraphs.toString();
    }
  };

  const incrementParagraphs = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setParagraphs(prev => {
      const newValue = Math.min(prev + 1, 10);
      if (inputRef.current) {
        inputRef.current.value = newValue.toString();
      }
      return newValue;
    });
    setInputError('');
  };

  const decrementParagraphs = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setParagraphs(prev => {
      const newValue = Math.max(prev - 1, 1);
      if (inputRef.current) {
        inputRef.current.value = newValue.toString();
      }
      return newValue;
    });
    setInputError('');
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedText.join('\n\n'));
      setCopied(true);
      setCopyError(false);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.warn('Failed to copy to clipboard:', error);
      setCopyError(true);
      setTimeout(() => setCopyError(false), 3000);
    }
  };

  return (
    <main className="min-h-screen p-4 sm:p-8 flex items-center justify-center bg-[#0e1a26]">
      <div className="w-full max-w-4xl">
        <TerminalScreen>
          <div className="text-center space-y-2 mb-12">
            <div className="flex items-center justify-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-[#afcbd6] animate-pulse"></div>
              <h1 className="text-2xl font-mono tracking-wide">LUMON IPSUM GENERATOR</h1>
              <div className="h-2 w-2 rounded-full bg-[#afcbd6] animate-pulse"></div>
            </div>
            <p className="text-sm opacity-80">PROTOCOL.GENERATE.TEXT</p>
          </div>

          <div className="w-full flex justify-center items-center text-sm mb-8">
            <span>PARAGRAPHS REQUESTED: </span>
            <Input
              ref={inputRef}
              type="number"
              id="paragraphs"
              min="1"
              max="10"
              defaultValue={paragraphs}
              onChange={(e) => {
                const value = Number(e.target.value);

                // Only update state for valid values to maintain invariants
                if (!isNaN(value) && value >= 1 && value <= 10) {
                  setParagraphs(value);
                  setInputError('');
                } else {
                  setInputError('Please enter a number between 1 and 10');
                }
              }}
              aria-invalid={!!inputError}
              aria-describedby={inputError ? 'paragraphs-error' : undefined}
              className={`mx-1 ${inputError ? 'border-red-400' : ''}`}
            />
            <Button
              variant="arrow"
              onClick={incrementParagraphs}
              type="button"
              aria-label="Increase paragraphs"
            >
              ▲
            </Button>
            <Button
              variant="arrow"
              onClick={decrementParagraphs}
              type="button"
              aria-label="Decrease paragraphs"
            >
              ▼
            </Button>
          </div>
          {inputError && (
            <p
              id="paragraphs-error"
              className="text-xs text-red-400 opacity-80 mt-1"
              role="alert"
            >
              {inputError}
            </p>
          )}

          <div className="w-full flex justify-center mt-8">
            <Button
              onClick={handleGenerate}
              type="button"
              aria-label="Generate text"
            >
              INITIATE GENERATION{showCursor ? '_' : ' '}
            </Button>
          </div>

          {generatedText.length > 0 ? (
            <GeneratedText className="mb-12">
              <div className="flex flex-col items-end gap-1">
                {copyError && (
                  <p className="text-xs text-red-400 opacity-80">
                    COPY FAILED - MANUAL COPY REQUIRED
                  </p>
                )}
                <Button
                  variant="copy"
                  onClick={handleCopy}
                  disabled={copyError}
                >
                  {copyError ? 'ERROR' : copied ? 'COPIED' : 'COPY'}
                </Button>
              </div>
              <div className="space-y-4">
                {generatedText.map((paragraph, index) => (
                  <p key={index} className="text-[#f3ffff]">{paragraph}</p>
                ))}
              </div>
            </GeneratedText>
          ) : (
            <MDRNumbers className="mb-12" />
          )}

          <div className="text-center text-xs space-y-1 opacity-70">
            <p>COMPLIANCE STATUS: VERIFIED</p>
            <p>PLEASE ENJOY ALL PARAGRAPHS EQUALLY</p>
          </div>
        </TerminalScreen>
      </div>
    </main>
  );
}
