const config = {
  extends: [
    '@toktokhan-dev/eslint-config/base',
    'plugin:@next/next/recommended',
  ],
  plugins: ['unused-imports'],
  rules: {
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/no-unused-vars': 'off',
  },
}

module.exports = config
