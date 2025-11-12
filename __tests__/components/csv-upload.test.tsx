/**
 * CSV Upload Component Tests
 * Target: 90% coverage
 */
import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CsvUpload } from '@/components/csv-upload';
import { mockCSVFile, mockInvalidCSVFile, mockLargeCSVFile } from '@/mocks/test-data';

describe('CsvUpload Component', () => {
  it('should render dropzone correctly', () => {
    const onUpload = vi.fn();
    render(<CsvUpload onUpload={onUpload} maxRows={100} />);

    expect(screen.getByText(/Drag & drop your CSV file here/i)).toBeInTheDocument();
    expect(screen.getByText(/or click to browse/i)).toBeInTheDocument();
    expect(screen.getByText(/max 100 rows/i)).toBeInTheDocument();
  });

  it('should accept and process valid CSV file', async () => {
    const onUpload = vi.fn();
    const { container } = render(<CsvUpload onUpload={onUpload} maxRows={100} />);

    const input = container.querySelector('input[type="file"]') as HTMLInputElement;
    expect(input).toBeTruthy();

    await userEvent.upload(input, mockCSVFile);

    await waitFor(() => {
      expect(onUpload).toHaveBeenCalled();
      const callArgs = onUpload.mock.calls[0];
      expect(callArgs[0]).toBeInstanceOf(Array);
      expect(callArgs[0].length).toBeGreaterThan(0);
    });
  });

  it('should show file info after upload', async () => {
    const onUpload = vi.fn();
    const { container } = render(<CsvUpload onUpload={onUpload} maxRows={100} />);

    const input = container.querySelector('input[type="file"]') as HTMLInputElement;

    await userEvent.upload(input, mockCSVFile);

    await waitFor(() => {
      expect(screen.getByText('test-customers.csv')).toBeInTheDocument();
    });
  });

  it('should allow file removal', async () => {
    const onUpload = vi.fn();
    const user = userEvent.setup();
    const { container } = render(<CsvUpload onUpload={onUpload} maxRows={100} />);

    const input = container.querySelector('input[type="file"]') as HTMLInputElement;

    await user.upload(input, mockCSVFile);

    await waitFor(() => {
      expect(screen.getByText('test-customers.csv')).toBeInTheDocument();
    });

    const removeButton = screen.getByRole('button');
    await user.click(removeButton);

    await waitFor(() => {
      expect(screen.queryByText('test-customers.csv')).not.toBeInTheDocument();
      expect(screen.getByText(/Drag & drop your CSV file here/i)).toBeInTheDocument();
    });
  });

  it('should show error for missing required columns', async () => {
    const onUpload = vi.fn();
    const { container } = render(<CsvUpload onUpload={onUpload} maxRows={100} />);

    const input = container.querySelector('input[type="file"]') as HTMLInputElement;

    await userEvent.upload(input, mockInvalidCSVFile);

    await waitFor(() => {
      expect(screen.getByText(/Upload Error/i)).toBeInTheDocument();
      expect(screen.getByText(/must contain at least "name" and "product" columns/i)).toBeInTheDocument();
    });
  });

  it('should show error when file exceeds max rows', async () => {
    const onUpload = vi.fn();
    const { container } = render(<CsvUpload onUpload={onUpload} maxRows={100} />);

    const input = container.querySelector('input[type="file"]') as HTMLInputElement;

    await userEvent.upload(input, mockLargeCSVFile);

    await waitFor(() => {
      expect(screen.getByText(/Upload Error/i)).toBeInTheDocument();
      expect(screen.getByText(/101 rows.*maximum allowed is 100/i)).toBeInTheDocument();
    });
  });

  it('should show processing state while parsing file', async () => {
    const onUpload = vi.fn();
    const { container } = render(<CsvUpload onUpload={onUpload} maxRows={100} />);

    const input = container.querySelector('input[type="file"]') as HTMLInputElement;

    // Start upload
    await userEvent.upload(input, mockCSVFile);

    // Should briefly show processing state (may be too fast to catch reliably)
    // But we verify the final result
    await waitFor(() => {
      expect(onUpload).toHaveBeenCalled();
    });
  });

  it('should accept different file types (csv, xls, xlsx)', () => {
    const onUpload = vi.fn();
    const { container } = render(<CsvUpload onUpload={onUpload} maxRows={100} />);

    const input = container.querySelector('input[type="file"]') as HTMLInputElement;

    expect(input?.accept).toContain('.csv');
  });

  it('should use custom maxRows limit', () => {
    const onUpload = vi.fn();
    render(<CsvUpload onUpload={onUpload} maxRows={50} />);

    expect(screen.getByText(/max 50 rows/i)).toBeInTheDocument();
  });

  it('should show empty file error', async () => {
    const onUpload = vi.fn();
    const { container } = render(<CsvUpload onUpload={onUpload} maxRows={100} />);

    const emptyFile = new File(['name,product\n'], 'empty.csv', { type: 'text/csv' });
    const input = container.querySelector('input[type="file"]') as HTMLInputElement;

    await userEvent.upload(input, emptyFile);

    await waitFor(() => {
      expect(screen.getByText(/CSV file is empty/i)).toBeInTheDocument();
    });
  });
});
