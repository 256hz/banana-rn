import Constants from 'expo-constants';

const DONOR = {
	LOGIN_URL: '/donor_auth',
	CREATE_URL: '/donors/create',
};

const CLIENT = {
	LOGIN_URL: '/client_auth',
	CREATE_URL: '/clients/create',
};

const getServerEndPoint = () => {
	if (Constants?.expoConfig?.extra?.productionBuild) {
		return 'https://api.thebegoodproject.org';
	}
	return Constants?.expoConfig?.extra?.ipAddress
		? `http://${Constants.expoConfig.extra.ipAddress}:3000`
		: 'https://api.thebegoodproject.org';
};

const getEnv = () => {
	const variant = Constants?.expoConfig?.extra?.variant;
	const variantSpecificProperties = variant === 'donor' ? DONOR : CLIENT;
	return {
		...variantSpecificProperties,
		USER_IDENTITY: variant,
		API_BASE_URL: getServerEndPoint(),
	};
};

export default getEnv;
