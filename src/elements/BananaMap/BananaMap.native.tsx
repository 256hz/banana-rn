import React from 'react';
import { DonationMarker } from '@elements/DonationMarker';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import styles from './BananaMap.styles';
import { BananaMapProps } from './BananaMapProps';

const BananaMap = ({ donations, markerSize, clientLocation, mapRegion }: BananaMapProps) => {
	const { navigate } = useNavigation();
	return (
		<MapView initialRegion={mapRegion} style={styles.map}>
			{(donations as any).map(donation => {
				const { id } = donation;
				console.log('Rendering donation marker for donation:', donation);
				return (
					<DonationMarker
						key={id}
						coordinate={{
							latitude: parseFloat(donation.donor.latitude),
							longitude: parseFloat(donation.donor.longitude),
						}}
						size={markerSize}
						onPress={() => navigate('MakeClaimScreen', { donation, id })}
					/>
				);
			})}

			<Marker coordinate={clientLocation} />
		</MapView>
	);
};

export default BananaMap;
