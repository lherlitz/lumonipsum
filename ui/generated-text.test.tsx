import { render, screen } from '@testing-library/react';
import { GeneratedText } from './generated-text';

describe('GeneratedText', () => {
  it('renders children within generated-text container', () => {
    render(
      <GeneratedText>
        <p>Generated paragraph</p>
        <button>Copy</button>
      </GeneratedText>
    );

    const container = document.querySelector('.generated-text');
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass('generated-text');

    expect(screen.getByText('Generated paragraph')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /copy/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <GeneratedText className="custom-class">
        <div>Content</div>
      </GeneratedText>
    );

    const container = document.querySelector('.generated-text');
    expect(container).toHaveClass('generated-text', 'custom-class');
  });

  it('renders with default className when none provided', () => {
    render(
      <GeneratedText>
        <div>Content</div>
      </GeneratedText>
    );

    const container = document.querySelector('.generated-text');
    expect(container).toHaveClass('generated-text');
  });
});