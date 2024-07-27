module.exports = {
	env: {
		es6: true,
		node: true,
		'jest/globals': true,
	},
	extends: [
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
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
	plugins: ['react', '@typescript-eslint', 'jest', 'prettier', 'import'],
	rules: {
		'array-bracket-spacing': ['error', 'never'],
		'arrow-parens': ['error', 'as-needed'],
		'class-methods-use-this': 'off',
		'eol-last': ['error', 'always'],
		'func-call-spacing': 'off',
		'func-names': 'off',
		'prefer-arrow-callback': 'off',
		'global-require': 'off',
		'import/extensions': ['off', 'never'],
		'import/no-unresolved': [
			'error',
			{
				caseSensitive: false,
				ignore: ['@assets', '@screens', '@elements', '@library', '@util', '@state', '../', './'],
			},
		],
		'import/prefer-default-export': 'off',
		indent: 'off',
		'@typescript-eslint/indent': ['error', 'tab', { SwitchCase: 1, VariableDeclarator: 1 }],
		'lines-between-class-members': 'off',
		'linebreak-style': 'off',
		'no-async-promise-executor': 'warn',
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
		'no-tabs': 'off',
		'no-unused-expressions': 'off',
		'prefer-object-spread': 'warn',
		quotes: ['error', 'single', { avoidEscape: true }],
		'react/destructuring-assignment': 'warn',
		'react/jsx-indent': ['warn', 'tab'],
		'react/jsx-indent-props': ['warn', 'tab'],
		'react/jsx-boolean-value': ['warn', 'always'],
		'react/jsx-filename-extension': [
			'warn',
			{
				extensions: ['.ts', '.tsx'],
			},
		],
		'react/no-unescaped-entities': [
			'error',
			{
				forbid: ['>', '}'],
			},
		],
		'react/jsx-props-no-spreading': 'off',
		'react/prop-types': 'off',
		'react/require-default-props': 'off',
		'react/function-component-definition': [
			'off',
			{
				namedComponents: 'function-declaration',
				unnamedComponents: 'arrow-function',
			},
		],
		semi: ['error', 'always'],
		'@typescript-eslint/camelcase': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/explicit-member-accessibility': 'off',
		'@typescript-eslint/func-call-spacing': ['warn'],
		'@typescript-eslint/interface-name-prefix': 'off',
		'@typescript-eslint/no-empty-function': 'warn',
		'@typescript-eslint/no-unused-vars': [
			'warn',
			{
				argsIgnorePattern: '^_',
			},
		],
		'@typescript-eslint/no-use-before-define': 'off',
		'@typescript-eslint/no-var-requires': 'off',
		'@typescript-eslint/semi': ['warn'],
		'prettier/prettier': [
			'error',
			{
				useTabs: true,
				tabWidth: 2,
				endOfLine: 'auto',
				printWidth: 120,
			},
		],
	},
	ignorePatterns: ['node_modules/'],
};
