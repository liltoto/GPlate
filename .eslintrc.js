module.exports = {
  env: { browser: false, commonjs: true, es6: true, jest: true, node: true },
  extends: [
    'airbnb-base',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:security/recommended',
  ],
  plugins: ['prettier', 'security'],
  globals: { Atomics: 'readonly', SharedArrayBuffer: 'readonly' },
  parserOptions: { ecmaVersion: 2018 },
  rules: {
    'no-console': ['error', { allow: ['warn', 'info'] }],
    'prettier/prettier': 'error',
    'newline-per-chained-call': 0,
    'no-empty-function': 'error',
    'nonblock-statement-body-position': 0,
    'implicit-arrow-linebreak': 0,
  },
}
