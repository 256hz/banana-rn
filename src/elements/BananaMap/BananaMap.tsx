import React from 'react';
import { Text } from 'react-native';
import { BananaMapProps } from './BananaMapProps';

function BananaMap({ donations, markerSize, clientLocation, mapRegion }: BananaMapProps) {
	console.log(donations);
	console.log(markerSize);
	console.log(clientLocation);
	console.log(mapRegion);
	return <Text>Map is not supported in Web View</Text>;
}

export default BananaMap;
