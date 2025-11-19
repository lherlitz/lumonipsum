import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'lumon' | 'arrow' | 'copy';
}

export function Button({ children, variant = 'lumon', className = '', ...props }: ButtonProps) {
  const baseClass = variant === 'lumon' ? 'lumon-button' :
                   variant === 'arrow' ? 'arrow-button' :
                   'copy-button';

  return (
    <button className={`${baseClass} ${className}`} {...props}>
      {children}
    </button>
  );
}