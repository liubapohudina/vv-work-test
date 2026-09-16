import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { getCandidates } from '@/services/candidatesApi';
import { getJobs } from '@/services/jobsApi';

import { JobSearch } from './JobSearch';

const { mockT } = vi.hoisted(() => ({
  mockT: (key: string): string => key,
}));

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: mockT,
  }),
}));

vi.mock('@/hooks/useDebounce', () => ({
  useDebounce: <T,>(value: T): T => value,
}));

vi.mock('@/services/jobsApi', () => ({
  getJobs: vi.fn(),
}));

vi.mock('@/services/candidatesApi', () => ({
  getCandidates: vi.fn(),
}));
vi.mock('./JobSearchForm', () => ({
  JobSearchForm: ({
    mode,
    query,
    country,
    isLoading,
    onModeChange,
    onQueryChange,
    onCountryChange,
    onSubmit,
  }: {
    mode: 'job' | 'employee';
    query: string;
    country: string;
    isLoading: boolean;
    onModeChange: (mode: 'job' | 'employee') => void;
    onQueryChange: (value: string) => void;
    onCountryChange: (value: string) => void;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  }) => (
    <form onSubmit={onSubmit}>
      <input
        aria-label="query"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
      />

      <select
        aria-label="country"
        value={country}
        onChange={(event) => onCountryChange(event.target.value)}
      >
        <option value="">all</option>
        <option value="poland">poland</option>
      </select>

      <button type="button" onClick={() => onModeChange('job')}>
        job-mode
      </button>

      <button type="button" onClick={() => onModeChange('employee')}>
        employee-mode
      </button>

      <button type="submit">submit</button>

      {isLoading && <span>loading-form</span>}

      <span data-testid="mode">{mode}</span>
    </form>
  ),
}));

vi.mock('./PopularSearches', () => ({
  PopularSearches: ({
    activeCategory,
    onCategoryChange,
  }: {
    activeCategory: string | undefined;
    onCategoryChange: (
      category:
        | 'drivers'
        | 'manufacturing'
        | 'construction'
        | 'it'
        | 'hospitality'
        | 'logistics',
    ) => void;
  }) => (
    <div>
      <button type="button" onClick={() => onCategoryChange('construction')}>
        construction-category
      </button>

      <span data-testid="active-category">{activeCategory ?? 'none'}</span>
    </div>
  ),
}));

vi.mock('./JobSearchStatus', () => ({
  JobSearchStatus: ({
    isVisible,
    isLoading,
    error,
    resultsCount,
    onRetry,
  }: {
    isVisible: boolean;
    isLoading: boolean;
    error: string | null;
    resultsCount: number;
    onRetry: () => void;
  }) => {
    if (!isVisible) {
      return null;
    }

    if (isLoading) {
      return <div>loading-status</div>;
    }

    if (error) {
      return (
        <div>
          <span>{error}</span>

          <button type="button" onClick={onRetry}>
            retry
          </button>
        </div>
      );
    }

    return (
      <div>
        results:
        {resultsCount}
      </div>
    );
  },
}));

const mockedGetJobs = vi.mocked(getJobs);
const mockedGetCandidates = vi.mocked(getCandidates);

