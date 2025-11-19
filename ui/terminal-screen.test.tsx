import { render, screen } from '@testing-library/react';
import { TerminalScreen } from './terminal-screen';

describe('TerminalScreen', () => {
  it('renders children within terminal structure', () => {
    render(
      <TerminalScreen>
        <h1>Test Content</h1>
        <p>Some text</p>
      </TerminalScreen>
    );

    const terminalScreen = document.querySelector('.terminal-screen');
    expect(terminalScreen).toBeInTheDocument();
    expect(terminalScreen).toHaveClass('terminal-screen');

    const terminalContent = document.querySelector('.terminal-content');
    expect(terminalContent).toBeInTheDocument();

    expect(screen.getByText('Test Content')).toBeInTheDocument();
    expect(screen.getByText('Some text')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <TerminalScreen className="custom-class">
        <div>Content</div>
      </TerminalScreen>
    );

    const terminalScreen = document.querySelector('.terminal-screen');
    expect(terminalScreen).toHaveClass('terminal-screen', 'custom-class');
  });

  it('renders with default className when none provided', () => {
    render(
      <TerminalScreen>
        <div>Content</div>
      </TerminalScreen>
    );

    const terminalScreen = document.querySelector('.terminal-screen');
    expect(terminalScreen).toHaveClass('terminal-screen');
  });
});