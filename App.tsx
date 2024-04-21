import React, { useEffect, useState } from 'react';
import {
  // LogBox,
  // Platform,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import Constants from 'expo-constants';
import * as Font from 'expo-font';
import {
  CancelDonationModal,
  ComingSoonModal,
  ErrorBoundary,
  IncompleteFormAlert,
  TheAlertModal,
} from '@elements';
import Route from './src/routes/Route';
import styles from './App.styles';

// TODO: is this needed? if not, remove.
// if (Platform.OS !== "web") {
//   LogBox.ignoreLogs([
//     "Warning: componentWillReceiveProps has been renamed",
//     "Require cycle",
//   ]);
// }

export default function App() {
  const [ fontsLoaded, setFontsLoaded ] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      // TODO: is this still tru? (we're on expo 48 now)
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

  if (
    ![ 'donor', 'client' ].includes(Constants.manifest?.extra?.variant)
  ) {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>
          INCORRECT VARIANT SPECIFIED
        </Text>
        <Text style={styles.text}>
          You must specify 'donor' or 'client' in app.json
          (expo.extra.variant).
        </Text>
        <Text style={styles.text}>
          Refresh the app to see your changes.
        </Text>
      </View>
    );
  }

  return (
    fontsLoaded && (
      <ErrorBoundary>
        <PaperProvider>
          <SafeAreaView style={styles.container}>
            <Route />
            <TheAlertModal />
            <IncompleteFormAlert />
            <ComingSoonModal />
            <CancelDonationModal />
          </SafeAreaView>
        </PaperProvider>
      </ErrorBoundary>
    )
  );
}
