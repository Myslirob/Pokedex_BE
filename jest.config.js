/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    rootDir: './',
    moduleFileExtensions: [
        'ts',
        'tsx',
        'js',
        'jsx',
    ],
    setupFilesAfterEnv: [],
    globalSetup: '<rootDir>/jest/globalSetup.ts',
    globalTeardown: '<rootDir>/jest/globalTeardown.ts',
    testEnvironment: 'node',
    testTimeout: 15000,
    verbose: true,
    maxWorkers: 4,
    workerIdleMemoryLimit: '1G',
    snapshotFormat: {
        escapeString: false,
        printBasicPrototype: false,
    },
    transform: {
        '^.+\\.(js|ts|tsx)$': ['ts-jest', {
            diagnostics: false,
            isolatedModules: true,
            tsconfig: './tsconfig.json',
        }],
    },
    testMatch: [
        '<rootDir>/src/**/?(*.)+(test).[t]s?(x)',
    ],
    testPathIgnorePatterns: [
        'node_modules/',
    ],
    reporters: [
        'default',
        'jest-junit',
    ],
};
