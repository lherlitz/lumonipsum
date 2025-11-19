import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './input';

describe('Input', () => {
  it('renders with default props', () => {
    render(<Input />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass('lumon-input');
  });

  it('passes through input props', () => {
    render(
      <Input
        type="number"
        id="test-input"
        min="1"
        max="10"
        value="5"
        placeholder="Enter value"
        disabled
      />
    );
    const input = screen.getByRole('spinbutton');
    expect(input).toHaveAttribute('type', 'number');
    expect(input).toHaveAttribute('id', 'test-input');
    expect(input).toHaveAttribute('min', '1');
    expect(input).toHaveAttribute('max', '10');
    expect(input).toHaveValue(5);
    expect(input).toHaveAttribute('placeholder', 'Enter value');
    expect(input).toBeDisabled();
  });

  it('handles onChange events', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} />);
    const input = screen.getByRole('textbox');
    await user.type(input, 'test');
    expect(handleChange).toHaveBeenCalledTimes(4);
  });

  it('applies custom className', () => {
    render(<Input className="custom-class" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('lumon-input', 'custom-class');
  });
});