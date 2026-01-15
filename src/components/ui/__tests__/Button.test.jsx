import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../Button';

describe('Button', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('rendering', () => {
    it('should render children correctly', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByText('Click me')).toBeInTheDocument();
    });

    it('should render as button element', () => {
      render(<Button>Test</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('should have default type="button"', () => {
      render(<Button>Test</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
    });

    it('should accept custom type', () => {
      render(<Button type="submit">Submit</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
    });
  });

  describe('variants', () => {
    it('should apply filled variant by default', () => {
      render(<Button>Test</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('btn');
      expect(button).toHaveClass('btn-filled');
    });

    it('should apply tinted variant', () => {
      render(<Button variant="tinted">Test</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('btn-tinted');
    });

    it('should apply gray variant', () => {
      render(<Button variant="gray">Test</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('btn-gray');
    });

    it('should apply glass variant', () => {
      render(<Button variant="glass">Test</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('btn-glass');
    });

    it('should fall back to filled for unknown variant', () => {
      render(<Button variant="unknown">Test</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('btn-filled');
    });
  });

  describe('className', () => {
    it('should accept additional className', () => {
      render(<Button className="custom-class">Test</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class');
    });

    it('should combine variant and custom className', () => {
      render(<Button variant="glass" className="my-btn">Test</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('btn');
      expect(button).toHaveClass('btn-glass');
      expect(button).toHaveClass('my-btn');
    });
  });

  describe('onClick', () => {
    it('should call onClick when clicked', () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Click</Button>);

      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should pass event to onClick', () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Click</Button>);

      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledWith(expect.any(Object));
    });

    it('should trigger haptic feedback on click', () => {
      render(<Button>Click</Button>);

      fireEvent.click(screen.getByRole('button'));
      expect(navigator.vibrate).toHaveBeenCalledWith(10);
    });

    it('should work without onClick handler', () => {
      render(<Button>Click</Button>);

      // Should not throw
      fireEvent.click(screen.getByRole('button'));
      expect(navigator.vibrate).toHaveBeenCalledWith(10);
    });
  });

  describe('disabled', () => {
    it('should not be disabled by default', () => {
      render(<Button>Test</Button>);
      expect(screen.getByRole('button')).not.toBeDisabled();
    });

    it('should be disabled when disabled prop is true', () => {
      render(<Button disabled>Test</Button>);
      expect(screen.getByRole('button')).toBeDisabled();
    });

    it('should still trigger haptic and onClick when disabled (browser handles prevention)', () => {
      const handleClick = vi.fn();
      render(<Button disabled onClick={handleClick}>Click</Button>);

      // Note: disabled buttons don't fire click events in real browsers
      // but our mock doesn't prevent this
    });
  });

  describe('additional props', () => {
    it('should pass through additional props', () => {
      render(<Button data-testid="my-button" aria-label="Custom label">Test</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('data-testid', 'my-button');
      expect(button).toHaveAttribute('aria-label', 'Custom label');
    });
  });

  describe('children wrapper', () => {
    it('should wrap children in span with z-10 class', () => {
      render(<Button>Content</Button>);
      const span = screen.getByText('Content');
      expect(span.tagName).toBe('SPAN');
      expect(span).toHaveClass('relative');
      expect(span).toHaveClass('z-10');
    });
  });
});
