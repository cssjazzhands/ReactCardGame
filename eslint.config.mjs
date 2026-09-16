import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import prettier from "eslint-plugin-prettier";
import packageJson from "eslint-plugin-package-json";
import cssModules from "eslint-plugin-css-modules";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

// Clean the browser globals to remove any keys with leading/trailing whitespace
const originalBrowserGlobals = globals.browser;
const cleanedBrowserGlobals = {};
for (const key in originalBrowserGlobals) {
  if (Object.prototype.hasOwnProperty.call(originalBrowserGlobals, key)) {
    const trimmedKey = key.trim();
    cleanedBrowserGlobals[trimmedKey] = originalBrowserGlobals[key];
  }
}

export default [
  {
    ignores: [
      "**/public/**/*",
      ".local/**/*",
      "node_modules/**/*",
      ".cache/**/*",
      "**/coverage/**/*",
    ],
  },
  ...fixupConfigRules(compat.extends("prettier", "plugin:react-hooks/recommended")),

  // Configuration specifically for package.json files
  {
    ...packageJson.configs.recommended,
    files: ["**/package.json"],
    rules: {
      "package-json/restrict-dependency-ranges": [
        "error",
        {
          rangeType: "pin",
        },
      ],
    },
  },

  // Configuration for JavaScript and TypeScript files
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      react,
      "react-hooks": fixupPluginRules(reactHooks),
      "@typescript-eslint": typescriptEslint,
      prettier,
      "css-modules": cssModules,
    },

    languageOptions: {
      globals: {
        ...cleanedBrowserGlobals,
      },

      parser: tsParser,
      ecmaVersion: 12,
      sourceType: "module",

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        warnOnUnsupportedTypeScriptVersion: false,
      },
    },

    settings: {
      react: {
        version: "detect",
      },
    },

    rules: {
      "no-implied-eval": "error",
      "no-bitwise": "error",
      "no-eval": "error",
      "no-extend-native": "error",
      "no-array-constructor": "error",
      "no-caller": "error",
      "no-constant-condition": ["error", { checkLoops: false }],
      "no-empty": ["error", { allowEmptyCatch: true }],
      "no-extra-bind": "error",
      "no-implicit-coercion": ["error", { string: true, boolean: false, number: false }],
      "no-implicit-globals": "error",
      "no-loop-func": "error",
      "no-new": "error",
      "no-new-func": "error",
      "no-new-wrappers": "error",
      "no-proto": "error",
      "no-prototype-builtins": "error",

      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "lodash",
              message:
                "Import only the functions you need from lodash, e.g., import sortBy from 'lodash/sortBy'.",
            },
          ],
        },
      ],

      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrors: "none",
        },
      ],

      "no-import-assign": "error",
      "no-unreachable": "error",
      "prettier/prettier": "error",
    },
  },
];
