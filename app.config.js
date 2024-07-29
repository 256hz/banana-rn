import donorConfig from './app.donor.json';
import clientConfig from './app.client.json';
import 'dotenv/config';

export default ({ config }) => {
	const dynamicConfig = {
		extra: {
			ipAddress: process.env.EXPO_IP_ADDRESS,
			variant: process.env.EXPO_PUBLIC_APP_VARIANT || 'donor',
			storybook: process.env.EXPO_STORYBOOK === 'true',
			useDefaultLocation: process.env.EXPO_USE_DEFAULT_LOCATION === 'true',
			productionBuild: process.env.ENVIRONMENT_MODE === 'production',
			googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
			eas: {
				projectId: process.env.EAS_PROJECT_ID,
			},
		},
	};

	if (process.env.ENVIRONMENT_MODE === 'production') {
		if (process.env.EXPO_PUBLIC_APP_VARIANT === 'client') {
			dynamicConfig.extra.eas = { projectId: process.env.CLIENT_APP_ID || process.env.EAS_PROJECT_ID };
		} else {
			dynamicConfig.extra.eas = { projectId: process.env.DONOR_APP_ID || process.env.EAS_PROJECT_ID };
		}
	}

	let configVariant;

	if (process.env.EXPO_PUBLIC_APP_VARIANT === 'client') {
		configVariant = clientConfig;
	} else {
		configVariant = donorConfig;
	}

	// Merge the configurations
	return {
		...config,
		...configVariant.expo,
		extra: {
			...config.extra,
			...configVariant.expo.extra,
			...dynamicConfig.extra,
		},
		ios: {
			...config.ios,
			...configVariant.expo.ios,
			config: {
				googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
			},
		},
		android: {
			...config.android,
			...configVariant.expo.android,
			config: {
				googleMaps: {
					apiKey: process.env.GOOGLE_MAPS_API_KEY,
				},
			},
		},
		plugins: [
			...config.plugins,
			'expo-font',
			'expo-secure-store',
			[
				'expo-camera',
				{
					cameraPermission: 'Allow BANANA APP to access your camera',
					recordAudioAndroid: true,
				},
			],
		],
	};
};
