/* eslint-disable camelcase */
import React from 'react';
import {
  Image, Text, TouchableOpacity, View,
} from 'react-native';
import { Icon } from '@elements';
import typography from '@util/typography';
import { formatDate } from '@util/dateFormatter';
import { categoryImage } from '@util/donationCategory';
import { Donation } from '@state/index.types';
import { navigate } from '@util/navigationService';
import styles from './Donation.styles';

interface ClientDonationProps {
  isClaim: boolean;
  isHistory: boolean;
  donation: Donation;
}

export default function ClientDonation({
  donation,
  isClaim,
  isHistory,
}: ClientDonationProps) {
  console.log('donation', donation);
  const {
    category, food_name, id, distance, donor, updated_at,
  } = donation;

  const icon = categoryImage(category);
  const updatedAt = formatDate(updated_at);

  return (
    <TouchableOpacity
      onPress={() => (!isClaim
        ? navigate('MakeClaimScreen', {
          donation,
          id,
        })
        : navigate('ClaimDetailsScreen', { donation }))}
    >
      <View
        style={[
          styles.card,
          {
            backgroundColor:
              !isClaim || isHistory ? '#F0EEEE' : '#FFE145',
          },
        ]}
      >
        <View style={styles.categoryText}>
          <Text style={typography.h4}>{category}</Text>
        </View>
        <View style={styles.mainContainer}>
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: 'blue' },
            ]}
          >
            <Image source={icon} style={styles.icon} />
          </View>
          <View style={styles.infoContainer}>
            <Text style={typography.h3}>{food_name}</Text>
            <View style={styles.infoBottomContainer}>
              <Icon name="location" size={18} />
              <Text
                style={[
                  typography.body3,
                  {
                    fontSize: 18,
                    marginHorizontal: 4,
                  },
                ]}
              >
                {donor.organization_name}
              </Text>
              <Icon
                name={isHistory ? 'time' : 'distance'}
                size={18}
              />
              {!isHistory ? (
                <Text
                  style={[
                    typography.body3,
                    {
                      fontSize: 18,
                      marginHorizontal: 4,
                    },
                  ]}
                >
                  {distance && `${distance.toFixed(1)} mi`}
                </Text>
              ) : (
                <Text
                  style={[
                    typography.body3,
                    {
                      fontSize: 18,
                      marginHorizontal: 4,
                    },
                  ]}
                >
                  {updatedAt}
                </Text>
              )}
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
