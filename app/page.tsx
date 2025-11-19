'use client';

import { useState } from 'react';
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
  const showCursor = useCursorAnimation();

  const handleGenerate = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setGeneratedText([]);
    setTimeout(() => {
      const text = generateLumonIpsum(paragraphs);
      setGeneratedText(text);
    }, 500);
    setCopied(false);
  };

  const incrementParagraphs = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setParagraphs(prev => Math.min(prev + 1, 10));
  };

  const decrementParagraphs = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setParagraphs(prev => Math.max(prev - 1, 1));
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generatedText.join('\n\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
              type="number"
              id="paragraphs"
              min="1"
              max="10"
              value={paragraphs}
              onChange={(e) => setParagraphs(Number(e.target.value))}
              className="mx-1"
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
              <Button
                variant="copy"
                onClick={handleCopy}
              >
                {copied ? 'COPIED' : 'COPY'}
              </Button>
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