describe('JobSearch', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('does not request jobs when there are no filters', () => {
    render(<JobSearch />);

    expect(mockedGetJobs).not.toHaveBeenCalled();
    expect(mockedGetCandidates).not.toHaveBeenCalled();
  });

  it('does not request jobs when query contains fewer than 2 characters', () => {
    render(<JobSearch />);

    fireEvent.change(screen.getByLabelText('query'), {
      target: {
        value: 'a',
      },
    });

    expect(mockedGetJobs).not.toHaveBeenCalled();
  });

  it('loads jobs when query contains at least 2 characters', async () => {
    mockedGetJobs.mockResolvedValue({
      items: [],
      total: 2,
    });

    render(<JobSearch />);

    fireEvent.change(screen.getByLabelText('query'), {
      target: {
        value: 'bu',
      },
    });

    await waitFor(() => {
      expect(mockedGetJobs).toHaveBeenCalledTimes(1);
    });

    expect(mockedGetJobs).toHaveBeenCalledWith({
      query: 'bu',
      country: '',
      category: undefined,
    });

    expect(await screen.findByText('results:2')).toBeInTheDocument();
  });

  it('loads jobs when country is selected', async () => {
    mockedGetJobs.mockResolvedValue({
      items: [],
      total: 3,
    });

    render(<JobSearch />);

    fireEvent.change(screen.getByLabelText('country'), {
      target: {
        value: 'poland',
      },
    });

    await waitFor(() => {
      expect(mockedGetJobs).toHaveBeenCalledWith({
        query: '',
        country: 'poland',
        category: undefined,
      });
    });
  });

  it('shows error when jobs request fails', async () => {
    mockedGetJobs.mockRejectedValue(new Error('Request failed'));

    render(<JobSearch />);

    fireEvent.change(screen.getByLabelText('query'), {
      target: {
        value: 'builder',
      },
    });

    expect(await screen.findByText('home.search.error')).toBeInTheDocument();

    expect(mockedGetJobs).toHaveBeenCalledTimes(1);
  });

  it('retries failed jobs request and shows successful result', async () => {
    mockedGetJobs
      .mockRejectedValueOnce(new Error('Request failed'))
      .mockResolvedValueOnce({
        items: [],
        total: 4,
      });

    render(<JobSearch />);

    fireEvent.change(screen.getByLabelText('query'), {
      target: {
        value: 'builder',
      },
    });

    expect(await screen.findByText('home.search.error')).toBeInTheDocument();

    expect(mockedGetJobs).toHaveBeenCalledTimes(1);

    fireEvent.click(
      screen.getByRole('button', {
        name: 'retry',
      }),
    );

    await waitFor(() => {
      expect(mockedGetJobs).toHaveBeenCalledTimes(2);
    });

    expect(await screen.findByText('results:4')).toBeInTheDocument();

    expect(screen.queryByText('home.search.error')).not.toBeInTheDocument();
  });

  it('loads candidates in employee mode', async () => {
    mockedGetCandidates.mockResolvedValue({
      items: [],
      total: 5,
    });

    render(<JobSearch />);

    fireEvent.click(
      screen.getByRole('button', {
        name: 'employee-mode',
      }),
    );

    fireEvent.change(screen.getByLabelText('query'), {
      target: {
        value: 'developer',
      },
    });

    await waitFor(() => {
      expect(mockedGetCandidates).toHaveBeenCalledTimes(1);
    });

    expect(mockedGetJobs).not.toHaveBeenCalled();

    expect(await screen.findByText('results:5')).toBeInTheDocument();
  });

  it('clears filters when mode changes', async () => {
    mockedGetJobs.mockResolvedValue({
      items: [],
      total: 1,
    });

    render(<JobSearch />);

    fireEvent.change(screen.getByLabelText('query'), {
      target: {
        value: 'builder',
      },
    });

    await waitFor(() => {
      expect(mockedGetJobs).toHaveBeenCalled();
    });

    expect(screen.getByLabelText('query')).toHaveValue('builder');

    fireEvent.click(
      screen.getByRole('button', {
        name: 'employee-mode',
      }),
    );

    expect(screen.getByLabelText('query')).toHaveValue('');

    expect(screen.getByLabelText('country')).toHaveValue('');

    expect(screen.getByTestId('active-category')).toHaveTextContent('none');
  });

  it('sets category and clears query', async () => {
    mockedGetJobs.mockResolvedValue({
      items: [],
      total: 1,
    });

    render(<JobSearch />);

    fireEvent.change(screen.getByLabelText('query'), {
      target: {
        value: 'builder',
      },
    });

    fireEvent.click(
      screen.getByRole('button', {
        name: 'construction-category',
      }),
    );

    expect(screen.getByLabelText('query')).toHaveValue('');

    expect(screen.getByTestId('active-category')).toHaveTextContent(
      'construction',
    );

    await waitFor(() => {
      expect(mockedGetJobs).toHaveBeenCalledWith({
        query: '',
        country: '',
        category: 'construction',
      });
    });
  });
});
