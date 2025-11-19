import { render, screen } from '@testing-library/react';
import MDRNumbers from './mdr-numbers';

// Mock the hook
jest.mock('@/hooks/use-mdr-animation', () => ({
  useMdrAnimation: () => ({
    rows: ['12345', '67890'],
    opacities: [[0.9, 0.8, 0.7, 0.6, 0.5], [0.8, 0.9, 0.7, 0.6, 0.5]],
    positions: [
      [{ x: 0, y: 0 }, { x: 1, y: -1 }, { x: -1, y: 1 }, { x: 2, y: -2 }, { x: -2, y: 2 }],
      [{ x: 1, y: 1 }, { x: -1, y: -1 }, { x: 0, y: 0 }, { x: 1, y: -1 }, { x: -1, y: 1 }]
    ]
  })
}));

describe('MDRNumbers', () => {
  it('renders with mocked animation data', () => {
    render(<MDRNumbers />);

    const container = document.querySelector('.generated-text');
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass('generated-text', 'font-mono');

    // Check that numbers are rendered
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('6')).toBeInTheDocument();
    expect(screen.getByText('7')).toBeInTheDocument();
    expect(screen.getByText('8')).toBeInTheDocument();
    expect(screen.getByText('9')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<MDRNumbers className="custom-class" />);

    const container = document.querySelector('.generated-text');
    expect(container).toHaveClass('generated-text', 'font-mono', 'custom-class');
  });

  it('renders with default className when none provided', () => {
    render(<MDRNumbers />);

    const container = document.querySelector('.generated-text');
    expect(container).toHaveClass('generated-text', 'font-mono');
  });

  it('renders spans with correct styles', () => {
    render(<MDRNumbers />);

    const spans = document.querySelectorAll('span');
    expect(spans.length).toBe(10); // 2 rows * 5 chars

    spans.forEach(span => {
      expect(span.style.opacity).toMatch(/0\.\d+/);
      expect(span.style.transition).toContain('opacity 1.5s ease-in-out');
      expect(span.style.transition).toContain('transform 2s ease-in-out');
      expect(span.style.transform).toContain('translate');
      expect(span.style.display).toBe('inline-block');
    });
  });
});