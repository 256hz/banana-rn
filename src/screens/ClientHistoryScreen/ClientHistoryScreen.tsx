import React, { useEffect } from 'react';
import {
  ScrollView, Text, View,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import {
  EmptyStateView, NavBar, Title,
} from '@elements';

import Donation from '@library/DonationClientView/Donation';
import useGlobalStore from '@state';

import styles from './ClientHistoryScreen.styles';

function ClientHistoryScreen() {
  const isFocused = useIsFocused();

  const getClaimedDonationHistoryForClient = useGlobalStore(state => state.getClaimedDonationHistoryForClient);
  const claimedDonationHistory = useGlobalStore(state => state.claimedDonationHistoryForClient);
  const jwt = useGlobalStore(state => state.jwt);
  const user = useGlobalStore(state => state.user);

  useEffect(() => {
    if (isFocused && jwt && user) {
      getClaimedDonationHistoryForClient(jwt, user);
    }
  }, [ isFocused ]);

  return (
    <View style={styles.outerContainer}>
      <NavBar showBackButton={true} />
      <View style={styles.contentContainer}>
        <Title text="Claims" />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View>
            <Text style={styles.activeHeader}>History</Text>
          </View>
        </View>
        {!claimedDonationHistory && <Text>Loading...</Text>}
        {claimedDonationHistory && claimedDonationHistory.length > 0 ? (
          <ScrollView>
            {claimedDonationHistory.map(claim => (
              <View key={claim.id}>
                <Donation
                  donation={claim}
                  key={claim.id}
                  isHistory={true}
                  isClaim={true}
                />
              </View>
            ))}
          </ScrollView>
        ) : (
          <EmptyStateView lowerText="You don't have a history of claims." />
        )}
      </View>
    </View>
  );
}

export default ClientHistoryScreen;
