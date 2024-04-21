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
import styles from './ClientClaimsScreen.styles';

function ClientClaimsScreen(props) {
  const isFocused = useIsFocused();

  const getClaimedDonationsForClient = useGlobalStore(state => state.getClaimedDonationsForClient);
  const getLocation = useGlobalStore(state => state.getLocation);

  const jwt = useGlobalStore(state => state.jwt);
  const user = useGlobalStore(state => state.user);
  const claimedDonationsForClient = useGlobalStore(state => state.claimedDonationsForClient);

  const claimedDonationsLoaded = () => claimedDonationsForClient && claimedDonationsForClient.length > 0;

  useEffect(() => {
    if (isFocused && jwt && user) {
      getLocation();
      getClaimedDonationsForClient(jwt, user);
    }
  }, [ isFocused ]);

  return (
    <View style={styles.outerContainer}>
      <NavBar showBackButton={true} />
      <View style={styles.contentContainer}>
        <Title text="Claims" />
        <SpacerInline height={20} />
        {!claimedDonationsForClient && <Text>Loading...</Text>}
        {claimedDonationsLoaded() ? (
          <ScrollView>
            {claimedDonationsForClient && claimedDonationsForClient.map(claimedDonation => (
              <View key={claimedDonation.id}>
                <Donation
                  donation={claimedDonation}
                  key={claimedDonation.id}
                  isClaim={true}
                  isHistory={false}
                />
              </View>
            ))}
            <SpacerInline height={200} />
          </ScrollView>
        ) : (
          <EmptyStateView upperText="You don't currently have any outstanding claimed donations." />
        )}
      </View>
    </View>
  );
}

export default ClientClaimsScreen;
