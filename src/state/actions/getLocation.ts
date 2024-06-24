import { PermissionStatus, getCurrentPositionAsync, requestForegroundPermissionsAsync } from 'expo-location';
import Constants from 'expo-constants';

export const getLocation = async store => {
	const { status }: { status: PermissionStatus } = await requestForegroundPermissionsAsync();

	if (status === 'granted') {
		try {
			const { coords } = await getCurrentPositionAsync({});
			await store.setState({ user: { ...store.state.user, coords } });
			return coords;
		} catch (e) {
			console.log(e);
			// In the event that you're testing in browser or not able to get a location,
			// if you have 'EXPO_USE_DEFAULT_LOCATION=true' in your .env file, this will return a default location
			if (Constants.expoConfig?.extra?.useDefaultLocation) {
				const dummyLocation = {
					latitude: 47.609175,
					longitude: -122.325849,
				};
				await store.setState({
					user: { ...store.state.user, coords: dummyLocation },
				});
				return dummyLocation;
			}
		}
	}
	return {
		latitude: null,
		longitude: null,
	};
};
