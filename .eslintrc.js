module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint/eslint-plugin", "sonarjs", "react-hooks"],
  extends: [
    "airbnb-base",
    "prettier",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  overrides: [
    {
      files: [
        "**/*.spec.{js,ts,jsx,tsx}",
        "**/*.config.{js,ts}",
        "**/*.setup.{js,ts}",
        "**/*.e2e-spec.{js,ts,jsx,tsx}",
        "./scripts/*.{js,ts}",
        "./scripts/**/*.{js,ts}",
        "**/__mocks__/**",
      ],
      env: {
        jest: true,
      },
      rules: {
        "global-require": "off",
        "import/no-extraneous-dependencies": "off",
        "jest/no-done-callback": "off",
        "jest/no-mocks-import": "off",
        "sonarjs/no-duplicate-string": "off",
        "sonarjs/no-identical-functions": "off",
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/no-unused-vars": "off",
      },
      plugins: ["jest"],
      extends: ["plugin:jest/recommended", "plugin:jest/style"],
    },
  ],
  rules: {
    "no-console": "off",
    "no-empty-function": "off",
    "no-useless-constructor": "off",
    "no-fallthrough": "off",
    "no-shadow": "off",
    "class-methods-use-this": "off",
    "import/extensions": "off",
    "import/prefer-default-export": "off",
    "import/no-import-module-exports": [
      "error",
      {
        exceptions: ["**/*/main.ts"],
      },
    ],
    "import/no-unresolved": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-shadow": "error",
  },
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  settings: {
    "import/resolver": {
      node: {
        paths: ["src"],
        extensions: [".js", ".ts"],
      },
    },
  },
};
