type MockFetchOptions = {
  minDelay?: number;
  maxDelay?: number;
  errorRate?: number;
};

const DEFAULT_MIN_DELAY = 300;
const DEFAULT_MAX_DELAY = 800;
const DEFAULT_ERROR_RATE = 0.2;

const getRandomDelay = (minDelay: number, maxDelay: number): number => {
  return Math.floor(Math.random() * (maxDelay - minDelay + 1) + minDelay);
};

export const mockFetch = async <T>(
  data: T,
  options: MockFetchOptions = {},
): Promise<T> => {
  const {
    minDelay = DEFAULT_MIN_DELAY,
    maxDelay = DEFAULT_MAX_DELAY,
    errorRate = DEFAULT_ERROR_RATE,
  } = options;

  const delay = getRandomDelay(minDelay, maxDelay);

  await new Promise<void>((resolve) => {
    window.setTimeout(resolve, delay);
  });

  if (Math.random() < errorRate) {
    throw new Error('Mock API request failed');
  }

  return data;
};
