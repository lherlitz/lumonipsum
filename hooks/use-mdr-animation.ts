import { useEffect, useReducer } from 'react';
import type { Position } from '@/types';

const NUM_ROWS = 11;
const MAX_OFFSET = 5.5;
const UPDATE_INTERVAL = 1500;
const BASE_CHAR_WIDTH = 22;

type State = {
  charsPerRow: number;
  rows: string[];
  opacities: number[][];
  positions: Position[][];
  initialized: boolean;
};

type Action =
  | { type: 'init'; charsPerRow: number }
  | { type: 'tick' }
  | { type: 'resize'; charsPerRow: number };

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

const createInitialState = (charsPerRow: number): State => ({
  charsPerRow,
  rows: Array(NUM_ROWS)
    .fill(0)
    .map(() => generateRandomRow(charsPerRow)),
  opacities: Array(NUM_ROWS)
    .fill(0)
    .map(() =>
      Array(charsPerRow)
        .fill(0)
        .map(() => Math.random() * 0.2 + 0.8)
    ),
  positions: Array(NUM_ROWS)
    .fill(0)
    .map(() =>
      Array(charsPerRow)
        .fill(0)
        .map(() => ({
          x: (Math.random() * 2 - 1) * MAX_OFFSET,
          y: (Math.random() * 2 - 1) * MAX_OFFSET,
        }))
    ),
  initialized: false,
});

const resizeState = (prev: State, newCharsPerRow: number): State => {
  if (newCharsPerRow === prev.charsPerRow) return prev;

  const rows: string[] = [];
  const opacities: number[][] = [];
  const positions: Position[][] = [];

  for (let r = 0; r < NUM_ROWS; r++) {
    const oldRow = prev.rows[r] ?? '';
    const oldOpac = prev.opacities[r] ?? [];
    const oldPos = prev.positions[r] ?? [];

    let newRow: string;
    let newOpac: number[];
    let newPos: Position[];

    if (newCharsPerRow > oldRow.length) {
      const extraChars = generateRandomRow(newCharsPerRow - oldRow.length);
      newRow = oldRow + extraChars;
      newOpac = [
        ...oldOpac,
        ...Array(newCharsPerRow - oldOpac.length)
          .fill(0)
          .map(() => Math.random() * 0.2 + 0.8),
      ];
      newPos = [
        ...oldPos,
        ...Array(newCharsPerRow - oldPos.length)
          .fill(0)
          .map(() => ({
            x: (Math.random() * 2 - 1) * MAX_OFFSET,
            y: (Math.random() * 2 - 1) * MAX_OFFSET,
          })),
      ];
    } else {
      newRow = oldRow.slice(0, newCharsPerRow);
      newOpac = oldOpac.slice(0, newCharsPerRow);
      newPos = oldPos.slice(0, newCharsPerRow);
    }

    rows.push(newRow);
    opacities.push(newOpac);
    positions.push(newPos);
  }

  return { ...prev, charsPerRow: newCharsPerRow, rows, opacities, positions };
};

const applyTick = (prev: State): State => {
  const newOpacities = prev.opacities.map((row) => [...row]);
  const newPositions = prev.positions.map((row) => row.map((p) => ({ ...p })));

  for (let i = 0; i < 5; i++) {
    const row = Math.floor(Math.random() * NUM_ROWS);
    const col = Math.floor(Math.random() * prev.charsPerRow);
    if (newOpacities[row] && newOpacities[row][col] !== undefined) {
      newOpacities[row][col] = Math.random() * 0.2 + 0.8;
    }
  }

  for (let i = 0; i < 8; i++) {
    const row = Math.floor(Math.random() * NUM_ROWS);
    const col = Math.floor(Math.random() * prev.charsPerRow);
    if (newPositions[row] && newPositions[row][col]) {
      newPositions[row][col] = {
        x: (Math.random() * 2 - 1) * MAX_OFFSET,
        y: (Math.random() * 2 - 1) * MAX_OFFSET,
      };
    }
  }

  return { ...prev, opacities: newOpacities, positions: newPositions };
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'init': {
      if (action.charsPerRow === state.charsPerRow) {
        return { ...state, initialized: true };
      }
      return { ...createInitialState(action.charsPerRow), initialized: true };
    }
    case 'tick':
      return applyTick(state);
    case 'resize':
      return resizeState(state, action.charsPerRow);
    default:
      return state;
  }
};

export const useMdrAnimation = () => {
  const [state, dispatch] = useReducer(reducer, undefined, () =>
    createInitialState(calculateColumns())
  );

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- client-only initialization:
       random values cannot be computed during SSR (hydration mismatch),
       and column count depends on window.innerWidth (not available server-side) */
    dispatch({ type: 'init', charsPerRow: calculateColumns() });
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  useEffect(() => {
    const handleResize = () => {
      dispatch({ type: 'resize', charsPerRow: calculateColumns() });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!state.initialized) return;

    const interval = setInterval(() => {
      dispatch({ type: 'tick' });
    }, UPDATE_INTERVAL);

    return () => clearInterval(interval);
  }, [state.initialized]);

  return { rows: state.rows, opacities: state.opacities, positions: state.positions };
};
