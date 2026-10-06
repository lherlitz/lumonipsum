import type { MdeTone } from '@/hooks/use-music-dance-experience';

const RIPPLE_DIGITS = '0147258369';

interface MusicDanceExperienceProps {
  active: boolean;
  tone: MdeTone;
  cancelledNotice: boolean;
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
      {active && (
        <div className="mde-ripple" aria-hidden="true" data-testid="mde-ripple">
          {RIPPLE_DIGITS.split('').map((digit, index) => (
            <span
              key={`${digit}-${index}`}
              className="mde-digit"
              style={{ animationDelay: `${(index % 10) * 0.08}s` }}
            >
              {digit}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
