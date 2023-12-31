import React from 'react';
import { Location } from '@state/index.types';
import { Marker } from 'react-native-maps';

import { Icon } from '@elements/Icon';

import styles from './DonationMarker.styles';


interface DonationMarkerProps{
	coordinate: Location;
	onPress: () => void;
	size: number;
}

export default function DonationMarker({
	coordinate, onPress, size,
}: DonationMarkerProps) {
	return (
		<Marker
			coordinate={coordinate}
			onPress={onPress}
			style={styles.container}
		>
			<Icon name="bananaMarker" size={size} />
		</Marker>
	);
}
