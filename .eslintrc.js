const { NODE_ENV } = process.env;

const isProduction = NODE_ENV === 'production';
const isTest = NODE_ENV === 'test';

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': isProduction ? 'warn' : 'off',
    'no-debugger': isProduction ? 'warn' : 'off',
    'no-unused-vars': isProduction ? 'warn' : 'off',
    'max-len': 'off',
    'import/prefer-default-export': 'off',
    'no-param-reassign': 'off',
    'linebreak-style': 'off',
    'no-useless-catch': 'off',
    camelcase: 'off',
    'arrow-body-style': 'off',
  },
  globals: {
    document: true,
    console: true,
    Promise: true,
    MutationObserver: true,
    FormData: true,
    XMLHttpRequest: true,
    ActiveXObject: true,
    RegExp: true,
    Element: true,
    Proxy: true,
    Symbol: true,
    setTimeout: true,
    setInterval: true,
    clearInterval: true,
    clearTimeout: true,
    Math: true,
    describe: isTest,
    test: isTest,
    expect: isTest,
    jest: isTest,
  },
};
