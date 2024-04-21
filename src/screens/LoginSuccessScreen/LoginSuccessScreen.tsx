/* NOTE: spreading in `navigation` and `route` props */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Text } from 'react-native';
import useGlobalStore from '@state';
import InfoScreen from '../InfoScreen';
import AccountSuspendedScreen from '../AccountSuspendedScreen';
import ApplicationPendingScreen from '../ApplicationPendingScreen';
import ApplicationApprovedScreen from '../ApplicationApprovedScreen';
import ApplicationIncompleteScreen from '../ApplicationIncompleteScreen';
import ClientDashboardScreen from '../ClientDashboardScreen';
import DonorDashboardScreen from '../DonorDashboardScreen';

export default function LoginSuccessScreen(props) {
  const user = useGlobalStore(state => state.user);
  const jwt = useGlobalStore(state => state.jwt);
  const userIdentity = useGlobalStore(state => state.userIdentity);

  if (!jwt || !user) {
    return <Text>Loading...</Text>;
  }

  // TODO: match the prop usage of `DonorDashboardScreen`
  switch (user?.account_status) {
    case 'incomplete':
      return <ApplicationIncompleteScreen {...props} />;
    case 'suspended':
      return <AccountSuspendedScreen {...props} />;
    case 'processing':
      return <ApplicationPendingScreen {...props} />;
    case 'approved':
      return <ApplicationApprovedScreen id={user.id} jwt={jwt} />;
    case 'active':
      return userIdentity === 'client' ? <ClientDashboardScreen {...props} /> : <DonorDashboardScreen {...props} />;
    default:
      return (
        <InfoScreen
          title="Login Error"
          nextScreenDestination="LoginScreen"
          nextScreenTitle="Login"
          showBackButton={false}
        />
      );
  }
}
