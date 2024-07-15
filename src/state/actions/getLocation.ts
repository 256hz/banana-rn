import { PermissionStatus, getCurrentPositionAsync, requestForegroundPermissionsAsync } from 'expo-location';
import Constants from 'expo-constants';

export const getLocation = async store => {
	// Request permission to access location
	const { status }: { status: PermissionStatus } = await requestForegroundPermissionsAsync();

	if (status === 'granted') {
		try {
			// Get current position
			const { coords } = await getCurrentPositionAsync({});
			// Update state with new coordinates
			await store.setState({ user: { ...store.state.user, coords } });
			return coords;
		} catch (e) {
			console.error('Error getting location:', e);

			// Check if fallback to default location is enabled
			if (Constants.expoConfig?.extra?.useDefaultLocation) {
				const dummyLocation = {
					latitude: 47.609175,
					longitude: -122.325849,
				};
				// Update state with dummy location
				await store.setState({
					user: { ...store.state.user, coords: dummyLocation },
				});
				return dummyLocation;
			}
		}
	} else {
		console.warn('Location permission not granted');
	}

	// Return null coordinates if permission is not granted or an error occurs
	return {
		latitude: null,
		longitude: null,
	};
};
