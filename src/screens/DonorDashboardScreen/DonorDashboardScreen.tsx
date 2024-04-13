import React, { useEffect } from 'react';
import { useIsFocused, DrawerActions } from '@react-navigation/native';
import {
  ScrollView, Text, View,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  EmptyStateView, NavBar, Title,
} from '@elements';
import useGlobalStore from '@state';
import Donation from '@library/Donations/Donation';
import styles from './DonorDashboardScreen.styles';

function DonorDashboardScreen({ navigation }) {
  console.log('navigation', navigation);
  const isFocused = useIsFocused();

  const getActiveDonationsFromDonor = useGlobalStore(state => state.getActiveDonationsFromDonor);
  const activeDonationsFromDonor = useGlobalStore(state => state.activeDonationsFromDonor);

  const jwt = useGlobalStore(state => state.jwt);
  const user = useGlobalStore(state => state.user);


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

  // const toggleDrawer = () => {
  //   navigation.dispatch(DrawerActions.toggleDrawer());
  // };

  const toggleDrawer = () => {
    navigation.toggleDrawer();
    console.log('navigation', navigation);
  };

  return (
    <View style={styles.outerContainer}>
      <NavBar
        navigate={navigation.navigate}
        goBack={navigation.goBack}
        toggleDrawer={toggleDrawer}
        showBackButton={false}
      />

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
          <TouchableOpacity
            onPress={() => navigation.navigate('DonorDonationScreen')}
          >
            <View>
              <Text style={styles.plus}>+</Text>
            </View>
          </TouchableOpacity>
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
