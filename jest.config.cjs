/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    '^@app/(.*)$': '<rootDir>/src/app/$1',
    '^@app$': '<rootDir>/src/app/index.ts',
    '^@pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@pages$': '<rootDir>/src/pages/index.ts',
    '^@shadcn/(.*)$': '<rootDir>/src/shadcn/$1',
    '^@shadcn$': '<rootDir>/src/shadcn/index.ts',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
};
