import React, { useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import {
  ImageBackground,
  ScrollView,
  Text,
  View,
} from 'react-native';
import useGlobalStore from '@state';
import {
  Icon, SpacerInline, TextButton,
} from '@elements';
import * as colors from '@util/constants/colors';
import typography from '@util/typography';
import { ButtonStyle } from '@elements/Button';
import claimStyles from '@util/claimStyles';
import { goBack } from '@util/navigationService';
import styles from './MakeClaimScreen.styles';

function MakeClaimScreen(props) {
  const isFocused = useIsFocused();

  const user = useGlobalStore(state => state.user);
  const jwt = useGlobalStore(state => state.jwt);
  const travelTimes = useGlobalStore(state => state.travelTimes);

  const claimDonation = useGlobalStore(state => state.claimDonation);
  const getTravelTimes = useGlobalStore(state => state.getTravelTimes);

  const { params: { donation } } = props.route;

  const { donor } = donation;

  const cancelBtnStyle: ButtonStyle = {
    default: {
      background: colors.BANANA_YELLOW,
      foreground: colors.NAVY_BLUE,
    },
  };

  const claimBtnStyle: ButtonStyle = {
    default: {
      background: colors.NAVY_BLUE,
      foreground: colors.WHITE,
    },
  };

  const handleClaim = async () => {
    if (jwt && user) {
      claimDonation(jwt, donation.id, user.id);
    }
  };

  const handleCancel = () => {
    goBack();
  };

  const fetchTravelTimes = async () => {
    if (jwt && user && user.coords) {
      getTravelTimes(
        jwt,
        donation.donor_id,
        user.coords.latitude,
        user.coords.longitude,
      );
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchTravelTimes();
    }
  }, [ isFocused ]);

  return (
    <View style={claimStyles.outerContainer}>
      <ScrollView>
        <View>
          <ImageBackground
            source={require('@assets/images/bananas.jpg')}
            style={claimStyles.header}
          >
            <Text
              onPress={() => goBack()}
              style={[ typography.h2, claimStyles.closeLnk ]}
            >
              X
            </Text>
          </ImageBackground>
        </View>
        <View style={claimStyles.mainContent}>
          <View style={claimStyles.section}>
            <View style={claimStyles.title}>
              <Text style={typography.h3}>{donation.food_name}</Text>
            </View>
            <View style={claimStyles.itemWithIcon}>
              <Icon name="location" size={16} />
              <Text style={typography.body4}>{donor.donor_name}</Text>
            </View>
            <View style={claimStyles.itemWithIcon}>
              <Icon name="distance" size={16} />
              <Text style={typography.body4}>
                {donation.distance
                  && `${donation.distance.toFixed(1)} mi`}
              </Text>
            </View>
          </View>
          <View style={claimStyles.section}>
            <View style={claimStyles.title}>
              <Text style={typography.h3}>Pick Up Info</Text>
            </View>
            <View style={claimStyles.smallTitle}>
              <Text style={typography.h4}>Address</Text>
            </View>
            <View style={claimStyles.item}>
              <Text
                style={typography.body4}
              >
                {`${donor.address_street} ${donor.address_city}, ${donor.address_state}, ${donor.address_zip}`}
              </Text>
            </View>
            <View style={claimStyles.smallTitle}>
              <Text style={typography.h4}>Instructions</Text>
            </View>
            <View style={claimStyles.item}>
              <Text style={typography.body4}>
                {donation.pickup_instructions}
              </Text>
            </View>
          </View>
          <View>
            <View>
              <Text style={typography.h3}>How to get There</Text>
            </View>
            <View style={claimStyles.itemWithIcon}>
              <Icon name="walk" size={16} />
              <SpacerInline width={2} />
              <Text
                style={typography.body4}
              >
                {`Walking ${travelTimes.pedestrian} min`}
              </Text>
            </View>
            <View style={claimStyles.itemWithIcon}>
              <Icon name="transit" size={16} />
              <SpacerInline width={2} />
              <Text
                style={typography.body4}
              >
                {`Public Transit ${travelTimes.publicTransport} min`}
              </Text>
            </View>
            <View style={claimStyles.itemWithIcon}>
              <Icon name="bike" size={16} />
              <SpacerInline width={2} />
              <Text
                style={typography.body4}
              >
                {`Bike ${travelTimes.bicycle} min`}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonPanel}>
        <TextButton
          text="Cancel"
          buttonStyle={cancelBtnStyle}
          outlined={true}
          onPress={handleCancel}
        />
        <SpacerInline width={10} />
        <TextButton
          text="Claim"
          buttonStyle={claimBtnStyle}
          onPress={handleClaim}
        />
      </View>
    </View>
  );
}

export default MakeClaimScreen;
