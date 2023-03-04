module.exports = {
  verbose: true,
  moduleFileExtensions: [
    'js',
    'jsx',
    'ts',
    'tsx',
    'json',
    'node', // because of 'scrypt' module, required by web3...
  ],

  testEnvironment: 'node',
  testMatch: [
    '**/?(*.)+(spec|test).(ts|tsx)',
    '**/__tests__/*.+(ts|tsx)',
  ],
  setupFilesAfterEnv: ["<rootDir>/src/testing.ts"],
  preset: 'ts-jest',
}
