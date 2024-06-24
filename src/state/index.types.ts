import { IClaim, IDonation, NewDonation } from '../../declarations';

export interface IUser {
	email: string;
	password: string;
	first_name: string;
	last_name: string;
	id: number;
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
export interface IDonorState extends IUser {
	organization_name: string;
	pickup_instructions: string;
	business_license: string;
}

export interface IClientState extends IUser {
	transportation_method: string;
	ethnicity: string;
	gender: string;
}

/**
 * An alert to be displayed to the user.
 */
export interface IAlert {
	/**
	 * Title of the alert.
	 */
	title?: string;

	/**
	 * Type of the alert.
	 */
	type: 'default' | 'incomplete form' | 'coming soon' | 'cancel donation' | 'donation cancelled' | 'donation published';

	/**
	 * Message to the user.
	 */
	message?: string;

	/**
	 * Whether the alert can be casually dismissed by the user
	 * (i.e. tapping the content behind a modal).
	 */
	dismissable?: boolean;

	cancelFn?: () => void;

	confirmFn?: () => void;
}

export interface IInitialState {
	userIdentity: 'donor' | 'client';
	apiBaseUrl: string;
	loginUrl: string;
	createUrl: string;
	alert?: IAlert;
	jwt?: string;
	user?: IDonorState | IClientState;
	donationsOrClaims: IDonation[] | IClaim[];
}

export type StatusCode = 200 | 201 | 202 | 400 | 401 | 403 | 404 | 418 | 500;

export interface ILocation {
	latitude: number;
	longitude: number;
}

export interface IActions {
	cancelDonation: (donationId: number) => Promise<StatusCode>;
	claimDonations: () => Promise<StatusCode>;
	clearAlert: () => void;
	getActiveDonationsForClient: () => Promise<IDonation[]>;
	getClaimedDonationsForClient: () => Promise<IDonation[] | IClaim[]>;
	getClaimHistoryForClient: () => Promise<IDonation[] | IClaim[]>;
	getDonationHistory: () => Promise<IDonation[]>;
	getDonations: () => Promise<IDonation[]>;
	getLocation: () => Promise<{ latitude: number; longitude: number }>;
	getTravelTimes: () => Promise<{ status: StatusCode; times: object }>;
	logIn: (options: { email: string; password: string }) => Promise<StatusCode>;
	logOut: () => Promise<void>;
	postDonation: (donation: NewDonation) => Promise<StatusCode>;
	register: () => Promise<StatusCode>;
	requestResetToken: () => Promise<StatusCode>;
	scan: (qrCode: string) => Promise<StatusCode>;
	submitNewPassword: () => Promise<StatusCode>;
	submitResetToken: () => Promise<StatusCode>;
	updateAlert: (alert: IAlert) => void;
}

export type UseGlobalType = [IInitialState, IActions];
