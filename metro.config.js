const path = require('path');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const customResolver = {
	'@assets': path.resolve(__dirname, './assets'),
	'@elements': path.resolve(__dirname, './src/elements'),
	'@screens': path.resolve(__dirname, './src/screens'),
	'@state': path.resolve(__dirname, './src/state'),
	'@library': path.resolve(__dirname, './src/library'),
	'@util': path.resolve(__dirname, './src/util'),
};

const getDefaultExpoConfig = async () => {
	const {
		resolver: { sourceExts, assetExts },
	} = await getDefaultConfig(__dirname);

	return {
		transformer: {
			babelTransformerPath: require.resolve('react-native-svg-transformer'),
			assetPlugins: ['expo-asset/tools/hashAssetFiles'],
		},
		resolver: {
			assetExts: assetExts.filter(ext => ext !== 'svg'),
			sourceExts: [...sourceExts, 'svg'],
			extraNodeModules: customResolver,
		},
		watchFolders: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'assets')],
	};
};

// Merge the default React Native Metro configuration with the default Expo
module.exports = (async () => {
	const customConfig = await getDefaultExpoConfig();
	const defaultConfig = await getDefaultConfig(__dirname);
	return mergeConfig(defaultConfig, customConfig);
})();
