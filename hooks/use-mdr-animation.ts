import { useEffect, useState, useCallback } from 'react';
import type { Position } from '@/types';

export const useMdrAnimation = () => {
  const [rows, setRows] = useState<string[]>([]);
  const [opacities, setOpacities] = useState<number[][]>([]);
  const [positions, setPositions] = useState<Position[][]>([]);
  const [charsPerRow, setCharsPerRow] = useState(15);
  const numRows = 11;
  const maxOffset = 5.5;
  const updateInterval = 1500;
  const baseCharWidth = 22;

  const calculateColumns = useCallback(() => {
    if (typeof window === 'undefined') return 15;

    const containerWidth = window.innerWidth - 200;
    const columns = Math.floor(containerWidth / baseCharWidth);
    return Math.max(10, Math.min(35, columns - 1));
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const newCharsPerRow = calculateColumns();
      setCharsPerRow(newCharsPerRow);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [calculateColumns]);

  const generateRandomRow = useCallback((length: number) => {
    let row = '';
    for (let i = 0; i < length; i++) {
      row += Math.floor(Math.random() * 10).toString();
    }
    return row;
  }, []);

  useEffect(() => {
    const generateInitialOpacities = () => {
      return Array(numRows).fill(0).map(() =>
        Array(charsPerRow).fill(0).map(() => Math.random() * 0.2 + 0.8)
      );
    };

    const generateInitialPositions = () => {
      return Array(numRows).fill(0).map(() =>
        Array(charsPerRow).fill(0).map(() => ({
          x: (Math.random() * 2 - 1) * maxOffset,
          y: (Math.random() * 2 - 1) * maxOffset
        }))
      );
    };

    setRows(Array(numRows).fill(0).map(() => generateRandomRow(charsPerRow)));
    setOpacities(generateInitialOpacities());
    setPositions(generateInitialPositions());

    const interval = setInterval(() => {
      setOpacities(prev => {
        const newOpacities = [...prev];
        for (let i = 0; i < 5; i++) {
          const row = Math.floor(Math.random() * numRows);
          const col = Math.floor(Math.random() * charsPerRow);
          if (newOpacities[row] && newOpacities[row][col] !== undefined) {
            newOpacities[row][col] = Math.random() * 0.2 + 0.8;
          }
        }
        return newOpacities;
      });

      setPositions(prev => {
        const newPositions = [...prev];
        for (let i = 0; i < 8; i++) {
          const row = Math.floor(Math.random() * numRows);
          const col = Math.floor(Math.random() * charsPerRow);
          if (newPositions[row] && newPositions[row][col]) {
            newPositions[row][col] = {
              x: (Math.random() * 2 - 1) * maxOffset,
              y: (Math.random() * 2 - 1) * maxOffset
            };
          }
        }
        return newPositions;
      });
    }, updateInterval);

    return () => clearInterval(interval);
  }, [charsPerRow, generateRandomRow]);

  return { rows, opacities, positions };
};