import React from 'react';
import { DonationMarker } from '@elements/DonationMarker';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import styles from './BananaMap.styles';
import { BananaMapProps } from './BananaMapProps';

const BananaMap = ({ donations, markerSize, clientLocation, mapRegion }: BananaMapProps) => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const navigation = useNavigation<NavigationProp<any>>();

	return (
		<MapView initialRegion={mapRegion} style={styles.map}>
			{donations.map(donation => {
				const { id, donor } = donation;
				const { latitude, longitude } = donor;

				if (latitude == null || longitude == null) {
					console.warn(`Invalid coordinates for donation ID ${id}: `, latitude, longitude);
					return null;
				}

				console.log('Rendering donation marker for donation:', donation);
				return (
					<DonationMarker
						key={id}
						coordinate={{ latitude, longitude }}
						size={markerSize}
						onPress={() => navigation.navigate('MakeClaimScreen', { donation, id })}
					/>
				);
			})}

			<Marker coordinate={clientLocation} />
		</MapView>
	);
};

export default BananaMap;
