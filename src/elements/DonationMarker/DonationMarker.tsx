import React from 'react';
import { ILocation } from '@state/index.types';
import { Marker } from 'react-native-maps';

import { Icon } from '@elements/Icon';
import styles from './DonationMarker.styles';

interface DonationMarkerProps {
	coordinate: ILocation;
	onPress: () => void;
	size: number;
}

export default function DonationMarker({ coordinate, onPress, size }: DonationMarkerProps) {
	console.log('Rendering DonationMarker with props:', { coordinate, onPress, size });
	return (
		<Marker coordinate={coordinate} onPress={onPress} style={styles.container}>
			<Icon name="bananaMarker" size={size} />
		</Marker>
	);
}
