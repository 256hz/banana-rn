/* eslint-disable @typescript-eslint/indent */
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
declare module '@react-native/metro-config';

// This ensures Typescript is happy when using the navigate function
export type RootStackParamList = {
	ClaimDetailsScreen: { donation?: IDonation; claim?: IClaim; id: number };
	ClientClaimsScreen: undefined;
	ClientHistoryScreen: undefined;
	ContactScreen: { backDestination: string };
	DashboardScreen: undefined;
	DeleteAccountScreen: undefined;
	DeletedAccountScreen: undefined;
	DonationScreen: undefined;
	DonationsDetailScreen: { donation: IDonation };
	DonorDashboardScreen: undefined;
	DonorDonationScreen: { donation: IDonation };
	DonorHistoryScreen: undefined;
	Drawer: undefined;
	Login: { email: string; password: string } | undefined;
	LoginSuccessScreen: undefined;
	Logout: undefined;
	LogoutScreen: undefined;
	MakeClaim: { donation: IDonation; id: number };
	MakeClaimScreen: { donation: IDonation; id: number };
	MapScreen: undefined;
	QRCodeScannerScreen: undefined;
	Register: undefined;
	TermsScreen: undefined;
};

declare global {
	namespace ReactNavigation {
		interface RootParamList extends RootStackParamList {}
	}
}

export interface IDonor {
	id: number;
	name: string;
	email: string;
	phone: string;
	address_street: string;
	address_city: string;
	address_state: string;
	address_zip: string;
	latitude?: number;
	longitude?: number;
	donor_name: string;
	created_at: Date;
	updated_at: Date;
}

export interface IDonation {
	category: string;
	claim?: IClaim;
	created_at: Date;
	distance: number;
	donor_id: number;
	donor: IDonor;
	food_name: string;
	id: number;
	image_url: string;
	isHistory?: boolean;
	measurement: string;
	per_person: number;
	pickup_instructions: string;
	pickup_location: string;
	status: string;
	total_amount: string;
	updated_at: Date;
}

export type NewDonation = Pick<
	IDonation,
	'food_name' | 'category' | 'total_amount' | 'pickup_location' | 'pickup_instructions'
>;

export interface IClaim extends IDonation {
	// id: number;
	// created_at: Date;
	// updated_at: Date;
	canceled: boolean;
	claimed: boolean;
	client_id: number;
	client_name?: string;
	completed: boolean;
	donation_id: number;
	// donation?: IDonation; // If needed, reference to the donation
	qr_code: string;
	// status: string;
	time_claimed: Date;
}

export interface IClaimHistory {
	claim: IClaim;
	donation: IDonation;
}
