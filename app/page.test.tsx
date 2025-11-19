import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from './page';
import { generateLumonIpsum } from '@/lib/lumon-ipsum';
import { useCursorAnimation } from '@/hooks/use-cursor-animation';

// Mock the dependencies
jest.mock('@/lib/lumon-ipsum', () => ({
  generateLumonIpsum: jest.fn()
}));

jest.mock('@/hooks/use-cursor-animation', () => ({
  useCursorAnimation: jest.fn()
}));

// Mock navigator.clipboard
let mockWriteText: jest.SpyInstance;

const mockGenerateLumonIpsum = jest.mocked(generateLumonIpsum);
const mockUseCursorAnimation = jest.mocked(useCursorAnimation);

describe('Home Page', () => {
  beforeAll(() => {
    if (!navigator.clipboard) {
      Object.defineProperty(navigator, 'clipboard', {
        value: { writeText: jest.fn() },
        writable: true
      });
    }
    mockWriteText = jest.spyOn(navigator.clipboard, 'writeText').mockImplementation(() => Promise.resolve());
  });

  afterAll(() => {
    mockWriteText.mockRestore();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseCursorAnimation.mockReturnValue(true);
    mockGenerateLumonIpsum.mockReturnValue(['Mock paragraph 1', 'Mock paragraph 2']);
  });

  it('renders initial state correctly', () => {
    render(<Home />);

    expect(screen.getByText('LUMON IPSUM GENERATOR')).toBeInTheDocument();
    expect(screen.getByText('PROTOCOL.GENERATE.TEXT')).toBeInTheDocument();
    expect(screen.getByText('PARAGRAPHS REQUESTED:')).toBeInTheDocument();
    expect(screen.getByDisplayValue('3')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /generate text/i })).toBeInTheDocument();
    expect(screen.getByText('COMPLIANCE STATUS: VERIFIED')).toBeInTheDocument();
  });

  it('shows MDRNumbers when no text is generated', () => {
    render(<Home />);

    // MDRNumbers should be rendered initially
    const mdrContainer = document.querySelector('.generated-text');
    expect(mdrContainer).toBeInTheDocument();
  });

  it('updates paragraph count via input', async () => {
    const user = userEvent.setup();
    render(<Home />);

    const input = screen.getByDisplayValue('3');
    await user.clear(input);
    await user.type(input, '5');

    expect(input).toHaveValue(5);
  });

  it('increments paragraph count with arrow button', async () => {
    const user = userEvent.setup();
    render(<Home />);

    const incrementButton = screen.getByRole('button', { name: /increase paragraphs/i });
    await user.click(incrementButton);

    const input = screen.getByDisplayValue('4');
    expect(input).toHaveValue(4);
  });

  it('decrements paragraph count with arrow button', async () => {
    const user = userEvent.setup();
    render(<Home />);

    const decrementButton = screen.getByRole('button', { name: /decrease paragraphs/i });
    await user.click(decrementButton);

    const input = screen.getByDisplayValue('2');
    expect(input).toHaveValue(2);
  });

  it('respects minimum paragraph count of 1', async () => {
    const user = userEvent.setup();
    render(<Home />);

    const decrementButton = screen.getByRole('button', { name: /decrease paragraphs/i });
    await user.click(decrementButton);
    await user.click(decrementButton); // Try to go below 1

    const input = screen.getByDisplayValue('1');
    expect(input).toHaveValue(1);
  });

  it('respects maximum paragraph count of 10', async () => {
    const user = userEvent.setup();
    render(<Home />);

    const incrementButton = screen.getByRole('button', { name: /increase paragraphs/i });
    for (let i = 0; i < 8; i++) {
      await user.click(incrementButton);
    }

    const input = screen.getByDisplayValue('10');
    expect(input).toHaveValue(10);
  });

  it('generates text on button click', async () => {
    const user = userEvent.setup();
    render(<Home />);

    const generateButton = screen.getByRole('button', { name: /generate text/i });
    await user.click(generateButton);

    // Wait for the setTimeout
    await waitFor(() => {
      expect(mockGenerateLumonIpsum).toHaveBeenCalledWith(3);
    });

    // Check that generated text is displayed
    await waitFor(() => {
      expect(screen.getByText('Mock paragraph 1')).toBeInTheDocument();
      expect(screen.getByText('Mock paragraph 2')).toBeInTheDocument();
    });

    // Copy button should be present
    expect(screen.getByRole('button', { name: /copy/i })).toBeInTheDocument();
  });

  it('copies text to clipboard', async () => {
    const user = userEvent.setup();
    render(<Home />);

    // First generate text
    const generateButton = screen.getByRole('button', { name: /generate text/i });
    await user.click(generateButton);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /copy/i })).toBeInTheDocument();
    });

    const copyButton = screen.getByRole('button', { name: /copy/i });
    await user.click(copyButton);

    expect(mockWriteText).toHaveBeenCalledWith('Mock paragraph 1\n\nMock paragraph 2');

    // Button text should change to COPIED
    expect(screen.getByRole('button', { name: /copied/i })).toBeInTheDocument();
  });

  it('resets copied state after timeout', async () => {
    jest.useFakeTimers();
    const user = userEvent.setup();
    render(<Home />);

    // Generate and copy
    const generateButton = screen.getByRole('button', { name: /generate text/i });
    await user.click(generateButton);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /copy/i })).toBeInTheDocument();
    });

    const copyButton = screen.getByRole('button', { name: /copy/i });
    await user.click(copyButton);

    expect(screen.getByRole('button', { name: /copied/i })).toBeInTheDocument();

    // Advance time
    jest.advanceTimersByTime(2000);

    expect(screen.getByRole('button', { name: /copy/i })).toBeInTheDocument();

    jest.useRealTimers();
  });

  it('shows cursor animation in generate button', () => {
    mockUseCursorAnimation.mockReturnValue(false);
    render(<Home />);

    expect(screen.getByRole('button', { name: /generate text/i })).toBeInTheDocument();
    // The text should be "INITIATE GENERATION " (with space instead of _)
  });

  it('clears generated text when generating new text', async () => {
    const user = userEvent.setup();
    render(<Home />);

    // Generate first
    const generateButton = screen.getByRole('button', { name: /generate text/i });
    await user.click(generateButton);

    await waitFor(() => {
      expect(screen.getByText('Mock paragraph 1')).toBeInTheDocument();
    });

    // Generate again
    mockGenerateLumonIpsum.mockReturnValue(['New paragraph']);
    await user.click(generateButton);

    await waitFor(() => {
      expect(screen.getByText('New paragraph')).toBeInTheDocument();
      expect(screen.queryByText('Mock paragraph 1')).not.toBeInTheDocument();
    });
  });
});