import {
  Claim, Donation, ResponseStatus,
} from '@state/index.types';

export interface Actions {
  getActiveDonationsForClient: () => Promise<Donation[]>;
  getClaimedDonationsForClient: () => Promise<Donation[] | Claim[]>;
  getActiveDonationsFromDonor: () => Promise<Donation[]>;
  getClaimedDonationHistoryForClient: () => Promise<Donation[]>;
  getDonationHistory: () => Promise<Donation[]>;
  getLocation: () => Promise<{ latitude: number; longitude: number }>;
  logIn: () => Promise<ResponseStatus>;
  logOut: () => Promise<void>;
  createDonation: () => Promise<ResponseStatus>;
  registerUser: () => Promise<ResponseStatus>;
  scanQrCode: () => Promise<ResponseStatus>;
  requestResetToken: () => Promise<ResponseStatus>;
  submitResetToken: () => Promise<ResponseStatus>;
  submitNewPassword: () => Promise<ResponseStatus>;
  getTravelTimes: () => Promise<{ status: ResponseStatus; times: object }>; // TODO: update times type
}
export { getActiveDonationsForClient } from './getActiveDonationsForClient';
export { getClaimedDonationsForClient } from './getClaimedDonationsForClient';
export { getClaimedDonationHistoryForClient } from './getClaimedDonationHistoryForClient';
export { getActiveDonationsFromDonor } from './getActiveDonationsFromDonor';
export { getDonationHistory } from './getDonationHistory';
export { getLocation } from './getLocation';
export { logIn } from './auth';
export { createDonation } from './createDonation';
export { cancelDonation } from './cancelDonation';
export { claimDonation } from './claimDonation';
export { getTravelTimes } from './hereApi';
export { registerUser } from './registerUser';
export { scanQrCode } from './scanQrCode';
export {
  updateAlert, clearAlert, setResponseStatus,
} from './alert';
export {
  requestResetToken,
  submitResetToken,
  submitNewPassword,
} from './passwordReset';
