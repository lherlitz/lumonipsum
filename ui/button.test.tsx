import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './button';

describe('Button', () => {
  it('renders with default lumon variant', () => {
    render(<Button>Test Button</Button>);
    const button = screen.getByRole('button', { name: /test button/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('lumon-button');
  });

  it('renders with arrow variant', () => {
    render(<Button variant="arrow">▲</Button>);
    const button = screen.getByRole('button', { name: /▲/i });
    expect(button).toHaveClass('arrow-button');
  });

  it('renders with copy variant', () => {
    render(<Button variant="copy">COPY</Button>);
    const button = screen.getByRole('button', { name: /copy/i });
    expect(button).toHaveClass('copy-button');
  });

  it('passes through additional props', () => {
    const handleClick = jest.fn();
    render(
      <Button onClick={handleClick} type="submit" disabled>
        Submit
      </Button>
    );
    const button = screen.getByRole('button', { name: /submit/i });
    expect(button).toHaveAttribute('type', 'submit');
    expect(button).toBeDisabled();
  });

  it('handles click events', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    await user.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies custom className', () => {
    render(<Button className="custom-class">Button</Button>);
    const button = screen.getByRole('button', { name: /button/i });
    expect(button).toHaveClass('lumon-button', 'custom-class');
  });
});