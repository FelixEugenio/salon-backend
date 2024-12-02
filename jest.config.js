module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
    globals: {
      'ts-jest': {
        isolatedModules: true,
      },
    },
  };
  