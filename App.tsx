import React, { useEffect, useState } from 'react';
import { LogBox, Platform, SafeAreaView, Text, View } from 'react-native';
import { Provider } from 'react-native-paper';
import Constants from 'expo-constants';
import * as Font from 'expo-font';
import { TheAlertModal, IncompleteFormAlert, ComingSoonModal, CancelDonationModal } from '@elements';
import NavigationService from '@util/NavigationService';
import { NavigationContainer } from '@react-navigation/native';
import { FullStackNavigator } from './src/routes/Route';
import styles from './App.styles';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

if (Platform.OS !== 'web') {
	LogBox.ignoreLogs(['Warning: componentWillReceiveProps has been renamed', 'Require cycle']);
}

export default function App() {
	// const theme = useColorScheme();
	// const isLightTheme = theme === 'light';
	const [fontsLoaded, setFontsLoaded] = useState(false);

	const loadFonts = async () => {
		await Font.loadAsync({
			// Expo doesn't currently (v36.0.0) support fontWeight or fontStyle
			'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
			'open-sans-regular': require('./assets/fonts/OpenSans-Regular.ttf'),
			'open-sans-light': require('./assets/fonts/OpenSans-Light.ttf'),
		});
		setFontsLoaded(true);
	};

	useEffect(() => {
		loadFonts();
	}, []);

	if (!['donor', 'client'].includes(Constants?.expoConfig?.extra?.variant)) {
		return (
			<View style={styles.container}>
				<Text style={styles.heading}>INCORRECT VARIANT SPECIFIED</Text>
				<Text style={styles.text}>You must specify 'donor' or 'client' in app.json (expo.extra.variant).</Text>
				<Text style={styles.text}>Refresh the app to see your changes.</Text>
			</View>
		);
	}

	return (
		fontsLoaded && (
			<GestureHandlerRootView style={{ flex: 1 }}>
				<Provider>
					<SafeAreaView style={styles.container}>
						<NavigationContainer
							ref={navigatorRef => {
								NavigationService.setTopLevelNavigator(navigatorRef);
							}}
						>
							<FullStackNavigator />
						</NavigationContainer>
						<TheAlertModal />
						<IncompleteFormAlert />
						<ComingSoonModal />
						<CancelDonationModal />
					</SafeAreaView>
				</Provider>
			</GestureHandlerRootView>
		)
	);
}
