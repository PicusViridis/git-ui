module.exports = {
  preset: 'ts-jest',
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
  displayName: 'jsdom',
  testEnvironment: 'jsdom',
  modulePathIgnorePatterns: ['dist'],
  coveragePathIgnorePatterns: ['mocks'],
  testMatch: ['<rootDir>/tests/**/*.test.ts*'],
  setupFilesAfterEnv: ['<rootDir>/tests/setup.tsx'],
}
