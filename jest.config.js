const path = require('path')
require('dotenv').config({ path: path.join(__dirname, 'config', '.env.test') })

module.exports = {
  projects: [
    {
      displayName: 'dom',
      preset: 'ts-jest',
      clearMocks: true,
      setupFilesAfterEnv: ['./tests/setupTests.ts'],
      modulePathIgnorePatterns: ['<rootDir>/dist/'],
      testEnvironment: 'jsdom',
      testMatch: ['**/tests/**/*.test.tsx'],
    },
    {
      displayName: 'node',
      preset: 'ts-jest',
      clearMocks: true,
      modulePathIgnorePatterns: ['<rootDir>/dist/'],
      testEnvironment: 'node',
      testMatch: ['**/tests/**/*.test.ts'],
    },
  ],
}
