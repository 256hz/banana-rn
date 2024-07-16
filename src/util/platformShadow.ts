/* eslint-disable @typescript-eslint/indent */
/* eslint-disable no-confusing-arrow */
import { Platform } from 'react-native';
import * as colors from './colors';

const platformShadow = (elevation: number) =>
	Platform.OS === 'ios'
		? {
				shadowColor: colors.DARK_GRAY,
				shadowOffset: { width: 0, height: 0.5 * elevation },
				shadowOpacity: 0.25,
				shadowRadius: 0.8 * elevation,
			}
		: { elevation };

export default platformShadow;
