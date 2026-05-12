import { defineConfig, globalIgnores } from "eslint/config";
import { ESLintRules } from "eslint/rules";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import unusedImports from "eslint-plugin-unused-imports";

const ruleOpts = <K extends keyof ESLintRules>(_: K, opts: ESLintRules[K]) =>
  opts;

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ["**/*back*/**"],
    rules: {
      "no-restricted-imports": ruleOpts("no-restricted-imports", [
        "error",
        {
          patterns: [
            {
              regex: "(front)",
              message: "Do not import front-end modules into back-end code",
            },
          ],
        },
      ]),
    },
  },
  {
    files: ["**/*front*/**"],
    rules: {
      "no-restricted-imports": ruleOpts("no-restricted-imports", [
        "error",
        {
          patterns: [
            {
              regex: "back",
              message: "Do not import back-end modules into front-end code",
            },
          ],
        },
      ]),
    },
  },
  {
    rules: {
      "no-unescaped-entities": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    },
  },
  {
    plugins: {
      "unused-imports": unusedImports,
    },
    rules: {
      "unused-imports/no-unused-imports": "warn",
    },
  },
]);

export default eslintConfig;
