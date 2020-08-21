module.exports = {
  'env': {
    'es2020': true,
    'node': true
  },
  'extends': 'eslint:recommended',
  'parserOptions': {
    'ecmaVersion': 11,
    'sourceType': 'module'
  },

  'rules': {
    'indent': [
      'error', 2
    ],
    'linebreak-style': [
      'error', 'unix'
    ],
    'eol-last': [
      'error', 'always'
    ],
    'quotes': [
      'error', 'single', { 'avoidEscape': true }
    ],
    'semi': [
      'error', 'never'
    ],
    'object-curly-spacing': [
      'error', 'always', { 'arraysInObjects': true }
    ],

    'class-methods-use-this': 'off',
    'no-param-reassign': 'off',
    'camelcase': 'off',
    'no-unused-vars': [
      'error', { 'argsIgnorePattern': 'next' }
    ],
  }
}
