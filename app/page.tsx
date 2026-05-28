'use client';

import { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { generateLumonIpsum } from '@/lib/lumon-ipsum';
import { useCursorAnimation } from '@/hooks/use-cursor-animation';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { TerminalScreen } from '@/ui/terminal-screen';
import { GeneratedText } from '@/ui/generated-text';

const MDRNumbers = dynamic(() => import('@/features/mdr-numbers'), { ssr: false });

export default function Home() {
  const [paragraphs, setParagraphs] = useState<number>(3);
  const [generatedText, setGeneratedText] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [inputError, setInputError] = useState<string>('');
  const showCursor = useCursorAnimation();
  const inputRef = useRef<HTMLInputElement>(null);

  const validate = (raw: string) => {
    if (raw === '') {
      setInputError('');
      return true;
    }
    const value = Number(raw);
    if (Number.isInteger(value) && value >= 1 && value <= 10) {
      setParagraphs(value);
      setInputError('');
      return true;
    }
    setInputError('Please enter a number between 1 and 10');
    return false;
  };

  const syncInput = (next: number) => {
    setParagraphs(next);
    setInputError('');
    if (inputRef.current) {
      inputRef.current.value = next.toString();
    }
  };

  const getCurrentValue = (): number => {
    const raw = inputRef.current?.value || '';
    if (raw === '') return paragraphs;
    const value = Number(raw);
    return Number.isInteger(value) && value >= 1 && value <= 10 ? value : paragraphs;
  };

  const handleGenerate = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const count = getCurrentValue();
    if (count !== paragraphs) {
      setParagraphs(count);
    }

    setGeneratedText([]);
    const text = generateLumonIpsum(count);
    setGeneratedText(text);
    setCopied(false);
    setCopyError(false);
  };

  const incrementParagraphs = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    syncInput(Math.min(paragraphs + 1, 10));
  };

  const decrementParagraphs = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    syncInput(Math.max(paragraphs - 1, 1));
  };

  const handleCopy = async () => {
    const text = generatedText.join('\n\n');
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for non-HTTPS contexts where navigator.clipboard is unavailable
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        const success = document.execCommand('copy');
        document.body.removeChild(textarea);
        if (!success) throw new Error('execCommand copy failed');
      }
      setCopied(true);
      setCopyError(false);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.warn('Failed to copy to clipboard:', error);
      setCopyError(true);
      setTimeout(() => setCopyError(false), 1500);
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
              type="text"
              inputMode="numeric"
              id="paragraphs"
              defaultValue="3"
              onChange={(e) => validate(e.target.value)}
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
              className="text-xs text-red-400 mt-1"
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
                  <p className="text-xs text-red-400 opacity-80" role="alert">
                    Copy failed. Please select the text and press Ctrl+C / Cmd+C.
                  </p>
                )}
                <Button
                  variant="copy"
                  onClick={handleCopy}
                  disabled={copyError}
                  aria-label={
                    copyError
                      ? 'Copy failed'
                      : copied
                        ? 'Text copied to clipboard'
                        : 'Copy generated text to clipboard'
                  }
                  aria-live="polite"
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
