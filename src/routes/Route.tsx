import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import useGlobal from '@state';
import * as colors from '@util/colors';
import getEnv from '../util/environment';
import MakeClaimScreen from '../screens/MakeClaimScreen/MakeClaimScreen';
import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';
import DonorDashboardScreen from '../screens/DonorDashboardScreen';
import RegistrationScreen from '../screens/RegistrationScreen';
import TermsScreen from '../screens/TermsScreen';
import ContactScreen from '../screens/ContactScreen';
import LoginSuccessScreen from '../screens/LoginSuccessScreen';
import DonationScreen from '../screens/DashboardScreen/DonationScreen';
import QRCodeScannerScreen from '../screens/QRCodeScannerScreen/QRCodeScannerScreen';
import LogoutScreen from '../screens/LogoutScreen';
import DonationsDetailScreen from '../screens/DonationsDetailScreen/DonationsDetailScreen';
import DonorDonationScreen from '../screens/DonorDashboardScreen/DonorDonationScreen';
import DonorHistoryScreen from '../screens/DonorHistoryScreen/DonorHistoryScreen';
import MapScreen from '../screens/MapScreen/MapScreen';
import MenuDrawer from '../elements/MenuDrawer/MenuDrawer';
import ClaimDetailsScreen from '../screens/ClaimDetailsScreen/ClaimDetailsScreen';
import ClientClaimsScreen from '../screens/ClientClaimsScreen';
import ClientHistoryScreen from '../screens/ClientHistoryScreen';
import DeleteAccountScreen from '../screens/DeleteAccountScreen';
import DeletedAccountScreen from '../screens/DeletedAccountScreen';

const Drawer = createDrawerNavigator();
const FullStack = createStackNavigator();

export const DonorOrClientDrawer = () => {
	const { USER_IDENTITY } = getEnv();

	return (
		<Drawer.Navigator
			initialRouteName="LoginSuccess"
			drawerContent={MenuDrawer}
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
};

export const FullStackNavigator = () => {
	const [ state ] = useGlobal();
	return (
		<FullStack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
			<FullStack.Screen name="Login" component={LoginScreen} />
			{state.jwt ? (
				<FullStack.Group>
					<FullStack.Screen name="Drawer" component={DonorOrClientDrawer} />
					<FullStack.Screen name="DonorDonation" component={DonorDonationScreen} />
					<FullStack.Screen name="DonationScreen" component={DonationScreen} />
					<FullStack.Screen name="MapScreen" component={MapScreen} />
					<FullStack.Screen name="MakeClaim" component={MakeClaimScreen} />
					<FullStack.Screen name="Logout" component={LogoutScreen} />
					<FullStack.Screen name="ClaimDetails" component={ClaimDetailsScreen} />
					<FullStack.Screen name="DonationsDetailScreen" component={DonationsDetailScreen} />
					<FullStack.Screen name="DeleteAccountScreen" component={DeleteAccountScreen} />
					<FullStack.Screen name="DeletedAccountScreen" component={DeletedAccountScreen} />
				</FullStack.Group>
			) : (
				<FullStack.Group>
					<FullStack.Screen name="Register" component={RegistrationScreen} />
					<FullStack.Screen name="TermsScreen" component={TermsScreen} />
				</FullStack.Group>
			)}
			<FullStack.Screen name="ContactScreen" component={ContactScreen} />
		</FullStack.Navigator>
	);
};

