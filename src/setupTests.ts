import '@testing-library/jest-dom';

Object.defineProperty(window, 'scrollTo', {
  writable: true,
  value: jest.fn(),
});
