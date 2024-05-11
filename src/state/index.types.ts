export interface DonorState {
	organization_name: string;
	business_license: string;
}

export interface ClientState {
	transportation_method: string;
	ethnicity: string;
	gender: string;
}

export interface SharedProps {
	email: string;
	password: string;
	address_street: string;
	address_city: string;
	address_state: string;
	address_zip: string;
	account_status: string;
	coords: {
		latitude?: number;
		longitude?: number;
	};
}

export interface Claim {
	client_id: number;
	donation_id: number;
	qr_code: string;
	completed: boolean;
	created_at: Date;
	updated_at: Date;
	time_claimed: Date;
	canceled: boolean;
}

export interface Donation {
	food_name: string;
	measurement: string;
	per_person: number;
	total_servings: number;
	donor_id: number;
	duration_minutes: number;
	image_url: string;
	created_at: Date;
	updated_at: Date;
	canceled: boolean;
	pickup_location: string;
}

/**
 * An alert to be displayed to the user.
 */
export interface Alert {
	/**
	 * Title of the alert.
	 */
	title: string;

	/**
	 * Type of the alert.
	 */
	type: 'default'|'incomplete form'|'coming soon'|'cancel donation'|'donation cancelled'|'donation published' |
	'bad url';

	/**
	 * Message to the user.
	 */
	message: string;

	/**
	 * Whether the alert can be casually dismissed by the user
	 * (i.e. tapping the content behind a modal).
	 */
	dismissable?: boolean;

	cancelFn?: () => void;

	confirmFn?: () => void;
}

export interface InitialState {
	userIdentity: 'donor' | 'client';
	apiBaseUrl: string;
	loginUrl: string;
	createUrl: string;
	alert?: Alert;
	jwt?: string;
	user?: DonorState | ClientState | SharedProps;
	donationsOrClaims?: Donation[] | Claim[];
}

export interface StatusCode {
	code: 200 | 202 | 400 | 403 | 404 | 418 | 500;
}

export interface Location {
	latitude: number;
	longitude: number;
}

export type RootStackParamList = {
	Login: undefined;
	Register: undefined;
	TermsScreen: undefined;
	ContactScreen: undefined;
	LoginSuccess: undefined;
	DashboardScreen: undefined;
	DonorDashboardScreen: undefined;
	DonationScreen: undefined;
	QRCodeScannerScreen: undefined;
	LogoutScreen: undefined;
	DonationsDetailScreen: undefined;
	DonorDonationScreen: undefined;
	DonorHistoryScreen: undefined;
	MapScreen: undefined;
	MakeClaim: undefined;
	ClaimDetails: undefined;
	ClientClaimsScreen: undefined;
	ClientHistoryScreen: undefined;
	DeleteAccountScreen: undefined;
	DeletedAccountScreen: undefined;
	Drawer: undefined;
};

export interface Actions {
	getActiveDonationsForClient: () => Promise<Donation[] | []>;
	getClaimedDonationsForClient: () => Promise<Donation[] | Claim[] | []>;
	getClaimHistoryForClient: () => Promise<Donation[]| Claim[] | []>;
	getDonations: () => Promise<Donation[] | []>;
	getDonationHistory: () => Promise<Donation[] | []>;
	getLocation: () => Promise<{ latitude: number; longitude: number }>;
	logIn: () => Promise<StatusCode>;
	logOut: () => Promise<void>;
	postDonation: () => Promise<StatusCode>;
	register: () => Promise<StatusCode>;
	scan: () => Promise<StatusCode>;
	requestResetToken: () => Promise<StatusCode>;
	submitResetToken: () => Promise<StatusCode>;
	submitNewPassword: () => Promise<StatusCode>;
	getTravelTimes: () => Promise<{status: StatusCode; times: object}>;
	updateAlert: (alert: Alert) => void;
}

export type UseGlobalType = [ InitialState, Actions ];
