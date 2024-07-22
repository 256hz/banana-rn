module.exports = function (api) {
	api.cache(true);
	return {
		presets: ['module:metro-react-native-babel-preset'],
		plugins: [
			[
				'module-resolver',
				{
					extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
					root: ['./src'],
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
			['@babel/plugin-transform-class-properties', { loose: true }],
			['@babel/plugin-transform-private-methods', { loose: true }],
		],
	};
};
