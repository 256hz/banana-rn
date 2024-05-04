module.exports = {
	env: {
		es6: true,
		node: true,
		'jest/globals': true,
	},
	extends: [
		'airbnb',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
	],
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly',
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 2018,
		sourceType: 'module',
	},
	plugins: [
		'react',
		'@typescript-eslint',
		'jest',
	],
	rules: {
		// These rules are in alphabetical order, minus any symbols (i.e. @typescript goes under T).
		// Please preserve this when adding.
		'array-bracket-spacing': [ 1, 'always' ],
		'arrow-parens': [ 1, 'as-needed' ],
		'class-methods-use-this': 0,
		'eol-last': [ 1, 'always' ],
		'func-call-spacing': 'off',
		'global-require': 0,
		'import/extensions': [ 0, 'never' ],
		'import/no-unresolved': [
			2,
			{
				caseSensitive: false,
				ignore: [
					'@assets',
					'@screens',
					'@elements',
					'@library',
					'@util',
					'@state',
					'../',
					'./',
				],
			},
		],

		'import/prefer-default-export': 0,
		indent: 'off',
		'lines-between-class-members': 0,
		'linebreak-style': 0,
		'max-len': [ 1, 120 ],
		'no-async-promise-executor': 1,
		'no-confusing-arrow': [
			'error',
			{
				allowParens: true,
			},
		],
		'no-empty-function': 'warn',
		'no-multiple-empty-lines': [
			'error',
			{
				max: 2,
				maxEOF: 1,
				maxBOF: 1,
			},
		],
		'no-tabs': [
			'error',
			{
				allowIndentationTabs: true,
			},
		],
		'no-unused-expressions': 0,
		'prefer-object-spread': 1,
		quotes: [ 2, 'single', 'avoid-escape' ],
		'react/destructuring-assignment': [ 1 ],
		'react/function-component-definition': [
			'error',
			{
				namedComponents: 'arrow-function',
				unnamedComponents: 'arrow-function',
			},
		],
		'react/jsx-indent': [ 1, 'tab' ],
		'react/jsx-indent-props': [ 1, 'tab' ],
		'react/jsx-boolean-value': [ 1, 'always' ],
		'react/jsx-filename-extension': [
			1,
			{
				extensions: [
					'.ts',
					'.tsx',
				],
			},
		],
		'react/no-unescaped-entities': [
			'error',
			{
				forbid: [
					'>',
					'}',
				],
			},
		],
		'react/jsx-props-no-spreading': 1,
		'react/prop-types': 0,
		'react/require-default-props': 0,
		semi: [ 'error', 'always' ],
		'@typescript-eslint/camelcase': 'off',
		'@typescript-eslint/explicit-function-return-type': [ 0 ],
		'@typescript-eslint/explicit-member-accessibility': [ 0 ],
		'@typescript-eslint/func-call-spacing': [ 1 ],
		'@typescript-eslint/indent': [ 'error', 'tab' ],
		'@typescript-eslint/interface-name-prefix': 0,
		'@typescript-eslint/no-empty-function': 'warn',
		'@typescript-eslint/no-unused-vars': [
			1,
			{
				argsIgnorePattern: '^_',
			},
		],
		'@typescript-eslint/no-use-before-define': [ 0 ],
		'@typescript-eslint/no-var-requires': 'off',
		'@typescript-eslint/semi': [ 1 ],
	},
};
