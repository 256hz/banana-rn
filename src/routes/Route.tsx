import React, { useRef, useEffect } from 'react';
import getEnv from '@util/environment';
import { setTopLevelNavigator } from '@util/navigationService';

import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MakeClaimScreen from '../screens/MakeClaimScreen/MakeClaimScreen';
import LoginScreen from '../screens/LoginScreen';
import ClientDashboardScreen from '../screens/ClientDashboardScreen';
import DonorDashboardScreen from '../screens/DonorDashboardScreen';
import RegistrationScreen from '../screens/RegistrationScreen';
import TermsScreen from '../screens/TermsScreen';
import ContactScreen from '../screens/ContactScreen';
import LoginSuccessScreen from '../screens/LoginSuccessScreen';
import DonationScreen from '../screens/ClientDashboardScreen/DonationScreen';
import QRCodeScannerScreen from '../screens/QRCodeScannerScreen/QRCodeScannerScreen';
import LogoutScreen from '../screens/LogoutScreen';
import DonationsDetailScreen from '../screens/DonationsDetailScreen/DonationsDetailScreen';
import DonorDonationScreen from '../screens/DonorDashboardScreen/DonorDonationScreen';
import DonorHistoryScreen from '../screens/DonorHistoryScreen/DonorHistoryScreen';
import MapScreen from '../screens/MapScreen/MapScreen';

import MainOption from '../elements/MenuDrawer/MainOption/MainOption';
import SubOption from '../elements/MenuDrawer/SubOption/SubOption';
import ClaimDetailsScreen from '../screens/ClaimDetailsScreen/ClaimDetailsScreen';
import ClientClaimsScreen from '../screens/ClientClaimsScreen';
import ClientHistoryScreen from '../screens/ClientHistoryScreen';

function donorOrClientDrawer() {
  const { USER_IDENTITY } = getEnv();

  const DONOR_MENU = {
    'Scan QR Code': {
      component: QRCodeScannerScreen,
      options: { drawerLabel: () => <MainOption text="Scan QR Code" icon="qrCode" /> },
    },
    Donations: {
      component: DonorDashboardScreen,
      options: { drawerLabel: () => <MainOption text="Donations" icon="claims" /> },
    },
    History: {
      component: DonorHistoryScreen,
      options: { drawerLabel: () => <SubOption text="History" /> },
    },
  };

  const CLIENT_MENU = {
    Donations: {
      component: ClientDashboardScreen,
      options: { drawerLabel: () => <MainOption text="Donations" icon="donations" /> },
    },
    Claims: {
      component: ClientClaimsScreen,
      options: { drawerLabel: () => <MainOption text="Claims" icon="claims" /> },
    },
    History: {
      component: ClientHistoryScreen,
      options: { drawerLabel: () => <SubOption text="History" /> },
    },
  };

  const COMMON_MENU = {
    'Contact Us': {
      component: ContactScreen,
      options: { drawerLabel: () => <MainOption text="Contact Us" icon="help" /> },
    },
  };

  return USER_IDENTITY === 'donor'
    ? {
      ...DONOR_MENU,
      ...COMMON_MENU,
    }
    : {
      ...CLIENT_MENU,
      ...COMMON_MENU,
    };
}

// Interface for the options property
interface DrawerItemOptions {
  drawerLabel: () => React.ReactNode; // Assuming drawerLabel is a function returning a React Node
  // Add other properties as needed, e.g., icon
}

// Interface for the structure of each drawer item
interface DrawerItemConfig {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.ComponentType<any>; // Component type for the screen
  options: DrawerItemOptions;
}

// Extending the DrawerContentComponentProps to include the custom drawerItems
interface CustomDrawerContentProps extends DrawerContentComponentProps {
  drawerItems: Record<string, DrawerItemConfig>; // Record of key to DrawerItemConfig
}

const CustomDrawerContent: React.FC<CustomDrawerContentProps> = ({ drawerItems, navigation, ...drawerProps }) => (
  <DrawerContentScrollView {...drawerProps}>
    {Object.entries(drawerItems).map(([ key, { component: { name }, options } ]) => (
      <DrawerItem
        key={key}
        label={options.drawerLabel}
        onPress={() => {
          console.log('drawer nav button clicked', key);
          console.log('component', name);
          console.log('options', options);
          navigation.navigate('DrawerNavigator', { screen: name });
        }}
      />
    ))}
    {/* Include the default DrawerItemList if needed */}
    {/* <DrawerItemList {...props} /> */}
  </DrawerContentScrollView>
);


/* Drawer Navigator */
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  const { USER_IDENTITY } = getEnv();
  const drawerItems = donorOrClientDrawer();

  return (
    <Drawer.Navigator
      // eslint-disable-next-line react/no-unstable-nested-components
      drawerContent={props => <CustomDrawerContent {...props} drawerItems={drawerItems} />}
      initialRouteName="LoginScreen"
      screenOptions={{ headerShown: false }}
    >
      {/* Common screens TODO: verify that these are correct */}
      <Drawer.Screen name="LoginScreen" component={LoginScreen} />
      <Drawer.Screen name="LoginSuccessScreen" component={LoginSuccessScreen} />
      <Drawer.Screen name="ContactScreen" component={ContactScreen} />
      <Drawer.Screen name="LogoutScreen" component={LogoutScreen} />
      <Drawer.Screen name="MapScreen" component={MapScreen} />
      <Drawer.Screen name="RegistrationScreen" component={RegistrationScreen} />
      <Drawer.Screen name="TermsScreen" component={TermsScreen} />

      {/* Donor-specific screens */}
      {USER_IDENTITY === 'donor' && (
        <>
          <Drawer.Screen name="DonorDashboardScreen" component={DonorDashboardScreen} />
          <Drawer.Screen name="DonorDonationScreen" component={DonorDonationScreen} />
          <Drawer.Screen name="DonorHistoryScreen" component={DonorHistoryScreen} />
        </>
      )}

      {/* Client-specific screens */}
      {USER_IDENTITY === 'client' && (
        <>
          <Drawer.Screen name="ClientDashboardScreen" component={ClientDashboardScreen} />
          <Drawer.Screen name="ClientClaimsScreen" component={ClientClaimsScreen} />
          <Drawer.Screen name="ClientHistoryScreen" component={ClientHistoryScreen} />
          <Drawer.Screen name="DonationScreen" component={DonationScreen} />
          <Drawer.Screen name="QRCodeScannerScreen" component={QRCodeScannerScreen} />
          <Drawer.Screen name="ClaimDetailsScreen" component={ClaimDetailsScreen} />
          <Drawer.Screen name="MakeClaimScreen" component={MakeClaimScreen} />
          <Drawer.Screen name="DonationsDetailScreen" component={DonationsDetailScreen} />
        </>
      )}
    </Drawer.Navigator>
  );
}

/* full app navigation --includes logged-out screens */
const Stack = createNativeStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: false }}
      initialRouteName="DrawerNavigator"
    >
      <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  const navigationRef = useRef(null);

  useEffect(() => {
    setTopLevelNavigator(navigationRef.current);
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <StackNavigator />
    </NavigationContainer>
  );
}
