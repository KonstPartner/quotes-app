/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    '^@app/(.*)$': '<rootDir>/src/app/$1',
    '^@app$': '<rootDir>/src/app/index.ts',
    '^@pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@shadcn/(.*)$': '<rootDir>/src/shadcn/$1',
    '^@shadcn$': '<rootDir>/src/shadcn/index.ts',
    '^@entities/(.*)$': '<rootDir>/src/entities/$1',
    '^@features/(.*)$': '<rootDir>/src/features/$1',
    '^@constants/(.*)$': '<rootDir>/src/constants/$1',
    '^@constants$': '<rootDir>/src/constants/index.ts',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@utils$': '<rootDir>/src/utils/index.ts',
    '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@hooks$': '<rootDir>/src/hooks/index.ts',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
};
