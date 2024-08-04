import 'dotenv/config';
import donorConfig from './app.donor.json';
import clientConfig from './app.client.json';

export default ({ config }) => {
	const isClient = process.env.EXPO_PUBLIC_APP_VARIANT === 'client';
	const dynamicConfig = {
		extra: {
			ipAddress: process.env.EXPO_IP_ADDRESS,
			variant: process.env.EXPO_PUBLIC_APP_VARIANT || 'donor',
			storybook: process.env.EXPO_STORYBOOK === 'true',
			useDefaultLocation: process.env.EXPO_USE_DEFAULT_LOCATION === 'true',
			productionBuild: process.env.ENVIRONMENT_MODE === 'production',
			googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
			eas: {
				projectId: isClient ? process.env.CLIENT_APP_ID : process.env.DONOR_APP_ID,
			},
		},
	};

	const configVariant = isClient ? clientConfig : donorConfig;
	const slug = isClient ? 'banana-app-client' : 'banana-app-donor';

	// Merge the configurations
	return {
		...config,
		...configVariant.expo,
		slug, // Dynamically set the slug
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
