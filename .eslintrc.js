module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module",
    project: ['tsconfig.json', './database/tsconfig.json'],
    extraFileExtensions: [".json"],
  },
  env: {
    node: true,
    jest: true,
  },
  extends: [
    "./node_modules/gts/",
    "eslint:recommended",
    "plugin:prettier/recommended"
  ],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": [
      "error",
      {
        arrowParens: "avoid"
      }
    ],
    "quotes": [
      "error",
      "single",
      {
        "avoidEscape": true,
        "allowTemplateLiterals": true
      }
    ],
    "max-len": ["warn", { "code": 140, "ignoreComments": true }],
    "array-element-newline": ["warn", "consistent"],
    "no-unused-expressions": "off",
    "no-unused-vars": "warn",
    "no-useless-escape": "warn",
    "no-prototype-builtins": "off",
    "no-undef": "warn",
    "no-process-exit": "warn",
    "no-case-declarations": "warn",
    "no-redeclare": "off",
    "eqeqeq": "warn",
    "node/no-extraneous-import": "warn",
    "node/no-unpublished-import": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-redeclare": "error",
  }
};
