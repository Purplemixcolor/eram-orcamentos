import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";

export default [
  {
    ignores: [".next/**", "node_modules/**", "out/**", "coverage/**", "playwright-report/**", "test-results/**"]
  },
  js.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true }
      },
      globals: {
        React: "readonly",
        JSX: "readonly",
        Request: "readonly",
        Response: "readonly",
        console: "readonly",
        process: "readonly"
      }
    },
    rules: {
      "no-unused-vars": "off",
      "no-undef": "off"
    }
  }
];
