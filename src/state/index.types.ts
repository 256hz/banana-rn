export interface SharedProps {
  id: number;
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

export interface DonorState extends SharedProps {
  organization_name: string;
  business_license: string;
  pickup_instructions: string;
}

type DonorLite = Pick<
DonorState,
'address_city'
| 'address_street'
| 'address_state'
| 'address_zip'
| 'organization_name'
| 'coords'
>;

export interface ClientState extends SharedProps {
  transportation_method: string;
  ethnicity: string;
  gender: string;
}

export interface DonorRegisterProps {
  email: string;
  password: string;
  retypedPassword: string;
  firstName: string;
  lastName: string;
  businessName: string;
  businessAddress: string;
  city: string;
  state: string;
  zip: string;
  pickupInstructions: string;
  // license: string
  // licenseVerificationImage: any
}

export interface ClientRegisterProps {
  email: string;
  password: string;
  retypedPassword: string;
  firstName: string;
  lastName: string;
  // street: string;
  // city: string;
  // state: string;
  // zip: string;
  // transportationMethod: string;
  // ethnicity: string;
  // gender: string;
}

export type ClientOrDonorRegisterProps = ClientRegisterProps | DonorRegisterProps;

export enum ClaimStatus {
  ACTIVE = 'active',
  CLOSED = 'closed',
  EXPIRED = 'expired',
}

export enum DonationStatus {
  ACTIVE = 'active',
  CLAIMED = 'claimed',
  CLOSED = 'closed',
  DELETED = 'deleted',
  EXPIRED = 'expired',
}

export enum DonationCategory {
  BREAD = 'Bread',
  DAIRY = 'Dairy',
  HOT_MEAL = 'Hot Meal',
  PRODUCE = 'Produce',
  PROTEIN = 'Protein',
  OTHERS = 'Others',
}

export interface Claim {
  id: number;
  client_id: number;
  client_name: string;
  donation_id: number;
  qr_code: string;
  completed: boolean;
  created_at: Date;
  updated_at: Date;
  time_claimed: Date;
  canceled: boolean;
  status: ClaimStatus;
}

type ClaimLite = Pick<Claim, 'client_name' | 'qr_code' | 'status'>;

export interface Donation {
  id: number;
  category: string;
  created_at: Date;
  updated_at: Date;
  donor_id: number;
  duration_minutes: number;
  food_name: string;
  image_url: string;
  measurement: string;
  per_person: number;
  pickup_location: string;
  total_amount: number;
  status: string;
  distance: number;
  claim: ClaimLite; /* NOTE: may need to add back **full** Claim type */
  donor: DonorLite; /* NOTE: may need to add back **full** Donor type */
  isHistory?: boolean;
}

export interface NewDonation {
  itemName: string;
  category: string;
  totalAmount: string;
  pickupAddress: string;
  pickupInstructions: string;
}

/**
 * An alert to be displayed to the user.
 */
export interface Alert {
  title: string;
  type:
  | 'default'
  | 'incomplete form'
  | 'coming soon'
  | 'cancel donation'
  | 'donation cancelled'
  | 'donation published';

  message: string;

  /**
   * Whether the alert can be casually dismissed by the user
   * (i.e. tapping the content behind a modal).
   */
  dismissible?: boolean;

  cancelFn?: () => void;

  confirmFn?: () => void;
}

export type StatusCode = 200 | 201 | 202 | 400 | 403 | 401 | 404 | 409 | 418 | 500;

export interface ResponseStatus {
  message?: string;
  code: number; /* StatusCode; TODO: try to replace `number` w/ `StatusCode` in the future */
}

export type UserIdentity = 'donor' | 'client';

export type User = DonorState | ClientState;

export interface InitialState {
  userIdentity: UserIdentity;
  apiBaseUrl: string;
  loginUrl: string;
  createUrl: string;
  alert?: Alert;
  jwt?: string;
  user?: User;
  activeDonationsForClient?: Donation[];
  claimedDonationsForClient?: Donation[];
  claimedDonationHistoryForClient?: Donation[] /* TODO: double check this type */;
  donationHistory?: Donation[] /* TODO: double check this type */;
  activeDonationsFromDonor?: Donation[] /* TODO: double check this type */;
  email?: string;
  password?: string;
  responseStatus?: ResponseStatus;
  currentClaim?: Claim;
  claimedDonation?: Donation;
  travelTimes: { /* TODO: double check this type.. */
    pedestrian: string;
    publicTransport: string;
    bicycle: string;
  };
}

export interface Location {
  latitude: number;
  longitude: number;
}
