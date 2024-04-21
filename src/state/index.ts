import getEnv from '@util/environment';
import { create } from 'zustand';
import { navigate } from '@util/navigationService';
import {
  Alert,
  InitialState,
  ResponseStatus,
  UserIdentity,
  ClientOrDonorRegisterProps,
  User,
  Donation,
  NewDonation,
} from './index.types';
import * as actions from './actions';

const {
  USER_IDENTITY, API_BASE_URL, LOGIN_URL, CREATE_URL,
} = getEnv();

export const initialState: InitialState = {
  jwt: '',
  user: undefined,
  email: '',
  alert: undefined,
  password: '',
  loginUrl: LOGIN_URL,
  createUrl: CREATE_URL,
  apiBaseUrl: API_BASE_URL,
  userIdentity: USER_IDENTITY,
  activeDonationsForClient: [],
  activeDonationsFromDonor: [],
  currentClaim: undefined,
  claimedDonation: undefined,
  responseStatus: undefined,
  travelTimes: {
    pedestrian: 'calculating...',
    publicTransport: 'calculating...',
    bicycle: 'calculating...',
  },
};

export interface GlobalState extends InitialState {
  updateAlert: (alert: Alert) => void;
  setResponseStatus: (statusCode: ResponseStatus) => void;
  clearEmailAndPassword: () => void;
  clearAlert: () => void;
  logIn: (
    email: string,
    password: string,
    loginUrl: string,
    userIdentity: string,
  ) => void;
  logOut: () => void;
  setEmail: (email: string) => void;
  setClaimedDonation: (claimedDonation?: Donation) => void;
  setPassword: (password: string) => void;
  createDonation: (jwt: string, user: User, donation: NewDonation,) => void;
  cancelDonation: (jwt: string, donationId: number) => void;
  claimDonation: (jwt: string, donationId: number, clientId: number) => void;
  getActiveDonationsForClient: (jwt: string, user: User) => void;
  getClaimedDonationsForClient: (jwt: string, user: User) => void;
  getClaimedDonationHistoryForClient: (jwt: string, user: User) => void;
  getDonationHistory: (jwt: string, user: User) => void;
  getActiveDonationsFromDonor: (jwt: string, user: User) => void;
  getTravelTimes: (
    jwt: string,
    donorId: number,
    clientLat?: number,
    clientLong?: number,
  ) => void,
  getLocation: () => void;
  registerUser: (userIdentity: UserIdentity, createUrl: string, userToRegister: ClientOrDonorRegisterProps) => void;
  scanQrCode: (jwt: string, qrCode: string) => void;
}

