import { ILocation } from '@state/index.types';
import { Region } from 'react-native-maps';

export interface BananaMapProps {
	donations: { } [];
	markerSize: number;
	clientLocation: ILocation;
	mapRegion: Region;
}
