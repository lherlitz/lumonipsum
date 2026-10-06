import type { MdeTone } from '@/hooks/use-music-dance-experience';

const CEILING_PANELS = 24;

interface MusicDanceExperienceProps {
  active: boolean;
  tone: MdeTone;
  cancelledNotice: boolean;
}

export function MdeCeiling() {
  return (
    <div className="mde-ceiling" aria-hidden="true" data-testid="mde-ceiling">
      {Array.from({ length: CEILING_PANELS }, (_, index) => (
        <span key={index} className="mde-panel" />
      ))}
    </div>
  );
}

export function MusicDanceExperience({ active, tone, cancelledNotice }: MusicDanceExperienceProps) {
  if (!active && !cancelledNotice) return null;

  const message = active
    ? `MUSIC DANCE EXPERIENCE - ${tone === 'cancelled' ? 'CANCELLED' : 'REINSTATED'}`
    : 'THE MUSIC DANCE EXPERIENCE IS OFFICIALLY CANCELLED.';

  return (
    <div className="mde-announcement">
      <p
        role="status"
        aria-live="polite"
        data-testid={active ? 'mde-banner' : 'mde-cancelled'}
        className={active ? 'mde-banner' : 'mde-cancelled'}
      >
        {message}
      </p>
    </div>
  );
}
