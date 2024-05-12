import donorConfig from './app.donor.json';
import clientConfig from './app.client.json';


export default ({ config }) => {
	require('dotenv').config();

	const dynamicConfig = {
		extra: {
			ipAddress: process.env.EXPO_IP_ADDRESS,
			variant: process.env.EXPO_PUBLIC_APP_VARIANT ? process.env.EXPO_PUBLIC_APP_VARIANT : 'donor',
			storybook: process.env.EXPO_STORYBOOK ? process.env.EXPO_STORYBOOK === 'true' : false,
			useDefaultLocation: process.env.EXPO_USE_DEFAULT_LOCATION
				? process.env.EXPO_USE_DEFAULT_LOCATION === 'true' : false,
			productionBuild: process.env.ENVIRONMENT_MODE === 'production',
		},
	};

	if (process.env.ENVIRONMENT_MODE === 'production') {
		if (process.env.EXPO_PUBLIC_APP_VARIANT === 'client') {
			dynamicConfig.extra.eas = { projectId: process.env.CLIENT_APP_ID };
		} else {
			dynamicConfig.extra.eas = { projectId: process.env.DONOR_APP_ID };
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
		...dynamicConfig,
		extra: {
			...config.extra,
			...configVariant.expo.extra,
			...dynamicConfig.extra,
		},
		plugins: [
			'expo-font',
		],
	};
};
