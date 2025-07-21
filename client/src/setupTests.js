import '@testing-library/jest-dom';

// Mock file imports
jest.mock('./fileMock.js', () => 'test-file-stub');

// Setup MSW (Mock Service Worker) for API mocking
import { setupServer } from 'msw/node';
import { rest } from 'msw';

// Example API mocks
export const handlers = [
  rest.get('/api/users/me', (req, res, ctx) => {
    return res(
      ctx.json({
        user: {
          id: '1',
          username: 'testuser',
          email: 'test@example.com'
        }
      })
    );
  }),
];

const server = setupServer(...handlers);

// Enable API mocking before tests run
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done
afterAll(() => server.close());

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {
    return null;
  }
  disconnect() {
    return null;
  }
  unobserve() {
    return null;
  }
};
