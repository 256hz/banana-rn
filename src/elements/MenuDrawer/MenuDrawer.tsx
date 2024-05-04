import React from 'react';
import {
	Text,
	View,
	ScrollView,
	TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useGlobal from '@state';
import getEnv from '../../util/environment';
import MainOption from './MainOption/MainOption';
import SubOption from './SubOption/SubOption';
import styles from './MenuDrawer.styles';

function MenuDrawer() {
	const [ state, actions ] = useGlobal() as any;
	const { navigate } = useNavigation() as any;
	const { USER_IDENTITY } = getEnv();
	const { logOut } = actions;
	const name = state.user.organization_name ? state.user.organization_name : state.user.first_name;

	return (
		<ScrollView>
			<View style={styles.drawerHeader}>
				<Text style={{ ...styles.username, marginBottom: 0 }}>Hello,</Text>
				<Text style={styles.username}>{name}</Text>
			</View>
			{ USER_IDENTITY === 'donor' && (
				<>
					<TouchableOpacity
						style={styles.menuItem}
						onPress={async () => {
							navigate('QRCodeScannerScreen');
						}}
					>
						<MainOption
							icon="qrCode"
							text="Scan QR Code"
						/>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.menuItem}
						onPress={async () => {
							navigate('DonorDashboardScreen');
						}}
					>
						<MainOption
							icon="donations"
							text="Donations"
						/>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.menuItem}
						onPress={async () => {
							navigate('DonorHistoryScreen');
						}}
					>
						<SubOption
							text="History"
						/>
					</TouchableOpacity>
				</>
			)}
			{ USER_IDENTITY === 'client' && (
				<>
					<TouchableOpacity
						style={styles.menuItem}
						onPress={async () => {
							navigate('DashboardScreen');
						}}
					>
						<MainOption
							icon="donations"
							text="Donations"
						/>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.menuItem}
						onPress={async () => {
							navigate('ClientClaimsScreen');
						}}
					>
						<MainOption
							icon="claims"
							text="Claims"
						/>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.menuItem}
						onPress={async () => {
							navigate('ClientHistoryScreen');
						}}
					>
						<SubOption
							text="History"
						/>
					</TouchableOpacity>
				</>
			)}
			<TouchableOpacity
				style={styles.menuItem}
				onPress={async () => {
					navigate('ContactScreen');
				}}
			>
				<MainOption
					icon="help"
					text="Contact Us"
				/>
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.menuItem}
				onPress={async () => {
					navigate('DeleteAccountScreen');
				}}
			>
				<SubOption
					text="Delete Data"
				/>
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.logoutMenuItem}
				onPress={async () => {
					navigate('LogoutScreen');
				}}
			>
				<MainOption
					icon="logout"
					text="Log Out"
				/>
			</TouchableOpacity>
		</ScrollView>
	);
}

export default MenuDrawer;
