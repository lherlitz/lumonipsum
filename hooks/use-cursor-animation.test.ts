import { renderHook, act } from '@testing-library/react';
import { useCursorAnimation } from './use-cursor-animation';

describe('useCursorAnimation', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should initialize with showCursor as true', () => {
    const { result } = renderHook(() => useCursorAnimation());
    expect(result.current).toBe(true);
  });

  it('should toggle showCursor every 530ms', () => {
    const { result } = renderHook(() => useCursorAnimation());

    expect(result.current).toBe(true);

    act(() => {
      jest.advanceTimersByTime(530);
    });
    expect(result.current).toBe(false);

    act(() => {
      jest.advanceTimersByTime(530);
    });
    expect(result.current).toBe(true);

    act(() => {
      jest.advanceTimersByTime(530);
    });
    expect(result.current).toBe(false);
  });

  it('should clean up interval on unmount', () => {
    const { result, unmount } = renderHook(() => useCursorAnimation());

    expect(result.current).toBe(true);

    act(() => {
      jest.advanceTimersByTime(530);
    });
    expect(result.current).toBe(false);

    unmount();

    // After unmount, advancing time should not change state
    act(() => {
      jest.advanceTimersByTime(530);
    });
    expect(result.current).toBe(false); // Should remain false
  });

  it('should not toggle before 530ms', () => {
    const { result } = renderHook(() => useCursorAnimation());

    expect(result.current).toBe(true);

    act(() => {
      jest.advanceTimersByTime(300);
    });
    expect(result.current).toBe(true);
  });
});