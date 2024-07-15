import { ILocation } from '@state/index.types';
import { IDonation } from '../../../declarations';
import { Region } from 'react-native-maps';

export interface BananaMapProps {
	donations: IDonation[];
	markerSize: number;
	clientLocation: ILocation;
	mapRegion: Region;
}
