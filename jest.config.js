module.exports = {
  projects: [
    {
      displayName: 'server',
      testMatch: ['<rootDir>/server/tests/**/*.test.js'],
      testEnvironment: 'node',
      setupFilesAfterEnv: ['<rootDir>/server/tests/setup.js'],
      collectCoverageFrom: [
        'server/src/**/*.js',
        '!server/src/index.js',
        '!server/src/config/**',
      ],
      coverageDirectory: '<rootDir>/coverage/server',
      coverageReporters: ['text', 'lcov', 'html'],
      testTimeout: 10000,
    },
    {
      displayName: 'client',
      testMatch: ['<rootDir>/client/src/**/*.test.{js,jsx}'],
      testEnvironment: 'jsdom',
      setupFilesAfterEnv: ['<rootDir>/client/src/setupTests.js'],
      moduleNameMapping: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/client/src/__mocks__/fileMock.js'
      },
      collectCoverageFrom: [
        'client/src/**/*.{js,jsx}',
        '!client/src/index.js',
        '!client/src/reportWebVitals.js',
        '!client/src/**/*.test.{js,jsx}',
      ],
      coverageDirectory: '<rootDir>/coverage/client',
      coverageReporters: ['text', 'lcov', 'html'],
      transform: {
        '^.+\\.(js|jsx)$': 'babel-jest'
      }
    }
  ],
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  }
};
