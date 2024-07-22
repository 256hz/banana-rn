import { Platform } from 'react-native';
import Constants from 'expo-constants';
import { startActivityAsync } from 'expo-intent-launcher';
import { openURL } from 'expo-linking';

export default Platform.select({
	ios: async () => {
		await openURL('app-settings:');
	},
	android: async () => {
		const appOwnership = Constants.appOwnership as 'expo' | 'standalone' | 'guest' | null;
		const packageName =
			appOwnership === 'standalone'
				? Constants.expoConfig?.android?.package || 'host.exp.exponent'
				: 'host.exp.exponent';

		await startActivityAsync('android.settings.APPLICATION_DETAILS_SETTINGS', {
			data: `package:${packageName}`,
		});
	},
	default: () => Promise.resolve(),
});
