module.exports = {
  preset: 'ts-jest',
  moduleNameMapper: {
    '@src/(.*)': ['<rootDir>/src/$1'],
    '@generated/(.*)': ['<rootDir>/generated/types/$1'],
  },
  collectCoverageFrom: ['**/*.{ts,tsx}'],
  modulePathIgnorePatterns: ['generated', 'typings', 'integration', 'node_modules', 'dist', '.build'],
};
