import { Donation, Location } from '@state/index.types';
import { Region } from 'react-native-maps';

export interface BananaMapProps {
  donations: Donation[];
  markerSize: number;
  clientLocation: Location;
  mapRegion: Region;
}
