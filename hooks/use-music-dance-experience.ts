/**
 * Session-only Music Dance Experience.
 * The counter lives in memory and resets on refresh. Mode unlocks once, on the 7th Generate click.
 */
import { useCallback, useEffect, useRef, useState } from 'react';

export const MDE_UNLOCK_CLICKS = 7;
export const MDE_TONE_FLASH_MS = 800;
export const MDE_DANCE_COPY_MS = 4000;
export const MDE_CANCEL_NOTICE_MS = 4000;

export type MdeTone = 'cancelled' | 'reinstated';

type TimerId = ReturnType<typeof setTimeout>;

const prefersReducedMotion = () => {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export function useMusicDanceExperience() {
  const clicksRef = useRef(0);
  const unlockedRef = useRef(false);
  const activeRef = useRef(false);
  const timersRef = useRef<TimerId[]>([]);

  const [active, setActive] = useState(false);
  const [tone, setTone] = useState<MdeTone>('reinstated');
  const [showDanceCopy, setShowDanceCopy] = useState(false);
  const [cancelledNotice, setCancelledNotice] = useState(false);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((id) => clearTimeout(id));
    timersRef.current = [];
  }, []);

  const schedule = useCallback((fn: () => void, ms: number) => {
    const id = setTimeout(fn, ms);
    timersRef.current.push(id);
  }, []);

  const cancel = useCallback(() => {
    if (!activeRef.current) return;
    clearTimers();
    activeRef.current = false;
    setActive(false);
    setTone('reinstated');
    setShowDanceCopy(false);
    setCancelledNotice(true);
    schedule(() => setCancelledNotice(false), MDE_CANCEL_NOTICE_MS);
  }, [clearTimers, schedule]);

  const activate = useCallback(() => {
    clearTimers();
    unlockedRef.current = true;
    activeRef.current = true;
    setActive(true);
    setCancelledNotice(false);
    setShowDanceCopy(true);
    if (prefersReducedMotion()) {
      setTone('reinstated');
    } else {
      setTone('cancelled');
      schedule(() => setTone('reinstated'), MDE_TONE_FLASH_MS);
    }
    schedule(() => setShowDanceCopy(false), MDE_DANCE_COPY_MS);
  }, [clearTimers, schedule]);

  const registerGenerateClick = useCallback(() => {
    clicksRef.current += 1;
    if (activeRef.current) {
      cancel();
      return;
    }
    if (!unlockedRef.current && clicksRef.current === MDE_UNLOCK_CLICKS) {
      activate();
    }
  }, [activate, cancel]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      cancel();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [cancel]);

  useEffect(() => {
    return () => {
      clearTimers();
    };
  }, [clearTimers]);

  return { active, tone, showDanceCopy, cancelledNotice, registerGenerateClick };
}
