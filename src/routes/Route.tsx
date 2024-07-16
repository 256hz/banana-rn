import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import useGlobal from '@state';
import * as colors from '@util/colors';
import { RootStackParamList } from '../../declarations';
import getEnv from '../util/environment';
import MenuDrawer from '../elements/MenuDrawer/MenuDrawer';

import ClaimDetailsScreen from '../screens/ClaimDetailsScreen/ClaimDetailsScreen';
import ClientClaimsScreen from '../screens/ClientClaimsScreen';
import ClientHistoryScreen from '../screens/ClientHistoryScreen';
import ContactScreen from '../screens/ContactScreen';
import DashboardScreen from '../screens/DashboardScreen';
import DeleteAccountScreen from '../screens/DeleteAccountScreen';
import DeletedAccountScreen from '../screens/DeletedAccountScreen';
import DonationScreen from '../screens/DashboardScreen/DonationScreen';
import DonationsDetailScreen from '../screens/DonationsDetailScreen/DonationsDetailScreen';
import DonorDashboardScreen from '../screens/DonorDashboardScreen';
import DonorHistoryScreen from '../screens/DonorHistoryScreen/DonorHistoryScreen';
import LoginScreen from '../screens/LoginScreen';
import LoginSuccessScreen from '../screens/LoginSuccessScreen';
import LogoutScreen from '../screens/LogoutScreen';
import MakeClaimScreen from '../screens/MakeClaimScreen/MakeClaimScreen';
import MapScreen from '../screens/MapScreen/MapScreen';
import QRCodeScannerScreen from '../screens/QRCodeScannerScreen/QRCodeScannerScreen';
import RegistrationScreen from '../screens/RegistrationScreen';
import TermsScreen from '../screens/TermsScreen';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator<RootStackParamList>();

export function DonorOrClientDrawer() {
	const { USER_IDENTITY } = getEnv();

	return (
		<Drawer.Navigator
			initialRouteName="LoginSuccess"
			drawerContent={() => <MenuDrawer />}
			screenOptions={{
				headerShown: false,
				drawerPosition: 'right',
				drawerStyle: {
					backgroundColor: colors.NAVY_BLUE,
				},
			}}
		>
			<Drawer.Screen
				name="LoginSuccess"
				component={LoginSuccessScreen}
				options={{
					drawerLabel: () => null,
				}}
			/>
			{USER_IDENTITY === 'donor' && (
				<>
					<Drawer.Screen
						name="QRCodeScannerScreen"
						component={QRCodeScannerScreen}
						options={{
							drawerLabel: 'Scan QR Code',
							drawerLabelStyle: {
								color: colors.WHITE,
							},
						}}
					/>
					<Drawer.Screen
						name="DonorDashboardScreen"
						component={DonorDashboardScreen}
						options={{
							drawerLabel: 'Donations',
							drawerLabelStyle: {
								color: colors.WHITE,
							},
						}}
					/>
					<Drawer.Screen
						name="DonorHistoryScreen"
						component={DonorHistoryScreen}
						options={{
							drawerLabel: 'History',
							drawerLabelStyle: {
								color: colors.WHITE,
							},
						}}
					/>
					<Drawer.Screen
						name="DonationScreen"
						component={DonationScreen}
						options={{
							drawerLabel: 'Make Donation',
							drawerLabelStyle: {
								color: colors.WHITE,
							},
						}}
					/>
				</>
			)}
			{USER_IDENTITY === 'client' && (
				<>
					<Drawer.Screen
						name="DashboardScreen"
						component={DashboardScreen}
						options={{
							drawerLabel: 'Donations',
							drawerLabelStyle: {
								color: colors.WHITE,
								textTransform: 'uppercase',
								marginLeft: 'auto',
								marginRight: 5,
								fontWeight: 'bold',
								fontSize: 20,
								borderTopWidth: 1,
								borderTopColor: colors.WHITE,
							},
						}}
					/>
					<Drawer.Screen
						name="ClientClaimsScreen"
						component={ClientClaimsScreen}
						options={{
							drawerLabel: 'Claims',
							drawerLabelStyle: {
								color: colors.WHITE,
								textTransform: 'uppercase',
								fontWeight: 'bold',
								fontSize: 20,
								marginLeft: 'auto',
								marginRight: 5,
								letterSpacing: 0.5,
								marginBottom: 10,
							},
						}}
					/>
					<Drawer.Screen
						name="ClientHistoryScreen"
						component={ClientHistoryScreen}
						options={{
							drawerLabel: 'History',
							drawerLabelStyle: {
								color: colors.WHITE,
								textTransform: 'uppercase',
								fontWeight: 'bold',
								fontSize: 20,
								marginLeft: 'auto',
								marginRight: 5,
								letterSpacing: 0.5,
								marginBottom: 10,
							},
						}}
					/>
				</>
			)}
			<Drawer.Screen
				name="ContactScreen"
				component={ContactScreen}
				options={{
					drawerLabel: 'Contact Us',
					drawerLabelStyle: {
						color: colors.WHITE,
						textTransform: 'uppercase',
						marginLeft: 'auto',
						marginRight: 5,
						fontWeight: 'bold',
						fontSize: 20,
					},
				}}
			/>
			<Drawer.Screen
				name="DeleteAccountScreen"
				component={DeleteAccountScreen}
				options={{
					drawerLabel: 'Delete Account',
					drawerLabelStyle: {
						color: colors.WHITE,
						textTransform: 'uppercase',
						marginLeft: 'auto',
						marginRight: 5,
						fontWeight: 'bold',
						fontSize: 20,
					},
				}}
			/>
			<Drawer.Screen
				name="LogoutScreen"
				component={LogoutScreen}
				options={{
					drawerLabel: 'Logout',
					drawerLabelStyle: {
						color: colors.WHITE,
						textTransform: 'uppercase',
						marginLeft: 'auto',
						marginRight: 5,
						fontWeight: 'bold',
						fontSize: 20,
					},
				}}
			/>
		</Drawer.Navigator>
	);
}

export function FullStackNavigator() {
	const [state] = useGlobal();
	return (
		<Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Login" component={LoginScreen} />
			{state.jwt ? (
				<Stack.Group>
					<Stack.Screen name="Drawer" component={DonorOrClientDrawer} />
					<Stack.Screen name="DonationScreen" component={DonationScreen} />
					<Stack.Screen name="MapScreen" component={MapScreen} />
					<Stack.Screen name="MakeClaim" component={MakeClaimScreen} />
					<Stack.Screen name="ClaimDetailsScreen" component={ClaimDetailsScreen} />
					<Stack.Screen name="ClientHistoryScreen" component={ClientHistoryScreen} />
					<Stack.Screen name="DonationsDetailScreen" component={DonationsDetailScreen} />
					<Stack.Screen name="DeleteAccountScreen" component={DeleteAccountScreen} />
					<Stack.Screen name="DeletedAccountScreen" component={DeletedAccountScreen} />
				</Stack.Group>
			) : (
				<Stack.Group>
					<Stack.Screen name="Logout" component={LogoutScreen} />
					<Stack.Screen name="Register" component={RegistrationScreen} />
					<Stack.Screen name="TermsScreen" component={TermsScreen} />
				</Stack.Group>
			)}
			<Stack.Screen name="ContactScreen" component={ContactScreen} />
			<Stack.Screen name="LoginSuccessScreen" component={LoginSuccessScreen} />
		</Stack.Navigator>
	);
}
