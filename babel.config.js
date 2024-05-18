module.exports = function (api) {
	api.cache(true);
	return {
		presets: [
			[ 'module:metro-react-native-babel-preset', { runtime: 'automatic' } ],
			'babel-preset-expo',
			[ '@babel/preset-react', { runtime: 'automatic' } ],
		],
		plugins: [
			[
				'module-resolver',
				{
					extensions: [
						'.js',
						'.jsx',
						'.ts',
						'.tsx',
						'.json',
					],
					root: [ './src' ],
					alias: {
						'@assets': './assets/',
						'@components': './src/components/',
						'@elements': './src/elements/',
						'@library': './src/library/',
						'@state': './src/state/',
						'@util': './src/util/',
					},
					cwd: 'packagejson',
				},
			],
			'react-native-reanimated/plugin',
			[ '@babel/plugin-transform-private-methods', { loose: true } ],
			[ '@babel/plugin-transform-class-properties', { loose: true } ],
			[ '@babel/plugin-transform-private-property-in-object', { loose: true } ],
		],
		overrides: [
			{
				test: /\.jsx?$/,
				plugins: [
					[ '@babel/plugin-transform-react-jsx-self', false ],
					[ '@babel/plugin-transform-react-jsx-source', false ],
				],
			},
		],
	};
};
