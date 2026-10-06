import { renderHook, act } from '@testing-library/react';
import {
  MDE_CANCEL_NOTICE_MS,
  MDE_DANCE_COPY_MS,
  MDE_TONE_FLASH_MS,
  MDE_UNLOCK_CLICKS,
  useMusicDanceExperience,
} from './use-music-dance-experience';

const clickGenerate = (register: () => void, times: number) => {
  for (let i = 0; i < times; i++) {
    register();
  }
};

describe('useMusicDanceExperience', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('stays inactive until the 7th generate click', () => {
    const { result } = renderHook(() => useMusicDanceExperience());

    act(() => {
      clickGenerate(result.current.registerGenerateClick, MDE_UNLOCK_CLICKS - 1);
    });

    expect(result.current.active).toBe(false);
    expect(result.current.cancelledNotice).toBe(false);
    expect(result.current.showDanceCopy).toBe(false);
  });

  it('unlocks once on the 7th click and flashes from cancelled to reinstated', () => {
    const { result } = renderHook(() => useMusicDanceExperience());

    act(() => {
      clickGenerate(result.current.registerGenerateClick, MDE_UNLOCK_CLICKS);
    });

    expect(result.current.active).toBe(true);
    expect(result.current.tone).toBe('cancelled');
    expect(result.current.showDanceCopy).toBe(true);

    act(() => {
      jest.advanceTimersByTime(MDE_TONE_FLASH_MS);
    });
    expect(result.current.tone).toBe('reinstated');
    expect(result.current.active).toBe(true);

    act(() => {
      jest.advanceTimersByTime(MDE_DANCE_COPY_MS - MDE_TONE_FLASH_MS);
    });
    expect(result.current.showDanceCopy).toBe(false);
    expect(result.current.active).toBe(true);
  });

  it('cancels on the next generate click and does not unlock again', () => {
    const { result } = renderHook(() => useMusicDanceExperience());

    act(() => {
      clickGenerate(result.current.registerGenerateClick, MDE_UNLOCK_CLICKS);
    });
    act(() => {
      result.current.registerGenerateClick();
    });

    expect(result.current.active).toBe(false);
    expect(result.current.cancelledNotice).toBe(true);
    expect(result.current.showDanceCopy).toBe(false);

    act(() => {
      jest.advanceTimersByTime(MDE_CANCEL_NOTICE_MS);
    });
    expect(result.current.cancelledNotice).toBe(false);

    act(() => {
      clickGenerate(result.current.registerGenerateClick, MDE_UNLOCK_CLICKS);
    });
    expect(result.current.active).toBe(false);
  });

  it('cancels on Escape without trapping the key', () => {
    const { result } = renderHook(() => useMusicDanceExperience());

    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    });
    expect(result.current.cancelledNotice).toBe(false);

    act(() => {
      clickGenerate(result.current.registerGenerateClick, MDE_UNLOCK_CLICKS);
    });

    const event = new KeyboardEvent('keydown', { key: 'Escape', cancelable: true });
    const preventDefault = jest.spyOn(event, 'preventDefault');
    act(() => {
      window.dispatchEvent(event);
    });

    expect(result.current.active).toBe(false);
    expect(result.current.cancelledNotice).toBe(true);
    expect(preventDefault).not.toHaveBeenCalled();
  });

  it('skips the cancelled flash when reduced motion is requested', () => {
    const original = window.matchMedia;
    window.matchMedia = jest.fn().mockImplementation((query: string) => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));

    const { result } = renderHook(() => useMusicDanceExperience());
    act(() => {
      clickGenerate(result.current.registerGenerateClick, MDE_UNLOCK_CLICKS);
    });

    expect(result.current.active).toBe(true);
    expect(result.current.tone).toBe('reinstated');

    window.matchMedia = original;
  });
});
