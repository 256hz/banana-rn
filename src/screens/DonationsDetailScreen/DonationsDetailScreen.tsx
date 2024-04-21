import React from 'react';
import {
  Image, ScrollView, Text, View,
} from 'react-native';
import useGlobalStore from '@state';
import {
  Icon, LinkButton, NavBar, SpacerInline,
} from '@elements';
import typography from '@util/typography';
import { categoryImage } from '@util/donationCategory';
import * as colors from '@util/constants/colors';
import styles from './DonationsDetailScreen.styles';

function DonationsDetailScreen(props) {
  const updateAlert = useGlobalStore(state => state.updateAlert);
  const cancelDonation = useGlobalStore(state => state.cancelDonation);

  const jwt = useGlobalStore(state => state.jwt);

  const { donation } = props.route.params;

  const hasClaim = !!donation.claim;

  const handleCancel = async () => {
    if (jwt && donation) {
      cancelDonation(jwt, donation.id);
    }
  };

  return (
    <ScrollView style={styles.outerContainer}>
      <View>
        <NavBar {...props} showBackButton={true} />
        <SpacerInline height={20} />
      </View>
      <View style={styles.contentContainer}>
        <Text style={typography.h5}>{donation.category}</Text>
        <View style={styles.iconContainer}>
          <Image
            source={categoryImage(donation.category)}
            style={styles.icon}
          />
        </View>
        <Text style={[ typography.h4 ]}>{donation.food_name}</Text>
        <Text
          style={[ typography.h5 ]}
        >
          {`About ${donation.total_amount}`}
        </Text>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoPair}>
          <Text style={typography.h3}>PICKUP ADDRESS</Text>
          <Text style={styles.infoText}>
            {`${donation.donor.address_street} ${donation.donor.address_city},
            ${donation.donor.address_state} ${donation.donor.address_zip}`}
          </Text>
        </View>
        <View style={styles.infoPair}>
          <Text style={typography.h3}>PICKUP INSTRUCTIONS</Text>
          <Text style={styles.infoText}>
            {donation.pickup_instructions}
          </Text>
        </View>
        <View style={styles.infoPair}>
          <Text style={typography.h3}>RESERVED FOR</Text>
          <View style={styles.claimInfo}>
            <Icon
              color={hasClaim ? colors.BANANA_YELLOW : colors.GRAY}
              name="smile"
              size={50}
            />
            <Text style={typography.body3}>
              {hasClaim
                ? donation.claim.client_name
                : 'item not claimed'}
            </Text>
          </View>
        </View>
      </View>
      <SpacerInline height={20} />
      <LinkButton
        text="CANCEL DONATION"
        onPress={() => updateAlert({
          title: 'Donation Cancelled',
          message: 'Your donation has been cancelled.',
          type: 'cancel donation',
          dismissible: false,
          confirmFn: () => handleCancel(),
        })}
        /* TODO: in future, onClick => tell user why this is disabled */
        disabled={hasClaim}
      />
    </ScrollView>
  );
}

export default DonationsDetailScreen;
