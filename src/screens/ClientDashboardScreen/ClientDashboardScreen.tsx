import React, { useEffect } from 'react';
import {
  ScrollView, Text, View,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import Donation from '@library/DonationClientView/Donation';
import useGlobalStore from '@state';
import {
  EmptyStateView,
  NavBar,
  SpacerInline,
  Title,
} from '@elements';
import { navigate } from '@util/navigationService';
import styles from './ClientDashboardScreen.styles';

function ClientDashboardScreen(props) {
  const isFocused = useIsFocused();

  const jwt = useGlobalStore(state => state.jwt);
  const user = useGlobalStore(state => state.user);
  const activeDonationsForClient = useGlobalStore(state => state.activeDonationsForClient);

  const getLocation = useGlobalStore(state => state.getLocation);
  const getActiveDonationsForClient = useGlobalStore(state => state.getActiveDonationsForClient);

  const cannotAccessLocation = () => activeDonationsForClient && activeDonationsForClient.length > 0 && user && !user.coords;

  const getActiveDonationsForLocation = async () => {
    if (jwt && user) {
      getLocation();
      getActiveDonationsForClient(jwt, user);
    }
  };

  useEffect(() => {
    if (isFocused) {
      getActiveDonationsForLocation();
    }
  }, [ isFocused ]);

  return (
    <View style={styles.outerContainer}>
      <NavBar
        showBackButton={false}
        showSelector={true}
        onMap={() => navigate('MapScreen')}
        position="list"
      />
      <View style={styles.contentContainer}>
        <Title text="Donations" />
        <SpacerInline height={20} />
        {!activeDonationsForClient && <Text>Loading...</Text>}
        {cannotAccessLocation() && (
          <EmptyStateView
            upperText="We are unable to get your current location."
            lowerText="Please check your app settings to make sure location permissions are enabled."
          />
        )}
        {(activeDonationsForClient && activeDonationsForClient.length > 0)
          ? (
            <ScrollView>
              {activeDonationsForClient.map(donation => (
                <View key={donation.id}>
                  <Donation
                    donation={donation}
                    key={donation.id}
                    isClaim={false}
                    isHistory={false}
                  />
                </View>
              ))}
              <SpacerInline height={200} />
            </ScrollView>
          ) : (
            <EmptyStateView
              upperText="No available donations near you."
              lowerText={
                'We will notify you when new donations are available.\nOR\nPlease check back later.'
              }
            />
          )}
      </View>
    </View>
  );
}

export default ClientDashboardScreen;
