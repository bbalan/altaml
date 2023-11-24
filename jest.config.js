module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  maxWorkers: 1, // Speed up tests
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },
  // Speed up tests as per: https://github.com/kulshekhar/ts-jest/issues/259
  globals: {
    'ts-jest': {
      isolatedModules: true,
      tsconfig: 'tsconfig.json',
    },
  },
}
