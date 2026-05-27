import { useEffect, useState, useRef } from 'react';
import type { Position } from '@/types';

const NUM_ROWS = 11;
const MAX_OFFSET = 5.5;
const UPDATE_INTERVAL = 1500;
const BASE_CHAR_WIDTH = 22;

const generateRandomRow = (length: number) => {
  let row = '';
  for (let i = 0; i < length; i++) {
    row += Math.floor(Math.random() * 10).toString();
  }
  return row;
};

const calculateColumns = () => {
  if (typeof window === 'undefined') return 15;
  const containerWidth = window.innerWidth - 200;
  const columns = Math.floor(containerWidth / BASE_CHAR_WIDTH);
  return Math.max(10, Math.min(35, columns - 1));
};

export const useMdrAnimation = () => {
  const [charsPerRow, setCharsPerRow] = useState(calculateColumns);
  const [rows, setRows] = useState<string[]>([]);
  const [opacities, setOpacities] = useState<number[][]>([]);
  const [positions, setPositions] = useState<Position[][]>([]);
  const initialized = useRef(false);

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- client-only initialization:
       random values cannot be computed during SSR (hydration mismatch),
       and column count depends on window.innerWidth (not available server-side) */
    setRows(Array(NUM_ROWS).fill(0).map(() => generateRandomRow(charsPerRow)));
    setOpacities(
      Array(NUM_ROWS).fill(0).map(() =>
        Array(charsPerRow).fill(0).map(() => Math.random() * 0.2 + 0.8)
      )
    );
    setPositions(
      Array(NUM_ROWS).fill(0).map(() =>
        Array(charsPerRow).fill(0).map(() => ({
          x: (Math.random() * 2 - 1) * MAX_OFFSET,
          y: (Math.random() * 2 - 1) * MAX_OFFSET,
        }))
      )
    );
    /* eslint-enable react-hooks/set-state-in-effect */
    if (!initialized.current) {
      initialized.current = true;
    }
  }, [charsPerRow]);

  useEffect(() => {
    const handleResize = () => {
      setCharsPerRow(calculateColumns());
    };

    if (!initialized.current) {
      handleResize();
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!initialized.current) return;

    const interval = setInterval(() => {
      setOpacities(prev => {
        const newOpacities = [...prev];
        for (let i = 0; i < 5; i++) {
          const row = Math.floor(Math.random() * NUM_ROWS);
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
          const row = Math.floor(Math.random() * NUM_ROWS);
          const col = Math.floor(Math.random() * charsPerRow);
          if (newPositions[row] && newPositions[row][col]) {
            newPositions[row][col] = {
              x: (Math.random() * 2 - 1) * MAX_OFFSET,
              y: (Math.random() * 2 - 1) * MAX_OFFSET,
            };
          }
        }
        return newPositions;
      });
    }, UPDATE_INTERVAL);

    return () => clearInterval(interval);
  }, [charsPerRow]);

  return { rows, opacities, positions };
};