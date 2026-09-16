export default {
  extends: [
    "stylelint-config-standard", // Standard Stylelint rules
    "stylelint-config-css-modules", // Config for CSS Modules compatibility
  ],
  ignoreFiles: ["src/coverage/**/*", "coverage/**/*", ".local/**/*"],
  rules: {
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: ["value", "import", "export"],
      },
    ],
    "font-family-name-quotes": "always-where-recommended",
    "color-hex-length": "long",
    "shorthand-property-no-redundant-values": null,
    "declaration-block-no-redundant-longhand-properties": null,
    "comment-empty-line-before": null,
    "rule-empty-line-before": null,
  },
};
