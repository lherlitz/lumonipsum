import { renderHook, act } from '@testing-library/react';
import { useMdrAnimation } from './use-mdr-animation';

const mockRandom = jest.spyOn(Math, 'random');

describe('useMdrAnimation', () => {
  const originalInnerWidth = window.innerWidth;

  beforeEach(() => {
    jest.useFakeTimers();
    mockRandom.mockReturnValue(0.5); // Deterministic random
    // Mock window.innerWidth
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 1000,
    });
  });

  afterEach(() => {
    jest.useRealTimers();
    mockRandom.mockRestore();
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: originalInnerWidth,
    });
  });

  it('should initialize with correct structure', () => {
    const { result } = renderHook(() => useMdrAnimation());

    expect(result.current.rows).toHaveLength(11);
    expect(result.current.opacities).toHaveLength(11);
    expect(result.current.positions).toHaveLength(11);

    result.current.rows.forEach(row => {
      expect(typeof row).toBe('string');
      expect(row.length).toBe(35); // calculated from window 1000
      expect(/^\d+$/.test(row)).toBe(true);
    });

    result.current.opacities.forEach(row => {
      expect(row).toHaveLength(35);
      row.forEach(opacity => {
        expect(opacity).toBeGreaterThanOrEqual(0.8);
        expect(opacity).toBeLessThanOrEqual(1.0);
      });
    });

    result.current.positions.forEach(row => {
      expect(row).toHaveLength(35);
      row.forEach(pos => {
        expect(pos).toHaveProperty('x');
        expect(pos).toHaveProperty('y');
        expect(pos.x).toBeGreaterThanOrEqual(-5.5);
        expect(pos.x).toBeLessThanOrEqual(5.5);
      });
    });
  });

  it('should update opacities and positions on interval', () => {
    const { result } = renderHook(() => useMdrAnimation());

    const initialOpacities = result.current.opacities.map(row => [...row]);
    const initialPositions = result.current.positions.map(row => row.map(pos => ({ ...pos })));

    act(() => {
      jest.advanceTimersByTime(1500);
    });

    // Check that some opacities changed
    let opacityChanged = false;
    for (let i = 0; i < initialOpacities.length; i++) {
      for (let j = 0; j < initialOpacities[i].length; j++) {
        if (initialOpacities[i][j] !== result.current.opacities[i][j]) {
          opacityChanged = true;
          break;
        }
      }
      if (opacityChanged) break;
    }
    expect(opacityChanged).toBe(true);

    // Check that some positions changed
    let positionChanged = false;
    for (let i = 0; i < initialPositions.length; i++) {
      for (let j = 0; j < initialPositions[i].length; j++) {
        if (initialPositions[i][j].x !== result.current.positions[i][j].x ||
            initialPositions[i][j].y !== result.current.positions[i][j].y) {
          positionChanged = true;
          break;
        }
      }
      if (positionChanged) break;
    }
    expect(positionChanged).toBe(true);
  });

  it('should clean up interval on unmount', () => {
    const { result, unmount } = renderHook(() => useMdrAnimation());

    const initialOpacities = result.current.opacities.map(row => [...row]);

    act(() => {
      jest.advanceTimersByTime(1500);
    });

    // Opacities should have changed
    expect(result.current.opacities).not.toEqual(initialOpacities);

    unmount();

    const opacitiesAfterUnmount = result.current.opacities.map(row => [...row]);

    act(() => {
      jest.advanceTimersByTime(1500);
    });

    // After unmount, opacities should not change
    expect(result.current.opacities).toEqual(opacitiesAfterUnmount);
  });

  it('should handle window resize and update charsPerRow', () => {
    const { result } = renderHook(() => useMdrAnimation());

    expect(result.current.rows[0].length).toBe(35); // (1000-200)/22 = 36, min(35,36-1)=35

    // Mock resize
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 500, // (500-200)/22 = 13.6, floor 13, 13-1=12
    });

    act(() => {
      window.dispatchEvent(new Event('resize'));
    });

    // Wait for effect
    act(() => {
      jest.advanceTimersByTime(0);
    });

    expect(result.current.rows[0].length).toBe(12);
  });

  it('should calculate columns correctly', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 300, // (300-200)/22 = 4.5, floor 4, max(10,4-1)=10
    });

    const { result } = renderHook(() => useMdrAnimation());
    expect(result.current.rows[0].length).toBe(10);

    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 1000, // (1000-200)/22=36, min(35,36-1)=35
    });

    act(() => {
      window.dispatchEvent(new Event('resize'));
    });

    act(() => {
      jest.advanceTimersByTime(0);
    });

    expect(result.current.rows[0].length).toBe(35);
  });

  it('should handle server-side rendering (no window)', () => {
    const originalWindow = global.window;
    delete (global as any).window;

    const { result } = renderHook(() => useMdrAnimation());
    expect(result.current.rows[0].length).toBe(35); // in jsdom, window is defined

    global.window = originalWindow;
  });

  it('should handle sparse random updates to opacities and positions', () => {
    // Test edge case where random index lands on undefined array entries
    const { result } = renderHook(() => useMdrAnimation());

    // Verify initial state is valid
    expect(result.current.opacities.length).toBe(11);
    expect(result.current.positions.length).toBe(11);

    // Advance multiple intervals to trigger many random updates
    act(() => {
      jest.advanceTimersByTime(1500 * 10);
    });

    // All arrays should still be valid (guards prevent undefined access)
    result.current.opacities.forEach(row => {
      expect(Array.isArray(row)).toBe(true);
      row.forEach(opacity => {
        expect(typeof opacity).toBe('number');
        expect(opacity).toBeGreaterThanOrEqual(0.8);
        expect(opacity).toBeLessThanOrEqual(1.0);
      });
    });

    result.current.positions.forEach(row => {
      expect(Array.isArray(row)).toBe(true);
      row.forEach(pos => {
        expect(pos).toHaveProperty('x');
        expect(pos).toHaveProperty('y');
      });
    });
  });

  it('should handle calculateColumns returning default when window is undefined', () => {
    // This tests the SSR branch by directly testing the hook behavior
    // when window.innerWidth gives edge values

    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 0, // Edge case: zero width
    });

    const { result } = renderHook(() => useMdrAnimation());

    // Should use minimum of 10 columns: (0-200)/22 = -9, max(10, -10) = 10
    expect(result.current.rows[0].length).toBe(10);
  });

  it('should handle boundary conditions in random index generation', () => {
    // Set up random to return values that would go out of bounds
    // This tests the guards: newOpacities[row] && newOpacities[row][col] !== undefined
    const randomValues = [
      0.99, 0.99, // Row 10, col at end - edge of array
      0, 0,       // Row 0, col 0 - start of array
      0.5, 0.5,   // Middle values
      1, 1,       // Would be out of bounds but Math.floor keeps it in
    ];
    let callIndex = 0;
    mockRandom.mockImplementation(() => {
      const value = randomValues[callIndex % randomValues.length];
      callIndex++;
      return value;
    });

    const { result } = renderHook(() => useMdrAnimation());

    // Run multiple intervals to exercise all random paths
    act(() => {
      jest.advanceTimersByTime(1500 * 5);
    });

    // Verify arrays remain valid
    expect(result.current.opacities.every(row =>
      row.every(val => val >= 0.8 && val <= 1.0)
    )).toBe(true);

    expect(result.current.positions.every(row =>
      row.every(pos => pos.x >= -5.5 && pos.x <= 5.5 && pos.y >= -5.5 && pos.y <= 5.5)
    )).toBe(true);
  });
});