import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/src/tests/setup.ts'],
  testMatch: ['**/tests/**/*.test.ts'],
  moduleNameMapper: {
    '^\\$config/(.*)$': '<rootDir>/src/config/$1',
    '^\\$logger$': '<rootDir>/src/utils/logger',
    '^\\$utils/(.*)$': '<rootDir>/src/utils/$1',
    '^\\$routes/(.*)$': '<rootDir>/src/routes/$1',
  },
};

export default config;
