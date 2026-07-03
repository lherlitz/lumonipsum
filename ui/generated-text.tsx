import { ReactNode } from 'react';

interface GeneratedTextProps {
  children: ReactNode;
  className?: string;
}

export function GeneratedText({ children, className = '' }: GeneratedTextProps) {
  return (
    <div className={`generated-text ${className}`} data-testid="generated-text">
      {children}
    </div>
  );
}