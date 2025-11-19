import { useMdrAnimation } from '@/hooks/use-mdr-animation';
import type { MDRNumbersProps } from '@/types';

export default function MDRNumbers({ className = '' }: MDRNumbersProps) {
  const { rows, opacities, positions } = useMdrAnimation();

  return (
    <div className={`generated-text font-mono ${className}`}>
      <div className="p-4 w-full">
        {rows.map((row, i) => (
          <div
            key={`row-${i}`}
            className="mb-2"
            style={{
              letterSpacing: '0.95rem',
              paddingLeft: '0.4rem',
              paddingRight: '0.4rem',
              textAlign: 'justify',
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            {row.split('').map((char, j) => (
              <span
                key={`${i}-${j}`}
                style={{
                  opacity: opacities[i]?.[j] || 0.9,
                  transition: 'opacity 1.5s ease-in-out, transform 2s ease-in-out',
                  transform: `translate(${positions[i]?.[j]?.x || 0}px, ${positions[i]?.[j]?.y || 0}px)`,
                  display: 'inline-block'
                }}
              >
                {char}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}