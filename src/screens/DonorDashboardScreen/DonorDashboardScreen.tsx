import React, { useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import {
  ScrollView, Text, View,
} from 'react-native';
import * as colors from '@util/constants/colors';
import {
  EmptyStateView, NavBar, Title, Button, Icon,
} from '@elements';
import useGlobalStore from '@state';
import Donation from '@library/Donations/Donation';
import { navigate } from '@util/navigationService';
import { ButtonStyle } from '@elements/Button';
import { DEFAULT_ICON_SIZE } from '@util/constants/icons';
import styles from './DonorDashboardScreen.styles';

function DonorDashboardScreen() {
  const isFocused = useIsFocused();

  const getActiveDonationsFromDonor = useGlobalStore(state => state.getActiveDonationsFromDonor);
  const activeDonationsFromDonor = useGlobalStore(state => state.activeDonationsFromDonor);

  const jwt = useGlobalStore(state => state.jwt);
  const user = useGlobalStore(state => state.user);

  const buttonStyle: ButtonStyle = {
    default: {
      background: colors.WHITE_TRANSPARENT,
      foreground: colors.NAVY_BLUE,
    },
  };

  const getActiveDonations = async () => {
    if (jwt && user) {
      getActiveDonationsFromDonor(jwt, user);
    }
  };

  useEffect(() => {
    if (isFocused) {
      getActiveDonations();
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
            <Text style={styles.activeHeader}>ACTIVE</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
          <Button
            buttonStyle={buttonStyle}
            onPress={() => navigate('DonorDonationScreen')}
          >
            {_ => <Icon size={DEFAULT_ICON_SIZE} color="blue" name="plus" />}
          </Button>
        </View>
        {/* TODO: handle loading better */}
        {(!activeDonationsFromDonor || activeDonationsFromDonor.length < 1) && <Text>Loading...</Text>}

        {(activeDonationsFromDonor && activeDonationsFromDonor.length > 0) ? (
          <ScrollView>
            {activeDonationsFromDonor.map((donation, i) => (
              <View key={donation.id}>
                <Donation
                  donation={donation}
                  key={donation.id}
                  resource="donations"
                />
                {i === (activeDonationsFromDonor).length - 1}
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

export default DonorDashboardScreen;
