const testingData = {
  id: 'testing',
  name: 'Testing',
  description:
    'Unit testing, integration testing, and E2E testing patterns for MERN applications',
  sections: [
    // ─── Section 1: Setup & Project Structure ─────────────────────────
    {
      id: 'setup',
      title: 'Setup & Project Structure',
      blocks: [
        {
          type: 'text',
          content:
            'Use Vitest for React (Vite) frontends and Jest for Express/Node backends. Both share a similar API, but Vitest is faster and integrates natively with Vite. Keep tests close to the code they test.',
        },
        {
          type: 'heading',
          content: 'Frontend: Vitest + React Testing Library',
        },
        {
          type: 'code',
          language: 'bash',
          fileName: 'client — install',
          code: `npm install -D vitest @testing-library/react @testing-library/jest-dom \\
  @testing-library/user-event jsdom`,
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'client/vite.config.js',
          code: `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    css: true,
  },
});`,
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'client/src/test/setup.js',
          code: `import '@testing-library/jest-dom';

// Clean up after each test
afterEach(() => {
  vi.restoreAllMocks();
});`,
        },
        {
          type: 'heading',
          content: 'Backend: Jest',
        },
        {
          type: 'code',
          language: 'bash',
          fileName: 'server — install',
          code: `npm install -D jest supertest mongodb-memory-server @types/jest`,
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'server/jest.config.js',
          code: `module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.js', '**/*.test.js'],
  setupFilesAfterSetup: ['./test/setup.js'],
  coveragePathIgnorePatterns: ['/node_modules/', '/test/'],
  verbose: true,
};`,
        },
        {
          type: 'heading',
          content: 'Package Scripts',
        },
        {
          type: 'code',
          language: 'json',
          fileName: 'client/package.json',
          code: `{
  "scripts": {
    "test": "vitest",
    "test:run": "vitest run",
    "test:coverage": "vitest run --coverage",
    "test:ui": "vitest --ui"
  }
}`,
        },
        {
          type: 'code',
          language: 'json',
          fileName: 'server/package.json',
          code: `{
  "scripts": {
    "test": "jest --watchAll",
    "test:run": "jest",
    "test:coverage": "jest --coverage",
    "test:verbose": "jest --verbose"
  }
}`,
        },
        {
          type: 'heading',
          content: 'File Naming & Folder Structure',
        },
        {
          type: 'folder-tree',
          tree: {
            name: 'src',
            children: [
              {
                name: 'features',
                children: [
                  {
                    name: 'tours',
                    children: [
                      { name: 'TourCard.jsx' },
                      { name: 'TourCard.test.jsx', comment: 'Co-located test' },
                      { name: 'useTours.js' },
                      { name: 'useTours.test.js' },
                    ],
                  },
                ],
              },
              {
                name: 'utils',
                children: [
                  { name: 'helpers.js' },
                  { name: 'helpers.test.js' },
                ],
              },
              {
                name: 'test',
                comment: 'Shared test utilities',
                children: [
                  { name: 'setup.js', comment: 'Global test setup' },
                  { name: 'mocks', children: [{ name: 'handlers.js' }] },
                  { name: 'utils.jsx', comment: 'Custom render, test helpers' },
                ],
              },
            ],
          },
        },
        {
          type: 'list',
          items: [
            'Co-locate tests next to the files they test: Button.jsx → Button.test.jsx',
            'Use .test.js or .spec.js — pick one and be consistent',
            'Put shared test utilities (custom render, mocks) in src/test/',
            'Backend alternative: use a __tests__ folder mirroring your source structure',
          ],
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'Set globals: true in Vitest config so you can use describe, it, expect, vi without importing them — matching the Jest experience.',
        },
      ],
    },

    // ─── Section 2: Testing Fundamentals ────────────────────────────────
    {
      id: 'fundamentals',
      title: 'Testing Fundamentals',
      blocks: [
        {
          type: 'text',
          content:
            'Tests follow a consistent structure: group related tests with describe, define individual test cases with it/test, and use expect for assertions. Lifecycle hooks handle setup and teardown.',
        },
        {
          type: 'heading',
          content: 'describe / it / test Blocks',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'Basic test structure',
          code: `describe('formatCurrency', () => {
  it('should format a number as USD currency', () => {
    expect(formatCurrency(29.99)).toBe('$29.99');
  });

  it('should handle zero', () => {
    expect(formatCurrency(0)).toBe('$0.00');
  });

  it('should handle negative numbers', () => {
    expect(formatCurrency(-10)).toBe('-$10.00');
  });
});

// test() and it() are identical — use whichever reads better
test('adds 1 + 2 to equal 3', () => {
  expect(1 + 2).toBe(3);
});`,
        },
        {
          type: 'heading',
          content: 'Common Assertions',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'expect matchers',
          code: `// Equality
expect(value).toBe(3);              // Strict ===
expect(obj).toEqual({ a: 1 });      // Deep equality
expect(obj).toStrictEqual({ a: 1 }); // Deep + no extra properties

// Truthiness
expect(value).toBeTruthy();
expect(value).toBeFalsy();
expect(value).toBeNull();
expect(value).toBeUndefined();
expect(value).toBeDefined();

// Numbers
expect(value).toBeGreaterThan(3);
expect(value).toBeGreaterThanOrEqual(3);
expect(value).toBeLessThan(5);
expect(value).toBeCloseTo(0.3, 5);  // For floating point

// Strings
expect(str).toMatch(/regex/);
expect(str).toContain('substring');

// Arrays / Iterables
expect(arr).toContain('item');
expect(arr).toHaveLength(3);
expect(arr).toEqual(expect.arrayContaining([1, 2]));

// Objects
expect(obj).toHaveProperty('key');
expect(obj).toHaveProperty('nested.key', 'value');
expect(obj).toMatchObject({ name: 'test' }); // Partial match

// Exceptions
expect(() => fn()).toThrow();
expect(() => fn()).toThrow('specific message');
expect(() => fn()).toThrow(CustomError);

// Negation — chain .not before any matcher
expect(value).not.toBe(5);
expect(arr).not.toContain('missing');`,
        },
        {
          type: 'heading',
          content: 'Lifecycle Hooks',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'Setup and teardown',
          code: `describe('UserService', () => {
  let db;

  // Runs ONCE before all tests in this describe
  beforeAll(async () => {
    db = await connectToTestDB();
  });

  // Runs ONCE after all tests in this describe
  afterAll(async () => {
    await db.disconnect();
  });

  // Runs before EACH test
  beforeEach(async () => {
    await db.collection('users').deleteMany({});
    await db.collection('users').insertOne({
      name: 'Test User',
      email: 'test@test.com',
    });
  });

  // Runs after EACH test
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should find user by email', async () => {
    const user = await UserService.findByEmail('test@test.com');
    expect(user.name).toBe('Test User');
  });
});`,
        },
        {
          type: 'heading',
          content: 'Focusing & Skipping Tests',
        },
        {
          type: 'code',
          language: 'javascript',
          code: `// Run ONLY this test (useful for debugging)
it.only('should handle the edge case', () => {
  // ...
});

// Skip this test (it won't run)
it.skip('should handle legacy format', () => {
  // ...
});

// Skip an entire suite
describe.skip('Deprecated API', () => {
  // None of these run
});

// Run only this suite
describe.only('Critical Path', () => {
  // Only these tests run
});

// TODO placeholder — reminds you to write it later
it.todo('should validate email format');`,
        },
        {
          type: 'tip',
          variant: 'warning',
          content:
            'Never commit .only tests — they silently skip the rest of your suite. Use a lint rule (eslint-plugin-jest or eslint-plugin-vitest) to catch it.',
        },
      ],
    },

    // ─── Section 3: Unit Testing Functions ──────────────────────────────
    {
      id: 'unit-testing',
      title: 'Unit Testing Functions',
      blocks: [
        {
          type: 'text',
          content:
            'Unit tests verify individual functions in isolation. Test the happy path, edge cases, and error conditions. Pure functions are the easiest to test — same input always produces the same output.',
        },
        {
          type: 'heading',
          content: 'Testing Pure Functions',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'utils/helpers.js',
          code: `export function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\\w\\s-]/g, '')
    .replace(/[\\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}`,
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'utils/helpers.test.js',
          code: `import { slugify, clamp } from './helpers';

describe('slugify', () => {
  it('should convert text to lowercase slug', () => {
    expect(slugify('Hello World')).toBe('hello-world');
  });

  it('should remove special characters', () => {
    expect(slugify('Hello, World!')).toBe('hello-world');
  });

  it('should trim whitespace', () => {
    expect(slugify('  Hello World  ')).toBe('hello-world');
  });

  it('should collapse multiple separators', () => {
    expect(slugify('Hello   World')).toBe('hello-world');
  });

  it('should handle empty string', () => {
    expect(slugify('')).toBe('');
  });
});

describe('clamp', () => {
  it('should return value when within range', () => {
    expect(clamp(5, 0, 10)).toBe(5);
  });

  it('should clamp to min when below range', () => {
    expect(clamp(-5, 0, 10)).toBe(0);
  });

  it('should clamp to max when above range', () => {
    expect(clamp(15, 0, 10)).toBe(10);
  });

  it('should handle equal min and max', () => {
    expect(clamp(5, 3, 3)).toBe(3);
  });
});`,
        },
        {
          type: 'heading',
          content: 'Testing Async Functions',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'services/apiTours.test.js',
          code: `import { describe, it, expect, vi } from 'vitest';
import { getTours } from './apiTours';

describe('getTours', () => {
  it('should return tours on success', async () => {
    const mockTours = [{ name: 'Tour A' }, { name: 'Tour B' }];

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: { tours: mockTours } }),
    });

    const result = await getTours();

    expect(result).toEqual(mockTours);
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/tours'));
  });

  it('should throw on failed response', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
    });

    await expect(getTours()).rejects.toThrow('Failed to fetch tours');
  });
});`,
        },
        {
          type: 'heading',
          content: 'Testing Error Throwing',
        },
        {
          type: 'code',
          language: 'javascript',
          code: `import { AppError } from './appError';

describe('AppError', () => {
  it('should create error with message and status code', () => {
    const error = new AppError('Not found', 404);

    expect(error.message).toBe('Not found');
    expect(error.statusCode).toBe(404);
    expect(error.status).toBe('fail');
    expect(error.isOperational).toBe(true);
  });

  it('should set status to "error" for 5xx codes', () => {
    const error = new AppError('Server error', 500);
    expect(error.status).toBe('error');
  });

  it('should be an instance of Error', () => {
    const error = new AppError('Test', 400);
    expect(error).toBeInstanceOf(Error);
  });
});`,
        },
        {
          type: 'heading',
          content: 'Parameterized Tests (test.each)',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'Avoid repetitive test cases',
          code: `describe('isValidEmail', () => {
  // Array of arrays: [input, expected]
  it.each([
    ['user@example.com', true],
    ['user.name@domain.co', true],
    ['user@.com', false],
    ['@domain.com', false],
    ['user@domain', false],
    ['', false],
  ])('isValidEmail("%s") should return %s', (email, expected) => {
    expect(isValidEmail(email)).toBe(expected);
  });
});

// Object syntax for readability
describe('calculateDiscount', () => {
  it.each([
    { price: 100, discount: 10, expected: 90 },
    { price: 50, discount: 25, expected: 37.5 },
    { price: 200, discount: 0, expected: 200 },
    { price: 100, discount: 100, expected: 0 },
  ])(
    'price $price with $discount% off = $expected',
    ({ price, discount, expected }) => {
      expect(calculateDiscount(price, discount)).toBe(expected);
    }
  );
});`,
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'Use test.each when you have multiple inputs producing different outputs for the same logic. It keeps your tests DRY and makes it easy to add new cases.',
        },
      ],
    },

    // ─── Section 4: Mocking ─────────────────────────────────────────────
    {
      id: 'mocking',
      title: 'Mocking',
      blocks: [
        {
          type: 'text',
          content:
            'Mocking replaces real implementations with controlled substitutes. Use mocks to isolate the code under test, control external dependencies, and verify interactions. Vitest uses vi.fn() and Jest uses jest.fn() — the API is nearly identical.',
        },
        {
          type: 'heading',
          content: 'Mock Functions (vi.fn / jest.fn)',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'Creating and using mock functions',
          code: `// Create a mock function
const mockCallback = vi.fn();

// Call it
mockCallback('hello');
mockCallback('world');

// Assert calls
expect(mockCallback).toHaveBeenCalled();
expect(mockCallback).toHaveBeenCalledTimes(2);
expect(mockCallback).toHaveBeenCalledWith('hello');
expect(mockCallback).toHaveBeenLastCalledWith('world');
expect(mockCallback).toHaveBeenNthCalledWith(1, 'hello');

// Mock return values
const mockFn = vi.fn()
  .mockReturnValue('default')
  .mockReturnValueOnce('first call')
  .mockReturnValueOnce('second call');

console.log(mockFn()); // 'first call'
console.log(mockFn()); // 'second call'
console.log(mockFn()); // 'default'

// Mock async return
const mockAsync = vi.fn().mockResolvedValue({ id: 1, name: 'Tour' });
const result = await mockAsync();
expect(result).toEqual({ id: 1, name: 'Tour' });

// Mock rejected value
const mockReject = vi.fn().mockRejectedValue(new Error('Network error'));
await expect(mockReject()).rejects.toThrow('Network error');`,
        },
        {
          type: 'heading',
          content: 'Mocking Modules',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'Vitest — vi.mock()',
          code: `import { vi, describe, it, expect } from 'vitest';
import { getTours } from '../services/apiTours';
import { useTours } from './useTours';

// Mock the entire module — hoisted to top automatically
vi.mock('../services/apiTours', () => ({
  getTours: vi.fn(),
}));

describe('useTours', () => {
  it('should return tours from the API', async () => {
    const mockTours = [{ name: 'Tour A' }];
    getTours.mockResolvedValue(mockTours);

    // ... test the hook using the mocked function
  });
});`,
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'Jest — jest.mock()',
          code: `const emailService = require('../utils/email');
const authController = require('./authController');

// Mock the module
jest.mock('../utils/email');

describe('authController.signup', () => {
  it('should send welcome email after signup', async () => {
    emailService.sendWelcome.mockResolvedValue();

    await authController.signup(req, res, next);

    expect(emailService.sendWelcome).toHaveBeenCalledWith(
      expect.objectContaining({ email: 'test@test.com' })
    );
  });
});`,
        },
        {
          type: 'heading',
          content: 'Spy on Existing Methods',
        },
        {
          type: 'code',
          language: 'javascript',
          code: `// Spy on a method without replacing its implementation
const spy = vi.spyOn(console, 'error');

doSomethingThatLogs();

expect(spy).toHaveBeenCalledWith('expected error message');
spy.mockRestore(); // Restore original

// Spy AND replace implementation
const spy = vi.spyOn(userService, 'findById')
  .mockResolvedValue({ name: 'Mock User' });

const user = await userService.findById('123');
expect(user.name).toBe('Mock User');`,
        },
        {
          type: 'heading',
          content: 'Clearing, Resetting, and Restoring Mocks',
        },
        {
          type: 'code',
          language: 'javascript',
          code: `const mockFn = vi.fn().mockReturnValue('hello');
mockFn();

// mockClear — resets call history, keeps implementation
mockFn.mockClear();
expect(mockFn).not.toHaveBeenCalled(); // true
console.log(mockFn()); // still returns 'hello'

// mockReset — clears history AND removes implementation
mockFn.mockReset();
console.log(mockFn()); // returns undefined

// mockRestore — only works on spies, restores original implementation
const spy = vi.spyOn(Math, 'random').mockReturnValue(0.5);
spy.mockRestore(); // Math.random is real again

// Reset all mocks between tests (recommended in setup)
afterEach(() => {
  vi.restoreAllMocks(); // Vitest
  // jest.restoreAllMocks(); // Jest
});`,
        },
        {
          type: 'heading',
          content: 'Mocking Timers',
        },
        {
          type: 'code',
          language: 'javascript',
          code: `describe('debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should call function after delay', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 300);

    debounced();
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(300);
    expect(fn).toHaveBeenCalledOnce();
  });

  it('should reset timer on repeated calls', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 300);

    debounced();
    vi.advanceTimersByTime(200);
    debounced(); // Restart the timer
    vi.advanceTimersByTime(200);
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledOnce();
  });
});`,
        },
        {
          type: 'tip',
          variant: 'note',
          content:
            'vi.mock() calls are hoisted to the top of the file automatically. If you need dynamic behavior per test, mock with a vi.fn() and change its implementation in each test with .mockReturnValue() or .mockImplementation().',
        },
      ],
    },

    // ─── Section 5: React Testing Library ─────────────────────────────
    {
      id: 'react-testing-library',
      title: 'React Testing Library',
      blocks: [
        {
          type: 'text',
          content:
            'React Testing Library (RTL) tests components the way users interact with them — by querying the DOM by text, role, and labels, not by implementation details like component state or class names.',
        },
        {
          type: 'heading',
          content: 'Custom Render with Providers',
        },
        {
          type: 'code',
          language: 'jsx',
          fileName: 'src/test/utils.jsx',
          code: `import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
}

export function renderWithProviders(ui, options = {}) {
  const queryClient = createTestQueryClient();

  function Wrapper({ children }) {
    return (
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>{children}</BrowserRouter>
      </QueryClientProvider>
    );
  }

  return {
    ...render(ui, { wrapper: Wrapper, ...options }),
    queryClient,
  };
}

// Re-export everything from RTL for convenience
export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';`,
        },
        {
          type: 'heading',
          content: 'Query Priority (Which Query to Use)',
        },
        {
          type: 'list',
          items: [
            'getByRole — best for accessible elements (buttons, headings, links, textboxes)',
            'getByLabelText — best for form inputs',
            'getByPlaceholderText — when no label exists',
            'getByText — for non-interactive text content',
            'getByTestId — last resort when nothing else works',
          ],
        },
        {
          type: 'heading',
          content: 'getBy vs queryBy vs findBy',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'Query variants',
          code: `import { render, screen } from '@testing-library/react';

// getBy — throws if not found (use when element SHOULD exist)
const button = screen.getByRole('button', { name: /submit/i });

// queryBy — returns null if not found (use to assert absence)
const error = screen.queryByText(/error/i);
expect(error).not.toBeInTheDocument();

// findBy — returns a Promise, waits for element to appear (async)
const data = await screen.findByText(/Tour A/i);

// Multiple elements: getAllBy, queryAllBy, findAllBy
const items = screen.getAllByRole('listitem');
expect(items).toHaveLength(3);`,
        },
        {
          type: 'heading',
          content: 'User Events',
        },
        {
          type: 'code',
          language: 'jsx',
          fileName: 'User interactions with userEvent',
          code: `import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('LoginForm', () => {
  it('should submit the form with email and password', async () => {
    const user = userEvent.setup();
    const mockSubmit = vi.fn();
    render(<LoginForm onSubmit={mockSubmit} />);

    // Type into inputs
    await user.type(
      screen.getByLabelText(/email/i),
      'test@test.com'
    );
    await user.type(
      screen.getByLabelText(/password/i),
      'password123'
    );

    // Click submit
    await user.click(screen.getByRole('button', { name: /log in/i }));

    expect(mockSubmit).toHaveBeenCalledWith({
      email: 'test@test.com',
      password: 'password123',
    });
  });

  it('should show validation error on empty submit', async () => {
    const user = userEvent.setup();
    render(<LoginForm onSubmit={vi.fn()} />);

    await user.click(screen.getByRole('button', { name: /log in/i }));

    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
  });
});`,
        },
        {
          type: 'heading',
          content: 'Testing Async Components',
        },
        {
          type: 'code',
          language: 'jsx',
          fileName: 'Components that fetch data',
          code: `import { screen, waitFor } from '@testing-library/react';
import { renderWithProviders } from '../test/utils';
import TourList from './TourList';
import * as apiTours from '../../services/apiTours';

vi.mock('../../services/apiTours');

describe('TourList', () => {
  it('should show loading state then tours', async () => {
    apiTours.getTours.mockResolvedValue([
      { _id: '1', name: 'Forest Hike' },
      { _id: '2', name: 'City Walk' },
    ]);

    renderWithProviders(<TourList />);

    // Loading state
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    // Wait for data
    expect(await screen.findByText('Forest Hike')).toBeInTheDocument();
    expect(screen.getByText('City Walk')).toBeInTheDocument();

    // Loading gone
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
  });

  it('should show error on failure', async () => {
    apiTours.getTours.mockRejectedValue(new Error('Network error'));

    renderWithProviders(<TourList />);

    expect(await screen.findByText(/error/i)).toBeInTheDocument();
  });
});`,
        },
        {
          type: 'heading',
          content: 'Testing Custom Hooks (renderHook)',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'hooks/useCounter.test.js',
          code: `import { renderHook, act } from '@testing-library/react';
import { useCounter } from './useCounter';

describe('useCounter', () => {
  it('should initialize with default value', () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
  });

  it('should initialize with custom value', () => {
    const { result } = renderHook(() => useCounter(10));
    expect(result.current.count).toBe(10);
  });

  it('should increment', () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });

  it('should decrement', () => {
    const { result } = renderHook(() => useCounter(5));

    act(() => {
      result.current.decrement();
    });

    expect(result.current.count).toBe(4);
  });
});`,
        },
        {
          type: 'tip',
          variant: 'warning',
          content:
            'Always use userEvent.setup() before render, and await every user interaction. The older fireEvent API is synchronous and does not simulate real browser behavior (e.g., it skips focus, keydown, input sequencing).',
        },
      ],
    },

    // ─── Section 6: Component Testing Patterns ──────────────────────────
    {
      id: 'component-patterns',
      title: 'Component Testing Patterns',
      blocks: [
        {
          type: 'text',
          content:
            'Component tests verify what the user sees and can interact with. Focus on rendered output and behavior, not internal state. These patterns cover the most common scenarios.',
        },
        {
          type: 'heading',
          content: 'Testing Props & Rendering',
        },
        {
          type: 'code',
          language: 'jsx',
          fileName: 'TourCard.test.jsx',
          code: `import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import TourCard from './TourCard';

const mockTour = {
  _id: '1',
  name: 'Forest Hike',
  duration: 5,
  difficulty: 'easy',
  price: 299,
  ratingsAverage: 4.7,
  imageCover: 'tour-1.jpg',
};

describe('TourCard', () => {
  it('should render tour details', () => {
    render(
      <BrowserRouter>
        <TourCard tour={mockTour} />
      </BrowserRouter>
    );

    expect(screen.getByText('Forest Hike')).toBeInTheDocument();
    expect(screen.getByText(/5 days/i)).toBeInTheDocument();
    expect(screen.getByText(/easy/i)).toBeInTheDocument();
    expect(screen.getByText('$299')).toBeInTheDocument();
    expect(screen.getByText('4.7')).toBeInTheDocument();
  });

  it('should link to tour detail page', () => {
    render(
      <BrowserRouter>
        <TourCard tour={mockTour} />
      </BrowserRouter>
    );

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/tours/1');
  });
});`,
        },
        {
          type: 'heading',
          content: 'Testing User Interactions',
        },
        {
          type: 'code',
          language: 'jsx',
          fileName: 'Counter.test.jsx',
          code: `import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from './Counter';

describe('Counter', () => {
  it('should increment on button click', async () => {
    const user = userEvent.setup();
    render(<Counter />);

    expect(screen.getByText('0')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /increment/i }));
    expect(screen.getByText('1')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /increment/i }));
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('should not go below zero', async () => {
    const user = userEvent.setup();
    render(<Counter />);

    await user.click(screen.getByRole('button', { name: /decrement/i }));
    expect(screen.getByText('0')).toBeInTheDocument();
  });
});`,
        },
        {
          type: 'heading',
          content: 'Testing Conditional Rendering',
        },
        {
          type: 'code',
          language: 'jsx',
          code: `describe('Alert', () => {
  it('should render success variant', () => {
    render(<Alert type="success" message="Saved!" />);

    const alert = screen.getByRole('alert');
    expect(alert).toHaveTextContent('Saved!');
    expect(alert).toHaveClass('alert-success');
  });

  it('should render error variant', () => {
    render(<Alert type="error" message="Something failed" />);

    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass('alert-error');
  });

  it('should not render when message is empty', () => {
    render(<Alert type="success" message="" />);
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});`,
        },
        {
          type: 'heading',
          content: 'Testing Lists',
        },
        {
          type: 'code',
          language: 'jsx',
          code: `describe('TodoList', () => {
  const mockTodos = [
    { id: 1, text: 'Buy groceries', completed: false },
    { id: 2, text: 'Walk the dog', completed: true },
    { id: 3, text: 'Read a book', completed: false },
  ];

  it('should render all items', () => {
    render(<TodoList todos={mockTodos} />);

    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(3);
  });

  it('should display empty state', () => {
    render(<TodoList todos={[]} />);

    expect(screen.getByText(/no todos/i)).toBeInTheDocument();
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });

  it('should show completed items with strikethrough', () => {
    render(<TodoList todos={mockTodos} />);

    expect(screen.getByText('Walk the dog')).toHaveClass('line-through');
    expect(screen.getByText('Buy groceries')).not.toHaveClass('line-through');
  });
});`,
        },
        {
          type: 'heading',
          content: 'Testing Loading & Error States',
        },
        {
          type: 'code',
          language: 'jsx',
          code: `describe('DataDisplay', () => {
  it('should show spinner while loading', () => {
    render(<DataDisplay isLoading={true} data={null} error={null} />);

    expect(screen.getByRole('status')).toBeInTheDocument(); // spinner
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });

  it('should show error message on failure', () => {
    render(
      <DataDisplay isLoading={false} data={null} error="Failed to load" />
    );

    expect(screen.getByRole('alert')).toHaveTextContent('Failed to load');
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });

  it('should render data table on success', () => {
    const data = [{ id: 1, name: 'Item 1' }];
    render(<DataDisplay isLoading={false} data={data} error={null} />);

    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByText('Item 1')).toBeInTheDocument();
  });
});`,
        },
        {
          type: 'heading',
          content: 'Snapshot Testing',
        },
        {
          type: 'code',
          language: 'jsx',
          code: `describe('Badge', () => {
  // Snapshot captures the full rendered output
  // If the component changes, the snapshot fails and you review the diff
  it('should match snapshot', () => {
    const { container } = render(
      <Badge variant="success" label="Active" />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  // Inline snapshot — stored right in the test file
  it('should match inline snapshot', () => {
    const { container } = render(<Badge variant="warning" label="Pending" />);
    expect(container.firstChild).toMatchInlineSnapshot(\`
      <span class="badge badge-warning">
        Pending
      </span>
    \`);
  });
});`,
        },
        {
          type: 'tip',
          variant: 'note',
          content:
            'Use snapshots sparingly. They are brittle — any class name or markup change breaks them, even if the component is functionally correct. Prefer explicit assertions like getByText and toHaveAttribute.',
        },
      ],
    },

    // ─── Section 7: API Testing with Supertest ──────────────────────────
    {
      id: 'api-testing',
      title: 'API Testing with Supertest',
      blocks: [
        {
          type: 'text',
          content:
            'Supertest lets you send HTTP requests to your Express app without starting a server. Test endpoints directly against your app instance — fast and reliable.',
        },
        {
          type: 'heading',
          content: 'Setup: Export App Without Listening',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'server/app.js',
          code: `const express = require('express');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const errorHandler = require('./controllers/errorController');

const app = express();

app.use(express.json());
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use(errorHandler);

// Export app (not app.listen) — server.js calls listen()
module.exports = app;`,
        },
        {
          type: 'heading',
          content: 'Testing CRUD Endpoints',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'server/__tests__/tours.test.js',
          code: `const request = require('supertest');
const app = require('../app');

describe('Tour API', () => {
  let tourId;

  describe('POST /api/v1/tours', () => {
    it('should create a new tour', async () => {
      const res = await request(app)
        .post('/api/v1/tours')
        .send({
          name: 'Test Tour',
          duration: 5,
          difficulty: 'easy',
          price: 299,
        })
        .expect(201);

      expect(res.body.status).toBe('success');
      expect(res.body.data.tour).toHaveProperty('_id');
      expect(res.body.data.tour.name).toBe('Test Tour');

      tourId = res.body.data.tour._id;
    });

    it('should return 400 for missing required fields', async () => {
      const res = await request(app)
        .post('/api/v1/tours')
        .send({ name: 'Incomplete Tour' })
        .expect(400);

      expect(res.body.status).toBe('fail');
      expect(res.body.message).toMatch(/required/i);
    });
  });

  describe('GET /api/v1/tours', () => {
    it('should return all tours', async () => {
      const res = await request(app)
        .get('/api/v1/tours')
        .expect(200);

      expect(res.body.status).toBe('success');
      expect(Array.isArray(res.body.data.tours)).toBe(true);
    });
  });

  describe('GET /api/v1/tours/:id', () => {
    it('should return a single tour', async () => {
      const res = await request(app)
        .get(\`/api/v1/tours/\${tourId}\`)
        .expect(200);

      expect(res.body.data.tour.name).toBe('Test Tour');
    });

    it('should return 404 for non-existent tour', async () => {
      await request(app)
        .get('/api/v1/tours/000000000000000000000000')
        .expect(404);
    });
  });

  describe('PATCH /api/v1/tours/:id', () => {
    it('should update a tour', async () => {
      const res = await request(app)
        .patch(\`/api/v1/tours/\${tourId}\`)
        .send({ price: 399 })
        .expect(200);

      expect(res.body.data.tour.price).toBe(399);
    });
  });

  describe('DELETE /api/v1/tours/:id', () => {
    it('should delete a tour', async () => {
      await request(app)
        .delete(\`/api/v1/tours/\${tourId}\`)
        .expect(204);
    });
  });
});`,
        },
        {
          type: 'heading',
          content: 'Testing Authenticated Routes',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'Testing with JWT',
          code: `const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../app');
const User = require('../models/userModel');

describe('Protected Routes', () => {
  let token;
  let testUser;

  beforeAll(async () => {
    testUser = await User.create({
      name: 'Test User',
      email: 'test@test.com',
      password: 'password123',
      passwordConfirm: 'password123',
    });

    token = jwt.sign(
      { id: testUser._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
  });

  afterAll(async () => {
    await User.findByIdAndDelete(testUser._id);
  });

  it('should access protected route with valid token', async () => {
    const res = await request(app)
      .get('/api/v1/users/me')
      .set('Authorization', \`Bearer \${token}\`)
      .expect(200);

    expect(res.body.data.user.email).toBe('test@test.com');
  });

  it('should reject request without token', async () => {
    await request(app)
      .get('/api/v1/users/me')
      .expect(401);
  });

  it('should reject request with invalid token', async () => {
    await request(app)
      .get('/api/v1/users/me')
      .set('Authorization', 'Bearer invalidtoken123')
      .expect(401);
  });
});`,
        },
        {
          type: 'heading',
          content: 'Testing Middleware',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'Testing error handling middleware',
          code: `const request = require('supertest');
const express = require('express');
const errorHandler = require('../controllers/errorController');

// Create a mini app to test middleware in isolation
function createApp(routeHandler) {
  const app = express();
  app.use(express.json());
  app.get('/test', routeHandler);
  app.use(errorHandler);
  return app;
}

describe('Error Handler Middleware', () => {
  it('should return 500 for unhandled errors', async () => {
    const app = createApp((req, res, next) => {
      next(new Error('Something broke'));
    });

    const res = await request(app).get('/test').expect(500);
    expect(res.body.status).toBe('error');
  });

  it('should return operational error message', async () => {
    const AppError = require('../utils/appError');
    const app = createApp((req, res, next) => {
      next(new AppError('Tour not found', 404));
    });

    const res = await request(app).get('/test').expect(404);
    expect(res.body.message).toBe('Tour not found');
  });
});`,
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'Keep app.js and server.js separate. Supertest needs the app object without calling .listen(). This also makes it easy to create multiple app instances for parallel test suites.',
        },
      ],
    },

    // ─── Section 8: Integration Testing ─────────────────────────────────
    {
      id: 'integration-testing',
      title: 'Integration Testing',
      blocks: [
        {
          type: 'text',
          content:
            'Integration tests verify that multiple parts work together — your route, controller, model, and database. Use mongodb-memory-server for a fast, isolated MongoDB instance that runs entirely in memory.',
        },
        {
          type: 'heading',
          content: 'In-Memory MongoDB Setup',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'server/test/setup.js',
          code: `const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

// Start in-memory MongoDB before all tests
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

// Clear all collections between tests
afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});

// Stop MongoDB and disconnect after all tests
afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});`,
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'server/jest.config.js',
          code: `module.exports = {
  testEnvironment: 'node',
  setupFilesAfterSetup: ['./test/setup.js'],
  // Set timeout higher for DB operations
  testTimeout: 10000,
};`,
        },
        {
          type: 'heading',
          content: 'Full Request-Response Cycle Test',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'server/__tests__/tourIntegration.test.js',
          code: `const request = require('supertest');
const app = require('../app');
const Tour = require('../models/tourModel');

describe('Tour Integration', () => {
  const tourData = {
    name: 'The Forest Hiker',
    duration: 5,
    maxGroupSize: 25,
    difficulty: 'easy',
    price: 397,
    summary: 'Breathtaking hike through the forest',
  };

  describe('Create → Read → Update → Delete flow', () => {
    let createdTourId;

    it('should create a tour and persist to database', async () => {
      const res = await request(app)
        .post('/api/v1/tours')
        .send(tourData)
        .expect(201);

      createdTourId = res.body.data.tour._id;

      // Verify it actually exists in the database
      const tour = await Tour.findById(createdTourId);
      expect(tour).not.toBeNull();
      expect(tour.name).toBe('The Forest Hiker');
    });

    it('should read the created tour', async () => {
      const res = await request(app)
        .get(\`/api/v1/tours/\${createdTourId}\`)
        .expect(200);

      expect(res.body.data.tour.name).toBe('The Forest Hiker');
      expect(res.body.data.tour.price).toBe(397);
    });

    it('should update the tour', async () => {
      await request(app)
        .patch(\`/api/v1/tours/\${createdTourId}\`)
        .send({ price: 499 })
        .expect(200);

      const tour = await Tour.findById(createdTourId);
      expect(tour.price).toBe(499);
    });

    it('should delete the tour', async () => {
      await request(app)
        .delete(\`/api/v1/tours/\${createdTourId}\`)
        .expect(204);

      const tour = await Tour.findById(createdTourId);
      expect(tour).toBeNull();
    });
  });
});`,
        },
        {
          type: 'heading',
          content: 'Testing Model Validations with the Database',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'server/__tests__/userModel.test.js',
          code: `const User = require('../models/userModel');

describe('User Model', () => {
  it('should hash password before saving', async () => {
    const user = await User.create({
      name: 'John',
      email: 'john@test.com',
      password: 'password123',
      passwordConfirm: 'password123',
    });

    expect(user.password).not.toBe('password123');
    expect(user.password).toMatch(/^\\$2[ab]\\$/); // bcrypt hash
  });

  it('should reject duplicate emails', async () => {
    await User.create({
      name: 'User A',
      email: 'same@test.com',
      password: 'password123',
      passwordConfirm: 'password123',
    });

    await expect(
      User.create({
        name: 'User B',
        email: 'same@test.com',
        password: 'password123',
        passwordConfirm: 'password123',
      })
    ).rejects.toThrow(/duplicate key/i);
  });

  it('should reject invalid email format', async () => {
    await expect(
      User.create({
        name: 'Bad Email',
        email: 'not-an-email',
        password: 'password123',
        passwordConfirm: 'password123',
      })
    ).rejects.toThrow(/valid email/i);
  });

  it('should reject mismatched passwords', async () => {
    await expect(
      User.create({
        name: 'Mismatch',
        email: 'test@test.com',
        password: 'password123',
        passwordConfirm: 'different456',
      })
    ).rejects.toThrow(/passwords are not the same/i);
  });
});`,
        },
        {
          type: 'heading',
          content: 'Seed Data for Tests',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'server/test/fixtures.js',
          code: `const mongoose = require('mongoose');

exports.testTour = {
  _id: new mongoose.Types.ObjectId(),
  name: 'Test Tour',
  duration: 5,
  difficulty: 'easy',
  price: 299,
  summary: 'A test tour',
};

exports.testUser = {
  _id: new mongoose.Types.ObjectId(),
  name: 'Test User',
  email: 'test@test.com',
  password: 'password123',
  passwordConfirm: 'password123',
  role: 'user',
};

exports.testAdmin = {
  _id: new mongoose.Types.ObjectId(),
  name: 'Admin User',
  email: 'admin@test.com',
  password: 'password123',
  passwordConfirm: 'password123',
  role: 'admin',
};

// Helper to seed the database
exports.seedDB = async (Model, data) => {
  await Model.deleteMany({});
  return Model.create(data);
};`,
        },
        {
          type: 'tip',
          variant: 'warning',
          content:
            'Always clean up test data between tests. Shared state causes flaky tests — one test\'s data should never affect another. Use afterEach to clear collections, not afterAll.',
        },
      ],
    },

    // ─── Section 9: Mocking HTTP & External Services ────────────────────
    {
      id: 'mocking-http',
      title: 'Mocking HTTP & External Services',
      blocks: [
        {
          type: 'text',
          content:
            'When your code calls external APIs, you need to mock those requests in tests. MSW (Mock Service Worker) intercepts requests at the network level, making your mocks transparent to the code under test. It works for both browser and Node environments.',
        },
        {
          type: 'heading',
          content: 'MSW Setup',
        },
        {
          type: 'code',
          language: 'bash',
          code: `npm install -D msw`,
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'src/test/mocks/handlers.js',
          code: `import { http, HttpResponse } from 'msw';

const API_URL = 'http://localhost:3000/api/v1';

export const handlers = [
  // GET /api/v1/tours
  http.get(\`\${API_URL}/tours\`, () => {
    return HttpResponse.json({
      status: 'success',
      results: 2,
      data: {
        tours: [
          { _id: '1', name: 'Forest Hike', price: 299 },
          { _id: '2', name: 'City Walk', price: 199 },
        ],
      },
    });
  }),

  // POST /api/v1/users/login
  http.post(\`\${API_URL}/users/login\`, async ({ request }) => {
    const body = await request.json();

    if (body.email === 'test@test.com' && body.password === 'password123') {
      return HttpResponse.json({
        status: 'success',
        data: { user: { _id: '1', name: 'Test User', email: body.email } },
      });
    }

    return HttpResponse.json(
      { status: 'fail', message: 'Incorrect email or password' },
      { status: 401 }
    );
  }),

  // GET /api/v1/users/me
  http.get(\`\${API_URL}/users/me\`, ({ request }) => {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader) {
      return HttpResponse.json(
        { status: 'fail', message: 'Not logged in' },
        { status: 401 }
      );
    }

    return HttpResponse.json({
      status: 'success',
      data: { user: { _id: '1', name: 'Test User' } },
    });
  }),
];`,
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'src/test/mocks/server.js',
          code: `import { setupServer } from 'msw/node';
import { handlers } from './handlers';

export const server = setupServer(...handlers);`,
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'src/test/setup.js — with MSW',
          code: `import '@testing-library/jest-dom';
import { server } from './mocks/server';

// Start MSW server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

// Reset handlers between tests (removes runtime overrides)
afterEach(() => server.resetHandlers());

// Clean up after all tests
afterAll(() => server.close());`,
        },
        {
          type: 'heading',
          content: 'Overriding Handlers Per Test',
        },
        {
          type: 'code',
          language: 'jsx',
          fileName: 'Testing error scenarios',
          code: `import { http, HttpResponse } from 'msw';
import { server } from '../test/mocks/server';
import { renderWithProviders, screen } from '../test/utils';
import TourList from './TourList';

describe('TourList', () => {
  it('should display tours from API', async () => {
    // Uses default handler from handlers.js
    renderWithProviders(<TourList />);

    expect(await screen.findByText('Forest Hike')).toBeInTheDocument();
    expect(screen.getByText('City Walk')).toBeInTheDocument();
  });

  it('should show error when API fails', async () => {
    // Override for this specific test
    server.use(
      http.get('http://localhost:3000/api/v1/tours', () => {
        return HttpResponse.json(
          { status: 'error', message: 'Server error' },
          { status: 500 }
        );
      })
    );

    renderWithProviders(<TourList />);

    expect(await screen.findByText(/error/i)).toBeInTheDocument();
  });

  it('should handle network failure', async () => {
    server.use(
      http.get('http://localhost:3000/api/v1/tours', () => {
        return HttpResponse.error(); // Simulate network error
      })
    );

    renderWithProviders(<TourList />);

    expect(await screen.findByText(/error/i)).toBeInTheDocument();
  });
});`,
        },
        {
          type: 'heading',
          content: 'Mocking fetch/axios Directly (Without MSW)',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'Manual fetch mocking',
          code: `// Simple approach — mock global fetch
describe('apiTours', () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('should fetch tours', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        data: { tours: [{ name: 'Tour A' }] },
      }),
    });

    const tours = await getTours();

    expect(tours).toEqual([{ name: 'Tour A' }]);
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/tours')
    );
  });
});`,
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'Prefer MSW over manual fetch/axios mocking. MSW intercepts at the network level, so your actual fetch/axios code runs — you test the real request construction, headers, and error handling. Manual mocks skip all of that.',
        },
      ],
    },

    // ─── Section 10: Testing Patterns & Best Practices ──────────────────
    {
      id: 'best-practices',
      title: 'Testing Patterns & Best Practices',
      blocks: [
        {
          type: 'text',
          content:
            'Good tests are reliable, readable, and fast. Follow these patterns to write tests that help you ship with confidence without slowing you down.',
        },
        {
          type: 'heading',
          content: 'AAA Pattern (Arrange-Act-Assert)',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'Consistent test structure',
          code: `it('should apply discount to cart total', () => {
  // Arrange — set up the test data and conditions
  const cart = new Cart();
  cart.addItem({ name: 'Shirt', price: 50 });
  cart.addItem({ name: 'Shoes', price: 100 });
  const coupon = { code: 'SAVE20', discount: 0.2 };

  // Act — perform the action being tested
  cart.applyCoupon(coupon);

  // Assert — verify the result
  expect(cart.total).toBe(120); // 150 * 0.8
  expect(cart.appliedCoupon).toBe('SAVE20');
});`,
        },
        {
          type: 'heading',
          content: 'Test Behavior, Not Implementation',
        },
        {
          type: 'code',
          language: 'jsx',
          fileName: 'Good vs bad approach',
          code: `// BAD — testing implementation details
it('should set isOpen state to true', () => {
  const { result } = renderHook(() => useDropdown());
  act(() => result.current.toggle());
  expect(result.current.isOpen).toBe(true); // Tied to internal state name
});

// GOOD — testing behavior from user's perspective
it('should show dropdown content when toggle is clicked', async () => {
  const user = userEvent.setup();
  render(<Dropdown items={['Apple', 'Banana']} />);

  // Dropdown content not visible
  expect(screen.queryByText('Apple')).not.toBeInTheDocument();

  // Click toggle
  await user.click(screen.getByRole('button', { name: /open menu/i }));

  // Content is now visible
  expect(screen.getByText('Apple')).toBeInTheDocument();
  expect(screen.getByText('Banana')).toBeInTheDocument();
});`,
        },
        {
          type: 'heading',
          content: 'What to Test vs What Not to Test',
        },
        {
          type: 'list',
          items: [
            'DO test: business logic, user interactions, conditional rendering, error handling, edge cases',
            'DO test: API integration (routes return correct data/status codes)',
            'DO test: form validation, authentication flows, permission checks',
            'DO NOT test: third-party library internals (React, Express, Mongoose)',
            'DO NOT test: simple pass-through components with no logic',
            'DO NOT test: CSS styling (use visual regression tools instead)',
            'DO NOT test: implementation details (state variable names, internal method calls)',
          ],
        },
        {
          type: 'heading',
          content: 'Test Isolation',
        },
        {
          type: 'code',
          language: 'javascript',
          code: `// BAD — tests depend on shared mutable state
let counter = 0;

it('should increment', () => {
  counter++;
  expect(counter).toBe(1);
});

it('should be at 1', () => {
  expect(counter).toBe(1); // Fails if first test doesn't run
});

// GOOD — each test sets up its own state
describe('counter', () => {
  let counter;

  beforeEach(() => {
    counter = 0; // Fresh state for each test
  });

  it('should increment', () => {
    counter++;
    expect(counter).toBe(1);
  });

  it('should start at zero', () => {
    expect(counter).toBe(0); // Independent of other tests
  });
});`,
        },
        {
          type: 'heading',
          content: 'Test Descriptions That Read Like Requirements',
        },
        {
          type: 'code',
          language: 'javascript',
          code: `// BAD — vague descriptions
describe('tour', () => {
  it('works', () => {});
  it('handles error', () => {});
  it('test 3', () => {});
});

// GOOD — descriptions explain expected behavior
describe('TourBooking', () => {
  it('should calculate total price based on group size', () => {});
  it('should apply early bird discount for bookings 30+ days ahead', () => {});
  it('should reject booking when tour is fully booked', () => {});
  it('should send confirmation email after successful booking', () => {});
  it('should refund payment if booking is cancelled within 24 hours', () => {});
});`,
        },
        {
          type: 'heading',
          content: 'Coverage Targets',
        },
        {
          type: 'list',
          items: [
            '80% coverage is a good target for most projects — diminishing returns beyond that',
            'Focus coverage on critical paths: authentication, payments, data mutations',
            'Low coverage in UI components is fine if you have E2E tests covering user flows',
            'Never write tests just to hit a coverage number — test meaningful behavior',
            '100% coverage does NOT mean zero bugs — it means every line ran, not every scenario was tested',
          ],
        },
        {
          type: 'tip',
          variant: 'warning',
          content:
            'Flaky tests (tests that sometimes pass and sometimes fail) are worse than no tests. They erode trust in the test suite. Common causes: shared state between tests, undeterministic async timing, and reliance on real network or timers. Fix or delete flaky tests immediately.',
        },
      ],
    },

    // ─── Section 11: E2E Testing Basics ─────────────────────────────────
    {
      id: 'e2e-testing',
      title: 'E2E Testing Basics',
      blocks: [
        {
          type: 'text',
          content:
            'End-to-end tests run against your full application in a real browser, testing complete user flows. Playwright is the modern standard — fast, reliable, and supports multiple browsers out of the box.',
        },
        {
          type: 'heading',
          content: 'Playwright Setup',
        },
        {
          type: 'code',
          language: 'bash',
          code: `# Install Playwright
npm init playwright@latest

# This creates:
# playwright.config.js  — configuration
# tests/               — test directory
# tests-examples/      — example tests`,
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'playwright.config.js',
          code: `import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
  // Start dev servers before running tests
  webServer: [
    {
      command: 'npm run dev --prefix server',
      port: 3000,
      reuseExistingServer: !process.env.CI,
    },
    {
      command: 'npm run dev --prefix client',
      port: 5173,
      reuseExistingServer: !process.env.CI,
    },
  ],
});`,
        },
        {
          type: 'heading',
          content: 'Writing E2E Tests',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'e2e/auth.spec.js',
          code: `import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('should log in and redirect to dashboard', async ({ page }) => {
    await page.goto('/login');

    // Fill login form
    await page.getByLabel('Email').fill('test@test.com');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('button', { name: /log in/i }).click();

    // Should redirect to dashboard
    await expect(page).toHaveURL('/dashboard');
    await expect(page.getByText('Welcome, Test User')).toBeVisible();
  });

  test('should show error for invalid credentials', async ({ page }) => {
    await page.goto('/login');

    await page.getByLabel('Email').fill('wrong@test.com');
    await page.getByLabel('Password').fill('wrongpassword');
    await page.getByRole('button', { name: /log in/i }).click();

    await expect(page.getByText(/incorrect email or password/i)).toBeVisible();
    await expect(page).toHaveURL('/login');
  });

  test('should log out successfully', async ({ page }) => {
    // Log in first
    await page.goto('/login');
    await page.getByLabel('Email').fill('test@test.com');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('button', { name: /log in/i }).click();
    await expect(page).toHaveURL('/dashboard');

    // Log out
    await page.getByRole('button', { name: /log out/i }).click();
    await expect(page).toHaveURL('/login');
  });
});`,
        },
        {
          type: 'heading',
          content: 'Testing User Flows',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'e2e/tours.spec.js',
          code: `import { test, expect } from '@playwright/test';

test.describe('Tour Management', () => {
  // Run this before each test to be logged in
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.getByLabel('Email').fill('admin@test.com');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('button', { name: /log in/i }).click();
    await expect(page).toHaveURL('/dashboard');
  });

  test('should create a new tour', async ({ page }) => {
    await page.getByRole('link', { name: /create tour/i }).click();

    await page.getByLabel('Tour name').fill('Sunset Beach Walk');
    await page.getByLabel('Duration').fill('3');
    await page.getByLabel('Price').fill('199');
    await page.getByLabel('Difficulty').selectOption('easy');
    await page.getByRole('button', { name: /save/i }).click();

    // Should show success and redirect
    await expect(page.getByText(/tour created/i)).toBeVisible();
    await expect(page.getByText('Sunset Beach Walk')).toBeVisible();
  });

  test('should search and filter tours', async ({ page }) => {
    await page.goto('/tours');

    // Search
    await page.getByPlaceholder(/search/i).fill('forest');
    await expect(page.getByText('Forest Hike')).toBeVisible();

    // Filter by difficulty
    await page.getByRole('combobox', { name: /difficulty/i }).selectOption('easy');
    const tourCards = page.getByTestId('tour-card');
    for (const card of await tourCards.all()) {
      await expect(card.getByText(/easy/i)).toBeVisible();
    }
  });
});`,
        },
        {
          type: 'heading',
          content: 'Useful Playwright Commands',
        },
        {
          type: 'code',
          language: 'bash',
          code: `# Run all E2E tests
npx playwright test

# Run a specific test file
npx playwright test e2e/auth.spec.js

# Run in headed mode (see the browser)
npx playwright test --headed

# Run in debug mode (step through tests)
npx playwright test --debug

# View the HTML test report
npx playwright show-report

# Generate tests by recording browser actions
npx playwright codegen localhost:5173`,
        },
        {
          type: 'tip',
          variant: 'note',
          content:
            'E2E tests are slow compared to unit tests. Use them for critical user flows (auth, checkout, core CRUD) and cover edge cases with faster unit/integration tests. A good ratio: many unit tests, some integration tests, few E2E tests (the testing pyramid).',
        },
      ],
    },

    // ─── Section 12: Test Configuration & CI ────────────────────────────
    {
      id: 'config-ci',
      title: 'Test Configuration & CI',
      blocks: [
        {
          type: 'text',
          content:
            'Automate testing in your CI pipeline so every push is verified. Configure coverage thresholds, environment variables, and parallel execution to keep feedback fast.',
        },
        {
          type: 'heading',
          content: 'Vitest Configuration (Full)',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'client/vite.config.js',
          code: `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    css: true,
    // Coverage configuration
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.config.*',
        'src/main.jsx',
      ],
      thresholds: {
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80,
      },
    },
    // Performance
    pool: 'forks',
    reporters: ['default'],
    // Watch mode exclusions
    watchExclude: ['node_modules', 'dist'],
  },
});`,
        },
        {
          type: 'heading',
          content: 'Jest Configuration (Full)',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'server/jest.config.js',
          code: `module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.js', '**/*.test.js'],
  setupFilesAfterSetup: ['./test/setup.js'],
  testTimeout: 10000,

  // Coverage
  collectCoverageFrom: [
    'controllers/**/*.js',
    'models/**/*.js',
    'utils/**/*.js',
    'middleware/**/*.js',
    '!**/node_modules/**',
  ],
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 75,
      functions: 80,
      lines: 80,
    },
  },
  coverageReporters: ['text', 'html', 'lcov'],

  // Environment variables for tests
  testEnvironmentOptions: {},

  // Ignore patterns
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],

  // Verbose output in CI
  verbose: !!process.env.CI,
};`,
        },
        {
          type: 'heading',
          content: 'Test Environment Variables',
        },
        {
          type: 'code',
          language: 'bash',
          fileName: 'server/.env.test',
          code: `NODE_ENV=test
PORT=3001
JWT_SECRET=test-secret-for-testing-only
JWT_EXPIRES_IN=1h
JWT_COOKIE_EXPIRES_IN=1`,
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'server/test/setup.js — loading test env',
          code: `const dotenv = require('dotenv');

// Load test environment variables
dotenv.config({ path: '.env.test' });

const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});`,
        },
        {
          type: 'heading',
          content: 'GitHub Actions CI Pipeline',
        },
        {
          type: 'code',
          language: 'yaml',
          fileName: '.github/workflows/test.yml',
          code: `name: Tests

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test-client:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: ./client
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
          cache-dependency-path: client/package-lock.json

      - run: npm ci
      - run: npm run test:run
      - run: npm run test:coverage

      - name: Upload coverage
        uses: actions/upload-artifact@v4
        with:
          name: client-coverage
          path: client/coverage/

  test-server:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: ./server
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
          cache-dependency-path: server/package-lock.json

      - run: npm ci
      - run: npm test -- --ci --forceExit
        env:
          NODE_ENV: test
          JWT_SECRET: ci-test-secret
          JWT_EXPIRES_IN: 1h
          JWT_COOKIE_EXPIRES_IN: 1

      - name: Upload coverage
        uses: actions/upload-artifact@v4
        with:
          name: server-coverage
          path: server/coverage/

  test-e2e:
    runs-on: ubuntu-latest
    needs: [test-client, test-server]
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install dependencies
        run: |
          npm ci --prefix client
          npm ci --prefix server

      - name: Install Playwright browsers
        run: npx playwright install --with-deps chromium

      - name: Run E2E tests
        run: npx playwright test --project=chromium
        env:
          NODE_ENV: test
          JWT_SECRET: ci-test-secret

      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: playwright-report/`,
        },
        {
          type: 'heading',
          content: 'Watch Mode in Development',
        },
        {
          type: 'code',
          language: 'bash',
          fileName: 'Development workflow',
          code: `# Vitest — watch mode is the default
npm run test          # Watches for changes and reruns
# Press 'a' to run all tests
# Press 'f' to run only failed tests
# Press 'p' to filter by file name
# Press 't' to filter by test name

# Jest — use --watchAll flag
npm run test          # "jest --watchAll" from package.json
# Press 'o' to only run tests related to changed files
# Press 'p' to filter by file name
# Press 't' to filter by test name

# Run once (no watch) — for CI
npm run test:run      # vitest run / jest`,
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'Use npm test (watch mode) during development for instant feedback. Use npm run test:run (single run) in CI. Add --forceExit to Jest in CI to prevent hanging from open handles (database connections, timers).',
        },
        {
          type: 'heading',
          content: 'Recommended Packages Summary',
        },
        {
          type: 'package-list',
          packages: [
            {
              name: 'vitest',
              description: 'Fast test runner for Vite projects, Jest-compatible API',
              url: 'https://vitest.dev',
            },
            {
              name: '@testing-library/react',
              description: 'Test React components by user behavior, not implementation',
              url: 'https://testing-library.com/react',
            },
            {
              name: '@testing-library/jest-dom',
              description: 'Custom DOM matchers like toBeInTheDocument, toHaveTextContent',
              url: 'https://testing-library.com/docs/ecosystem-jest-dom',
            },
            {
              name: '@testing-library/user-event',
              description: 'Simulate real user events (click, type, tab) with proper event sequencing',
              url: 'https://testing-library.com/docs/user-event/intro',
            },
            {
              name: 'msw',
              description: 'Mock Service Worker — intercept network requests for testing',
              url: 'https://mswjs.io',
            },
            {
              name: 'supertest',
              description: 'HTTP assertions for testing Express routes without starting a server',
              url: 'https://github.com/ladjs/supertest',
            },
            {
              name: 'mongodb-memory-server',
              description: 'In-memory MongoDB instance for fast, isolated integration tests',
              url: 'https://github.com/nodkz/mongodb-memory-server',
            },
            {
              name: '@playwright/test',
              description: 'End-to-end testing with real browsers, auto-waiting, and tracing',
              url: 'https://playwright.dev',
            },
          ],
        },
      ],
    },
  ],
};

export default testingData;