const useGlobalStore = create<GlobalState>(set => ({
  ...initialState,
  updateAlert: alert => set(actions.updateAlert(alert)),
  setResponseStatus: statusCode => set(actions.setResponseStatus(statusCode)),
  clearAlert: () => set(actions.clearAlert()),
  logIn: async (
    email,
    loginUrl,
    password,
    userIdentity,
  ) => {
    const { jwt, user, responseStatus } = await actions.logIn(
      email,
      loginUrl,
      password,
      userIdentity,
    );

    set(state => {
      if (responseStatus) {
        if (responseStatus.code === 401) {
          state.updateAlert({
            title: 'Invalid Credentials',
            message: 'Incorrect email or password',
            type: 'default',
            dismissible: true,
          });
        } else if (responseStatus.code === 404) {
          state.updateAlert({
            title: 'Server Error',
            message: 'Server not found - please try again',
            type: 'default',
            dismissible: true,
          });
        } else if (responseStatus.code === 500) {
          state.updateAlert({
            title: 'Network Error',
            message: 'Network error - please try again',
            type: 'default',
            dismissible: true,
          });
        }
      }
      return {
        responseStatus,
        jwt,
        user,
      };
    });
  },
  logOut: () => set({ ...initialState }),
  setEmail: email => set({ email }),
  setPassword: password => set({ password }),
  clearEmailAndPassword: () => set({
    email: '',
    password: '',
  }),
  cancelDonation: async (jwt, donationId) => {
    const { responseStatus, donation: cancelledDonation } = await actions.cancelDonation(jwt, donationId);
    set(state => {
      let updatedActiveDonations = state.activeDonationsFromDonor;

      if (responseStatus && responseStatus.code !== 202) {
        state.updateAlert({
          title: 'Uh Oh!',
          message: 'Something went wrong.',
          type: 'default',
          dismissible: true,
        });
      } else {
        updatedActiveDonations = state.activeDonationsFromDonor?.filter(donation => donation.id !== cancelledDonation.id);

        navigate('DonorDashboardScreen');
      }
      return {
        responseStatus,
        activeDonationsFromDonor: updatedActiveDonations,
      };
    });
  },
  createDonation: async (jwt, user, donation) => {
    const { responseStatus, donation: newDonation } = await actions.createDonation(jwt, user, donation);

    set(state => {
      const updatedActiveDonations = state.activeDonationsFromDonor;


      // switch (statusCode) {
      //   case 201: Alert.alert('Donation created!'); getDonationsOrClaims(); navigate('LoginSuccessScreen'); return;
      //   case 202: Alert.alert('Donation updated!'); getDonationsOrClaims(); navigate('LoginSuccessScreen'); return;
      //   case (400 || 406): Alert.alert('Bad data - sorry, please try again!'); return;
      //   case (401 || 403): Alert.alert('Authentication error - please log in again.'); logOut(); navigate('LoginScreen'); return;
      //   case 404: Alert.alert('Network error - sorry, please try again!'); return;
      //   case 500: Alert.alert('Server problem - sorry, please try again!'); return;
      //   default: Alert.alert('Sorry, something went wrong. Please try again.');
      // }

      // TODO: update this IF block to roughly match the above switch
      if (responseStatus && responseStatus.code >= 200 && responseStatus.code < 300) {
        state.updateAlert({
          title: 'Success!',
          message: 'Your donation has been created.',
          type: 'donation published',
          dismissible: true,
        });

        if (newDonation) {
          updatedActiveDonations?.push(newDonation);

          navigate('DonorDashboardScreen');
        }
      } else {
        state.updateAlert({
          title: 'Uh Oh!',
          message: 'Something went wrong.',
          type: 'default',
          dismissible: true,
        });
      }
      return {
        responseStatus,
        activeDonationsFromDonor: updatedActiveDonations,
      };
    });
  },
  claimDonation: async (jwt, donationId, clientId) => {
    const { responseStatus, currentClaim } = await actions.claimDonation(jwt, donationId, clientId);
    set({
      currentClaim,
      responseStatus,
    });
  },
  getActiveDonationsForClient: async (jwt, user) => {
    const { activeDonationsForClient, responseStatus } = await actions.getActiveDonationsForClient(jwt, user);
    set({
      activeDonationsForClient,
      responseStatus,
    });
  },
  getClaimedDonationsForClient: async (jwt, user) => {
    const { claimedDonationsForClient, responseStatus } = await actions.getClaimedDonationsForClient(jwt, user);
    set({
      claimedDonationsForClient,
      responseStatus,
    });
  },
  getClaimedDonationHistoryForClient: async (jwt, user) => {
    const { claimedDonationHistoryForClient, responseStatus } = await actions.getClaimedDonationHistoryForClient(jwt, user);
    set({
      claimedDonationHistoryForClient,
      responseStatus,
    });
  },
  getActiveDonationsFromDonor: async (jwt, user) => {
    const { activeDonationsFromDonor, responseStatus } = await actions.getActiveDonationsFromDonor(jwt, user);
    set({
      activeDonationsFromDonor,
      responseStatus,
    });
  },
  getDonationHistory: async (jwt, user) => {
    const { donationHistory, responseStatus } = await actions.getDonationHistory(jwt, user);
    set({
      donationHistory,
      responseStatus,
    });
  },
  getTravelTimes: async (
    jwt: string,
    donorId: number,
    clientLat?: number,
    clientLong?: number,
  ) => {
    if (clientLat && clientLong) {
      const { travelTimes, responseStatus } = await actions.getTravelTimes(jwt, donorId, clientLat, clientLong);

      set({
        travelTimes,
        responseStatus,
      });
    }
  },
  getLocation: async () => {
    const { coords } = await actions.getLocation();

    if (coords) {
      set(state => ({
        ...state,
        // eslint-disable-next-line object-property-newline
        user: state.user ? { ...state.user, coords } : state.user,
      }));
    }
  },
  registerUser: async (userIdentity, createUrl, userToRegister) => {
    if (userIdentity && createUrl) {
      const { jwt, user, responseStatus } = await actions.registerUser(userIdentity, createUrl, userToRegister);

      set({
        jwt,
        user,
        responseStatus,
      });
    }
  },
  scanQrCode: async (jwt, qrCode) => {
    if (qrCode) {
      const { responseStatus } = await actions.scanQrCode(jwt, qrCode);
      set({ responseStatus });
    }
  },
  setClaimedDonation: claimedDonation => set({ claimedDonation }),
}));
/*
Paste the following into your code to use global state & actions:

```
import useGlobalStore from '@state';

const email = useGlobalStore(state => state.email);
const setEmail = useGlobalStore(state => state.setEmail);
```
 */

export default useGlobalStore;
