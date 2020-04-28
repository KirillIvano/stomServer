module.exports = {
    'env': {
        'es6': true,
        'node': true,
    },
    'extends': [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    'globals': {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly',
    },
    'plugins': [
        '@typescript-eslint'
    ],
    "parser": "@typescript-eslint/parser",
    'parserOptions': {
        'ecmaVersion': 2019,
        'sourceType': 'module',
        'ecmaFeatures': {
            'jsx': true
        }
    },
    'rules': {
        'indent': ['error', 4],
        'quotes': ['error', 'single'],
        'semi': ['error', 'always'],

        // codestyle
        'arrow-spacing': ['error'],
        'prefer-arrow-callback': ['error'],
        'prefer-const': ['error'],
        'camelcase': ['error'],
        'comma-dangle': ['error', 'always-multiline'],
        'eol-last': ['error'],
        'key-spacing': ['error'],
        'no-trailing-spaces': ['error'],
        'handle-callback-err': ['error'],
        'max-len': ['warn', {code: 120}],
        'no-console': ['error'],
        
        '@typescript-eslint/explicit-function-return-type': 'off',
    }
};