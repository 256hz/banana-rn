import React, { useEffect } from 'react';
import {
  ScrollView, Text, View,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import {
  EmptyStateView, NavBar, Title,
} from '@elements';
import Donation from '@library/Donations/Donation/Donation';
import useGlobalStore from '@state';
import styles from './DonorHistoryScreen.styles';

function DonorHistoryScreen() {
  const isFocused = useIsFocused();

  const getDonationHistory = useGlobalStore(state => state.getDonationHistory);
  const donationHistory = useGlobalStore(state => state.donationHistory);
  const jwt = useGlobalStore(state => state.jwt);
  const user = useGlobalStore(state => state.user);

  useEffect(() => {
    if (isFocused && jwt && user) {
      getDonationHistory(jwt, user);
    }
  }, [ isFocused ]);

  return (
    <View style={styles.outerContainer}>
      <NavBar showBackButton={false} />
      <View style={styles.contentContainer}>
        <Title text="Donations" />
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
        {donationHistory && donationHistory.length > 0 ? (
          <ScrollView>
            {donationHistory.map(donation => (
              <View key={donation.id}>
                <Donation
                  donation={donation}
                  key={donation.id}
                  isHistory={true}
                />
              </View>
            ))}
          </ScrollView>
        ) : (
          <EmptyStateView lowerText="You currently don't have any donations." />
        )}
      </View>
    </View>
  );
}

export default DonorHistoryScreen;
