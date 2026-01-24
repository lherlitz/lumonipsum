import { render, screen } from '@testing-library/react';
import MDRNumbers from './mdr-numbers';
import { useMdrAnimation } from '@/hooks/use-mdr-animation';

// Mock the hook
jest.mock('@/hooks/use-mdr-animation', () => ({
  useMdrAnimation: jest.fn()
}));

const mockUseMdrAnimation = jest.mocked(useMdrAnimation);

describe('MDRNumbers', () => {
  beforeEach(() => {
    mockUseMdrAnimation.mockReturnValue({
      rows: ['12345', '67890'],
      opacities: [[0.9, 0.8, 0.7, 0.6, 0.5], [0.8, 0.9, 0.7, 0.6, 0.5]],
      positions: [
        [{ x: 0, y: 0 }, { x: 1, y: -1 }, { x: -1, y: 1 }, { x: 2, y: -2 }, { x: -2, y: 2 }],
        [{ x: 1, y: 1 }, { x: -1, y: -1 }, { x: 0, y: 0 }, { x: 1, y: -1 }, { x: -1, y: 1 }]
      ]
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

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

  it('uses fallback values when opacities and positions are incomplete', () => {
    // Mock with incomplete arrays to trigger fallback values
    mockUseMdrAnimation.mockReturnValue({
      rows: ['123'],
      opacities: [], // Empty - will trigger fallback
      positions: []  // Empty - will trigger fallback
    });

    render(<MDRNumbers />);

    const spans = document.querySelectorAll('span');
    expect(spans.length).toBe(3);

    // Check fallback values are applied
    spans.forEach(span => {
      // Fallback opacity is 0.9
      expect(span.style.opacity).toBe('0.9');
      // Fallback position is 0,0
      expect(span.style.transform).toBe('translate(0px, 0px)');
    });
  });

  it('uses fallback values when row data is missing from arrays', () => {
    // Mock with arrays that have first row but row access would be undefined for some chars
    mockUseMdrAnimation.mockReturnValue({
      rows: ['12345'],
      opacities: [[0.8, 0.7]], // Only 2 values, but row has 5 chars
      positions: [[{ x: 1, y: 2 }]] // Only 1 position, but row has 5 chars
    });

    render(<MDRNumbers />);

    const spans = document.querySelectorAll('span');
    expect(spans.length).toBe(5);

    // First two spans should use provided values
    expect(spans[0].style.opacity).toBe('0.8');
    expect(spans[1].style.opacity).toBe('0.7');

    // Remaining spans should use fallback opacity 0.9
    expect(spans[2].style.opacity).toBe('0.9');
    expect(spans[3].style.opacity).toBe('0.9');
    expect(spans[4].style.opacity).toBe('0.9');

    // First span has position, rest use fallback
    expect(spans[0].style.transform).toBe('translate(1px, 2px)');
    expect(spans[1].style.transform).toBe('translate(0px, 0px)');
  });
});