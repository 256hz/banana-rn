/**
 * Adds a type to SVG imports on mobile.
 */
declare module '*.svg' {
	import { SvgProps } from 'react-native-svg';

	const content: React.FC<SvgProps>;
	export default content;
}

/**
 * Adds a type to the '@react-native/metro-config' file
 */

/**
 * Adds a type to SVG imports on mobile.
 */
declare module '@react-native/metro-config';

// This ensures Typescript is happy when using the navigate function
export type RootStackParamList = {
	Login:
	| {
		email: string;
		password: string;
	}
	| undefined;
	Drawer: undefined;
	DonorDonation: undefined;
	DonationScreen: undefined;
	MapScreen: undefined;
	MakeClaim: {donation: Record, id: number};
	Logout: undefined;
	ClaimDetailsScreen: {donation: Record};
	ClientClaimsScreen: undefined;
	DonationsDetailScreen: undefined;
	DeleteAccountScreen: undefined;
	DeletedAccountScreen: undefined;
	Register: undefined;
	TermsScreen: undefined;
	ContactScreen: undefined;
	ClientHistoryScreen: undefined;
	QRCodeScannerScreen: undefined;
	DonorDashboardScreen: undefined;
	DonorHistoryScreen: undefined;
	DashboardScreen: undefined;
	LogoutScreen: undefined;
};

declare global {
	namespace ReactNavigation {
		interface RootParamList extends RootStackParamList {}
	}
}
