import { InputHTMLAttributes, forwardRef } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & { 'data-testid'?: string };

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', 'data-testid': dataTestId, ...props }, ref) => {
    return (
      <input ref={ref} className={`lumon-input ${className}`} data-testid={dataTestId} {...props} />
    );
  }
);

Input.displayName = 'Input';