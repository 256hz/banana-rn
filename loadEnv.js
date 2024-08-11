require('dotenv').config();
const fs = require('fs');

const easConfig = {
	cli: {
		version: '>= 10.2.2',
		appVersionSource: 'remote',
	},
	build: {
		'client-production': {
			autoIncrement: true,
			developmentClient: false,
			distribution: 'store',
			env: {
				EXPO_PUBLIC_APP_VARIANT: 'client',
				EXPO_USE_DEFAULT_LOCATION: 'true',
				ENVIRONMENT_MODE: 'production',
				CLIENT_APP_ID: process.env.CLIENT_APP_ID,
			},
			ios: {
				resourceClass: 'm-medium',
			},
			android: {},
		},
		'donor-production': {
			autoIncrement: true,
			developmentClient: false,
			distribution: 'store',
			env: {
				EXPO_PUBLIC_APP_VARIANT: 'donor',
				EXPO_USE_DEFAULT_LOCATION: 'true',
				ENVIRONMENT_MODE: 'production',
				DONOR_APP_ID: process.env.DONOR_APP_ID,
			},
			ios: {
				resourceClass: 'm-medium',
			},
			android: {},
		},
	},
	submit: {
		production: {},
	},
};

fs.writeFileSync('eas.json', JSON.stringify(easConfig, null, 2));
