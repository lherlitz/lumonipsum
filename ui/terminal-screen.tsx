import { ReactNode } from 'react';

interface TerminalScreenProps {
  children: ReactNode;
  className?: string;
}

export function TerminalScreen({ children, className = '' }: TerminalScreenProps) {
  return (
    <div className={`terminal-screen ${className}`}>
      <div className="terminal-content">
        {children}
      </div>
    </div>
  );
}