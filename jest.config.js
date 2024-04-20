const { defaults } = require('jest-config');

module.exports = {
    testEnvironment: "jsdom",
        preset: "jest-expo",
        transform: {
        "^.+\\.tsx?$": "ts-jest",
        },
        testMatch: ["**/?(*.)+(spec|test).ts?(x)"],
        collectCoverageFrom: [
        "**/*.{ts,tsx}",
        "!**/coverage/**",
        "!**/node_modules/**",
        "!**/babel.config.js",
        "!**/jest.setup.js",
        ],
        moduleFileExtensions: ["tsx", "ts", "js", ...defaults.moduleFileExtensions],
        transformIgnorePatterns: [
        "node_modules/(?!(jest-)?react-native|@react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|sentry-expo|native-base)",
        ],
        coverageReporters: ["json-summary", "text", "lcov"],
}