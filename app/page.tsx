'use client';

import { useState } from 'react';
import { generateLumonIpsum } from '../utils/lumonIpsum';

export default function Home() {
  const [paragraphs, setParagraphs] = useState<number>(3);
  const [generatedText, setGeneratedText] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    const text = generateLumonIpsum(paragraphs);
    setGeneratedText(text);
    setCopied(false);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generatedText.join('\n\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Lumon Ipsum</h1>
          <p className="text-lg text-gray-600 mb-8">Generate Severance-themed placeholder text</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-center gap-4 mb-6">
            <label htmlFor="paragraphs" className="text-gray-700">
              Number of Paragraphs:
            </label>
            <input
              type="number"
              id="paragraphs"
              min="1"
              max="10"
              value={paragraphs}
              onChange={(e) => setParagraphs(Number(e.target.value))}
              className="w-20 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <button
              onClick={handleGenerate}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Generate
            </button>
          </div>

          {generatedText.length > 0 && (
            <div className="relative">
              <div className="absolute top-4 right-4">
                <button
                  onClick={handleCopy}
                  className="bg-gray-100 text-gray-600 px-3 py-1 rounded-md hover:bg-gray-200 transition-colors text-sm"
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 text-gray-700 space-y-4">
                {generatedText.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="text-center text-sm text-gray-500">
          <p>Inspired by the TV show &quot;Severance&quot;</p>
          <p>Please enjoy all paragraphs equally.</p>
        </div>
      </div>
    </main>
  );
}
