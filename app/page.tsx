'use client';

import { useState, useEffect } from 'react';
import { generateLumonIpsum } from '../utils/lumonIpsum';
import MDRNumbers from './components/MDRNumbers';
import { FaGithub } from 'react-icons/fa';

export default function Home() {
  const [paragraphs, setParagraphs] = useState<number>(3);
  const [generatedText, setGeneratedText] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

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
    <div className="flex flex-col min-h-screen">
      <header>
        <h1 className="sr-only">Lumon Ipsum Generator - Severance-themed placeholder text generator</h1>
      </header>
      <main className="flex-grow p-4 sm:p-8 flex items-center justify-center bg-[#0e1a26] pb-12" aria-label="Lumon Ipsum Generator">
        <div className="w-full max-w-4xl">
          <section className="terminal-screen" aria-labelledby="terminal-heading">
            <div className="terminal-content">
              <div className="text-center space-y-2 mb-12">
                <div className="flex items-center justify-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-[#afcbd6] animate-pulse" aria-hidden="true"></div>
                  <h2 id="terminal-heading" className="text-2xl font-mono tracking-wide">LUMON IPSUM GENERATOR</h2>
                  <div className="h-2 w-2 rounded-full bg-[#afcbd6] animate-pulse" aria-hidden="true"></div>
                </div>
                <p className="text-sm opacity-80">PROTOCOL.GENERATE.TEXT</p>
              </div>

              <form onSubmit={(e) => { 
                e.preventDefault(); 
                const fakeEvent = { preventDefault: () => {}, stopPropagation: () => {} } as React.MouseEvent;
                handleGenerate(fakeEvent); 
              }} className="w-full">
                <div className="w-full flex justify-center items-center text-sm mb-8">
                  <label htmlFor="paragraphs">PARAGRAPHS REQUESTED: </label>
                  <input
                    type="number"
                    id="paragraphs"
                    min="1"
                    max="10"
                    value={paragraphs}
                    onChange={(e) => setParagraphs(Number(e.target.value))}
                    className="lumon-input mx-1"
                    aria-label="Number of paragraphs"
                  />
                  <button
                    className="arrow-button"
                    onClick={incrementParagraphs}
                    type="button"
                    aria-label="Increase paragraphs"
                  >
                    ▲
                  </button>
                  <button
                    className="arrow-button"
                    onClick={decrementParagraphs}
                    type="button"
                    aria-label="Decrease paragraphs"
                  >
                    ▼
                  </button>
                </div>

                <div className="w-full flex justify-center mt-8">
                  <button
                    onClick={handleGenerate}
                    className="lumon-button"
                    type="submit"
                    aria-label="Generate Lumon Ipsum text"
                  >
                    INITIATE GENERATION{showCursor ? '_' : ' '}
                  </button>
                </div>
              </form>

              {generatedText.length > 0 ? (
                <article className="generated-text mb-12">
                  <button
                    onClick={handleCopy}
                    className="copy-button"
                    aria-label="Copy generated text to clipboard"
                  >
                    {copied ? 'COPIED' : 'COPY'}
                  </button>
                  <div className="space-y-4">
                    {generatedText.map((paragraph, index) => (
                      <p key={index} className="text-[#f3ffff]">{paragraph}</p>
                    ))}
                  </div>
                </article>
              ) : (
                <MDRNumbers className="mb-12" />
              )}

              <div className="text-center text-xs space-y-1 opacity-70">
                <p>COMPLIANCE STATUS: VERIFIED</p>
                <p>PLEASE ENJOY ALL PARAGRAPHS EQUALLY</p>
              </div>
            </div>
          </section>
        </div>
      </main>
        
      <footer className="w-full py-2 bg-[#0e1a26] fixed bottom-0">
        <div className="text-center">
          <a
            href="https://github.com/lherlitz/lumonipsum"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-300 transition-colors inline-flex items-center gap-1 text-sm"
            aria-label="GitHub repository"
          >
            <FaGithub size={16} aria-hidden="true" />
            <span>lherlitz</span>
          </a>
        </div>
      </footer>
    </div>
  );
}
