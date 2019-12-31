import React, { useEffect, useState } from 'react';
import { View, StyleSheet, YellowBox } from 'react-native';
import { Provider } from 'react-native-paper';
import * as Font from 'expo-font';
import NavigationService from './src/util/NavigationService';
import * as colors from './src/util/colors';
import Route from './src/routes/Route';

YellowBox.ignoreWarnings([
	'Warning: componentWillReceiveProps has been renamed',
]);

export default function App() {
	const [ fontsLoaded, setFontsLoaded ] = useState(false);

	const loadFonts = async () => {
		await Font.loadAsync({
			'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
			'open-sans-regular': require('./assets/fonts/OpenSans-Regular.ttf'),
			'open-sans-light': require('./assets/fonts/OpenSans-Light.ttf'),
			'elegant-icons': require('./assets/fonts/ElegantIcons.ttf'),
		});
		setFontsLoaded(true);
	};

	useEffect(() => {
		loadFonts();
	}, []);

	return fontsLoaded && (
		<Provider>
			<View style={styles.container}>
				<Route ref={navigatorRef => {
					NavigationService.setTopLevelNavigator(navigatorRef);
				}}
				/>
			</View>
		</Provider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.BANANA_YELLOW,
	},
})
